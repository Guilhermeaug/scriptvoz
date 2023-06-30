import { Auth, SignUp, SignUpError } from '@/types/auth_types';
import {
  AuthOptions,
  NextAuthOptions,
  User,
  getServerSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.username;
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

export async function signUp({ username, email, password }: SignUp) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
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
