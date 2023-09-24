import { Auth, SignUp, SignUpError } from '@/types/auth_types';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { revalidatePath } from 'next/cache';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email/Password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          revalidatePath('/');
          return { ...user, jwt };
        } catch (error) {
          const { error: e } = error as SignUpError;
          throw new Error(e.message);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.jwt = token.jwt as string;
      session.user.name = token.name as string;
      session.user.isTeacher = token.isTeacher as boolean;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = !!user;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.username;
        token.fullName = user.fullName;
        token.isTeacher = user.isTeacher;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const endpoint = `${process.env.STRAPI_URL}/api/auth/local`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  });
  const json = await res.json();
  if (res.ok) {
    return json as Auth;
  } else {
    const error = json as SignUpError;
    return Promise.reject(error);
  }
}

export async function signUp(
  { username, email, password, isTeacher, fullName }: SignUp,
  rest: any,
) {
  async function createUser() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        isTeacher,
        fullName,
      }),
    });

    const json = await res.json();
    if (res.ok) {
      return json as Auth;
    } else {
      const error = json as SignUpError;
      return Promise.reject(error);
    }
  }

  async function createAdditionalData() {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/additional-datas`;
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
      },
      method: 'POST',
      body: JSON.stringify({
        data: {
          ...rest,
        },
      }),
    });

    const json = await res.json();
    if (res.ok) {
      return {
        id: json.data.id as string,
      };
    } else {
      const error = json as SignUpError;
      return Promise.reject(error);
    }
  }

  async function connectUserToData(userId: string, dataId: string) {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`;
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        additionalData: {
          connect: [dataId],
        },
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      const error = json as SignUpError;
      return Promise.reject(error);
    }
  }

  async function changeUserRole(id: string, role: 'Student' | 'Teacher') {
    const rolesMap = {
      Student: 3,
      Teacher: 4,
    };

    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`;
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        role: rolesMap[role],
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      const error = json as SignUpError;
      return Promise.reject(error);
    }
  }

  const user = await createUser();
  const additionalData = await createAdditionalData();
  await connectUserToData(user.user.id, additionalData.id);
  await changeUserRole(user.user.id, isTeacher ? 'Teacher' : 'Student');
}
