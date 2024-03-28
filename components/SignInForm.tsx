'use client';

import { SignInPage } from '@/types/page_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './Form';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof FormSchema>;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  pageAttributes: SignInPage['data']['attributes'];
}

export default function SignInForm({ lang, pageAttributes }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const registerForm = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = registerForm;

  async function onSubmit(data: FormData) {
    const res = await signIn('credentials', {
      callbackUrl: '/',
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
      return;
    }
    router.push('/');
  }

  return (
    <div className='lg:p-6'>
      {error && (
        <div className='alert alert-error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 shrink-0 stroke-current'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <FormProvider {...registerForm}>
        <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
          <Form.Field>
            <Form.Label htmlFor='email'>E-mail ou nome de usuário</Form.Label>
            <Form.Input type='email' name='email' placeholder='Seu e-mail cadastrado' />
            <Form.ErrorMessage field='email' />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='password'>Senha</Form.Label>
            <Form.Input type='password' name='password' placeholder='Sua senha'/>
            <Form.ErrorMessage field='password' />
          </Form.Field>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary btn-block mt-4 uppercase text-white'
          >
            Fazer Login
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
