import { Auth, SignUpError } from '@/types/auth_types';
import * as Sentry from '@sentry/nextjs';
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
        try {
          if (credentials == null) return null;
          const { user, jwt } = await login({
            email: credentials.email,
            password: credentials.password,
          });
          revalidatePath('/', 'layout');
          return { ...user, jwt };
        } catch (e) {
          Sentry.captureException(e, {
            tags: {
              page: 'login',
              type: 'credentials',
            },
          });
          const error = e as SignUpError;
          throw error.error.message
            ? new Error(error.error.message)
            : new Error('Unknown Error');
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
  if (!res.ok || !json.jwt || !json.user) {
    throw json;
  }
  return json;
}

export async function signUp(data: Record<string, unknown>) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-cache',
    });
    if (!res.ok) {
      return signUpError(res);
    }
    const json = await res.json();
    return json as Auth;
  } catch (error) {
    console.error(error);
    throw error;
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

async function signUpError(res: Response): Promise<SignUpError> {
  switch (res.status) {
    case 400: {
      return (await res.json()) as SignUpError;
    }
    default: {
      return {
        data: null,
        error: {
          status: res.status,
          name: 'UnknownError',
          message: 'An Unknown Error Occurred',
          details: {},
        },
      };
    }
  }
}

export const useAuth = () => getServerSession(authOptions);
