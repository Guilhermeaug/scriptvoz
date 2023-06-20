import { User } from 'next-auth';

export interface Auth {
  jwt: string;
  user: User;
}

export interface SignUp {
  username: string;
  email: string;
  password: string;
}

export interface SignUpError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: {};
  };
}
