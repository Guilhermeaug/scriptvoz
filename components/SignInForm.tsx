'use client';

import { SignInPage } from '@/types/page_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form } from './Form';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  pageAttributes: SignInPage['data']['attributes'];
}

export default function SignInForm({ lang, pageAttributes }: Props) {
  const [error, setError] = useState<string | null>(null);

  const FormSchema = z.object({
    email: z.string().min(3, pageAttributes.email.validation),
    password: z.string().min(8, pageAttributes.password.validation).max(255),
  });

  type FormData = z.infer<typeof FormSchema>;

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
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      window.location.replace(`/${lang}`);
      return;
    }

    switch (res?.error) {
      case 'Your account email is not confirmed': {
        setError(pageAttributes.email_not_confirmed);
        toast.error(pageAttributes.email_not_confirmed);
        break;
      }
      case 'Invalid identifier or password': {
        setError(pageAttributes.invalid_credentials);
        toast.error(pageAttributes.invalid_credentials);
        break;
      }
      default: {
        setError(pageAttributes.unknown_error);
        toast.error(pageAttributes.unknown_error);
      }
    }
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
          <span className='text-white'>{error}</span>
        </div>
      )}
      <FormProvider {...registerForm}>
        <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
          <Form.Field>
            <Form.Label htmlFor='email'>
              {pageAttributes.email.label}
            </Form.Label>
            <Form.Input
              name='email'
              placeholder={pageAttributes.email.placeholder}
            />
            <Form.ErrorMessage field='email' />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor='password'>
              {pageAttributes.password.label}
            </Form.Label>
            <Form.Input
              type='password'
              name='password'
              placeholder={pageAttributes.password.placeholder}
            />
            <Form.ErrorMessage field='password' />
          </Form.Field>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary btn-block mt-4 uppercase'
          >
            {pageAttributes.button_text}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
