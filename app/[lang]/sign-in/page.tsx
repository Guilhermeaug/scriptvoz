'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InformationBox from '@/components/InformationBox';
import { Form } from '@/components/Form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignUpError } from '@/types/auth_types';
import { useState } from 'react';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof FormSchema>;

export default function RegisterPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
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
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.push('/');
  }

  return (
    <main className='space-y-8'>
      <h1 className='text-center font-bold text-3xl'>Login</h1>
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
              <Form.Label htmlFor='email'>Qual seu email?</Form.Label>
              <Form.Input type='email' name='email' />
              <Form.ErrorMessage field='email' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='password'>Qual sua senha?</Form.Label>
              <Form.Input type='password' name='password' />
              <Form.ErrorMessage field='password' />
            </Form.Field>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary mt-4 btn-block'
            >
              Entrar
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </main>
  );
}
