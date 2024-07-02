'use client';

import { SignInPage } from '@/types/page_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form } from './Form';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  pageAttributes: SignInPage['data']['attributes'];
}

export default function SignInForm({ lang, pageAttributes }: Props) {
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
        toast.error(pageAttributes.email_not_confirmed);
        break;
      }
      case 'Invalid identifier or password': {
        toast.error(pageAttributes.invalid_credentials);
        break;
      }
      default: {
        toast.error(pageAttributes.unknown_error);
      }
    }
  }

  return (
    <div className='lg:p-6'>
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
