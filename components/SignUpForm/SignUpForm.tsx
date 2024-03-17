'use client';

import InformationBox from '@/components/InformationBox';
import { signUp } from '@/lib/auth';
import { SignUpError } from '@/types/auth_types';
import { SignUpPage } from '@/types/page_types';
import { SignUpFields } from '@/types/sign_up_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CommonFields } from './CommonFields';
import { SpecializedFields } from './SpecializedFields';
import { getFieldsSchema } from './validation_schemas';

interface SignUpFormProps {
  formData: SignUpFields;
  pageAttributes: SignUpPage['data']['attributes'];
}

export default function SignUpForm({
  formData,
  pageAttributes,
}: SignUpFormProps) {
  const schema = getFieldsSchema(formData);
  type FormData = z.infer<typeof schema>;
  const roleOptions = formData.data.attributes.role.values.split(';');

  const registerForm = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = registerForm;

  const [error, setError] = useState<string | null>(null);
  async function onSubmit(data: FormData) {
    try {
      await signUp(
        {
          ...data,
          isTeacher: data.role === roleOptions[2],
        },
      );
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    } catch (error) {
      const { error: e } = error as SignUpError;
      if (
        e &&
        e.message &&
        e.message === 'Email or Username are already taken'
      ) {
        setError('Email ou nome de usuário já estão em uso');
      } else {
        setError('Ocorreu um erro ao realizar o cadastro');
      }
      console.error(error);
    }
  }

  const watchRole = watch('role');

  return (
    <>
      {error && (
        <div className='alert alert-error mb-2'>
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
      <InformationBox title={pageAttributes.title}>
        <FormProvider {...registerForm}>
          <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
            <CommonFields attributes={formData.data.attributes} />
            <SpecializedFields
              attributes={formData.data.attributes}
              role={watchRole}
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary btn-block mt-4 uppercase text-white'
            >
              {pageAttributes.sign_up}
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </>
  );
}
