'use client';

import { Form } from '@/components/Form';
import Header from '@/components/Header';
import InformationBox from '@/components/InformationBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
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
      callbackUrl: '/',
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }
  }

  return (
    <>
      <Header color={'evaluation'} />
      <main className='m-auto mt-3 flex max-w-screen-md flex-col items-center space-y-4 p-3'>
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
        <InformationBox title='Login' className='w-full'>
          <FormProvider {...registerForm}>
            <form onSubmit={handleSubmit(onSubmit)} className='p-8'>
              <Form.Field size={3}>
                <Form.Label htmlFor='email'>Qual seu email?</Form.Label>
                <Form.Input type='email' name='email' />
                <Form.ErrorMessage field='email' />
              </Form.Field>
              <Form.Field size={3}>
                <Form.Label htmlFor='password'>Qual sua senha?</Form.Label>
                <Form.Input type='password' name='password' />
                <Form.ErrorMessage field='password' />
              </Form.Field>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary btn-block mt-4'
              >
                Entrar
              </button>
            </form>
          </FormProvider>
        </InformationBox>
        <section className={'text-center text-2xl'}>
          <span>Não possui conta? </span>
          <Link href={`sign-up`} locale={lang} className={'text-primary'}>
            Cadastrar
          </Link>
        </section>
      </main>
    </>
  );
}
