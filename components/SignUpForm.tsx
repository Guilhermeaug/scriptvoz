'use client';

import InformationBox from '@/components/InformationBox';
import { signUp } from '@/lib/auth';
import { SignUpError } from '@/types/auth_types';
import { Field, SignUpFormModified as SignUpForm } from '@/types/form_types';
import { SignUpPage } from '@/types/page_types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './Form';

function renderFormElement(field: Field) {
  switch (field.__component) {
    case 'form.input-text': {
      return <Form.Input type={field.options.data_type} name={field.name} />;
    }
    case 'form.select':
      return (
        <Form.Select name={field.name} type={field.options.data_type}>
          {field.values.values.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
      );
    case 'form.checkbox':
      return <Form.Checkbox type='checkbox' name={field.name} />;
  }
}

interface SignUpFormProps {
  formData: SignUpForm;
  pageAttributes: SignUpPage['data']['attributes'];
}

export default function SignUpForm({
  formData: { data },
  pageAttributes,
}: SignUpFormProps) {
  const {
    attributes: { teacherFields, studentFields, professional, commom },
  } = data;

  const commomFieldsSchema = z.object({
    username: z.string().min(3, commom.username.options.validation),
    email: z.string().email(commom.email.options.validation),
    password: z.string().min(8, commom.password.options.validation),
    fullName: z.string().min(3, commom.fullName.options.validation),
    age: z.number().min(1, commom.age.options.validation),
    gender: z.string().min(3, commom.gender.options.validation),
    city: z.string().min(3, commom.city.options.validation),
    country: z.string().min(3, commom.country.options.validation),
  });

  const studentFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(commom.role.values.values[0]),
    graduationStep: z
      .number()
      .min(1, studentFields.graduationStep.options.validation),
    institution: z
      .string()
      .min(3, studentFields.institution.options.validation),
  });

  const professionalFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(commom.role.values.values[1]),
    timeSinceGraduation: z
      .string()
      .min(1, professional.timeSinceGraduation.options.validation),
  });

  const teacherFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(commom.role.values.values[2]),
    institution: z
      .string()
      .min(3, teacherFields.institution.options.validation),
  });

  const schema = z.discriminatedUnion('role', [
    studentFieldsSchema,
    professionalFieldsSchema,
    teacherFieldsSchema,
  ]);

  type FormData = z.infer<typeof schema>;
  const registerForm = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: commom.role.values.values[0],
    },
    shouldUnregister: true,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = registerForm;

  const watchRole = watch('role');

  const [error, setError] = useState<string | null>(null);
  async function onSubmit(data: FormData) {
    try {
      await signUp(
        {
          username: data.username,
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          isTeacher: !!data.role.startsWith('3'),
        },
        data,
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

  return (
    <main className='mx-auto mt-3 flex max-w-screen-md flex-col items-center space-y-4 p-3'>
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
      <InformationBox title={pageAttributes.title} className='w-full'>
        <FormProvider {...registerForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-3 gap-2 p-3'
          >
            {Object.values(commom).map((field: Field) => {
              return (
                <Form.Field key={field.name} size={field.options.size}>
                  <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                  {renderFormElement(field)}
                  <Form.ErrorMessage field={field.name} />
                </Form.Field>
              );
            })}
            {watchRole === commom.role.values.values[0] && (
              <>
                {Object.values(studentFields).map((field: Field) => {
                  return (
                    <Form.Field key={field.name} size={field.options.size}>
                      <Form.Label htmlFor={field.name}>
                        {field.label}
                      </Form.Label>
                      {renderFormElement(field)}
                      <Form.ErrorMessage field={field.name} />
                    </Form.Field>
                  );
                })}
              </>
            )}
            {watchRole === commom.role.values.values[1] && (
              <>
                {Object.values(professional).map((field: Field) => {
                  return (
                    <Form.Field key={field.name} size={field.options.size}>
                      <Form.Label htmlFor={field.name}>
                        {field.label}
                      </Form.Label>
                      {renderFormElement(field)}
                      <Form.ErrorMessage field={field.name} />
                    </Form.Field>
                  );
                })}
              </>
            )}
            {watchRole === commom.role.values.values[2] && (
              <>
                {Object.values(teacherFields).map((field: Field) => {
                  return (
                    <Form.Field key={field.name} size={field.options.size}>
                      <Form.Label htmlFor={field.name}>
                        {field.label}
                      </Form.Label>
                      {renderFormElement(field)}
                      <Form.ErrorMessage field={field.name} />
                    </Form.Field>
                  );
                })}
              </>
            )}
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary btn-block col-span-3 mt-4 text-white'
            >
              {pageAttributes.signup}
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </main>
  );
}
