import { Auth, SignUp, SignUpError } from '@/types/auth_types';
import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { revalidatePath } from 'next/cache';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const { user, jwt } = await login({
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

export async function login({
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
    cache: 'no-cache',
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
  data: Record<string, unknown>,
) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-cache',
  });
  const json = await res.json();
  if (res.ok) {
    return json as Auth;
  } else {
    const error = json as SignUpError;
    return Promise.reject(error);
  }
}

export async function sendResetPasswordCode(email: string) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
    cache: 'no-cache',
  });
  if (!res.ok) {
    return {
      error: 'Erro ao enviar email de recuperação de senha',
    };
  }
}

export async function resetPassword(code: string, password: string) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      password,
      passwordConfirmation: password,
    }),
    cache: 'no-cache',
  });
  if (!res.ok) {
    return {
      error: 'Erro ao trocar a senha',
    };
  }
}

export const useAuth = () => getServerSession(authOptions);
