'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InformationBox from '@/components/InformationBox';
import { Form } from '@/components/Form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';
import { SignUpError } from '@/types/auth_types';
import { useState } from 'react';

const FormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof FormSchema>;

export default function RegisterPage({ lang }: { lang: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const registerForm = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = registerForm;

  async function onSubmit(data: FormData) {
    try {
      await signUp({
        username: data.name,
        email: data.email,
        password: data.password,
      });
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      router.push('/');
    } catch (error) {
      const { error: e } = error as SignUpError;
      if (e.message === 'Email or Username are already taken') {
        setError('Email ou nome de usuário já estão em uso');
      }
    }
  }

  return (
    <main className='space-y-8'>
      <h1 className='text-center font-bold text-3xl'>Cadastro</h1>
      {error && (
        <div className='alert alert-error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current shrink-0 h-6 w-6'
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
      <InformationBox title='Dados'>
        <FormProvider {...registerForm}>
          <form onSubmit={handleSubmit(onSubmit)} className='p-8'>
            <Form.Field>
              <Form.Label htmlFor='name'>Qual seu nome?</Form.Label>
              <Form.Input type='text' name='name' />
              <Form.ErrorMessage field='name' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='email'>Qual seu email?</Form.Label>
              <Form.Input type='email' name='email' />
              <Form.ErrorMessage field='email' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='password'>Qual sua senha?</Form.Label>
              <Form.Input type='text' name='password' />
              <Form.ErrorMessage field='password' />
            </Form.Field>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary mt-4 btn-block'
            >
              Cadastrar
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </main>
  );
}
