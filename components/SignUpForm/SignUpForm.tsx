'use client';

import { signUp } from '@/lib/auth';
import { SignUpPage } from '@/types/page_types';
import { SignUpFields } from '@/types/sign_up_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { CommonFields } from './CommonFields';
import { SpecializedFields } from './SpecializedFields';
import { getFieldsSchema } from './validation_schemas';

interface SignUpFormProps {
  lang: string;
  formData: SignUpFields;
  pageAttributes: SignUpPage['data']['attributes'];
}

export default function SignUpForm({
  lang,
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
    defaultValues: {
      role: roleOptions[0],
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setError: setFormError,
  } = registerForm;

  const [error, setError] = useState<string | null>(null);
  async function onSubmit(data: FormData) {
    const res = await signUp({
      ...data,
      isTeacher: data.role === roleOptions[2],
    });

    if ('error' in res) {
      switch (res.error.message) {
        case 'Email or Username are already taken': {
          setError(formData.data.attributes.email_username_already_taken);
          toast.error(formData.data.attributes.email_username_already_taken);
          setFormError('email', {
            type: 'required',
          });
          setFormError('username', {
            type: 'required',
          });
          break;
        }
        default:
          setError(formData.data.attributes.unknown_error);
          toast.error(formData.data.attributes.unknown_error);
          break;
      }
      return;
    }

    const loginResponse = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (loginResponse?.ok) {
      window.location.replace(`/${lang}`);
      return;
    }

    switch (loginResponse?.error) {
      case 'Your account email is not confirmed':
        toast.message(formData.data.attributes.email_not_confirmed);
        break;
      default:
        toast.error(formData.data.attributes.unknown_error);
        break;
    }
  }

  const watchRole = watch('role');

  return (
    <div className='lg:p-6'>
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
          <span className='text-white'>{error}</span>
        </div>
      )}
      <FormProvider {...registerForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommonFields attributes={formData.data.attributes} />
          <SpecializedFields
            attributes={formData.data.attributes}
            role={watchRole}
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary btn-block mt-4 uppercase'
          >
            {pageAttributes.sign_up}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
