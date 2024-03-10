import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      jwt: string;
      isTeacher: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    jwt: string;
    username: string;
    fullName: string;
    isTeacher: boolean;
  }
}
