'use client';

import { FormProvider, useForm } from 'react-hook-form';
import InformationBox from './InformationBox';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import { Form } from './Form';
import { SignUpError } from '@/types/auth_types';
import { useEffect, useState } from 'react';
import { ZodObject, z } from 'zod';
import { Data, Field } from '@/types/form_types';

function renderFormElement(field: Field) {
  switch (field.type) {
    case 'text':
      return <Form.Input type='text' name={field.name} />;
    case 'select':
      return (
        <Form.Select name={field.name}>
          {field.values.values.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
      );
    case 'checkbox':
      return <Form.Checkbox type='checkbox' name={field.name} />;
  }
}

interface SignUpFormProps {
  additionalData: Data;
}

export default function SignUpForm({ additionalData }: SignUpFormProps) {
  const [FormSchema, setFormSchema] = useState<ZodObject<any, any>>(
    z.object({
      email: z.string().email('Escreva um email válido'),
      password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
      isTeacher: z.boolean(),
    }),
  );
  type FormData = z.infer<typeof FormSchema>;
  const registerForm = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = registerForm;
  const isTeacher = watch('isTeacher');

  useEffect(() => {
    if (isTeacher) {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          isTeacher: z.boolean(),
          ...additionalData.attributes.teacherFields.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default:
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, options.validation || '')
                    : z.string().optional(),
                };
            }
          }, {}),
          name: z.string().min(3, 'Escreva seu nome completo'),
        }),
      );
    } else {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          isTeacher: z.boolean(),
          ...additionalData.attributes.studentFields.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default:
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, options.validation || '')
                    : z.string().optional(),
                };
            }
          }, {}),
          name: z.string().min(3, 'Escreva seu nome completo'),
        }),
      );
    }
  }, [additionalData, isTeacher]);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: FormData) {
    try {
      await signUp(
        {
          username: data.name,
          email: data.email,
          password: data.password,
          isTeacher: data.isTeacher,
        },
        data,
      );
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-3 gap-2'
          >
            <Form.Field size={2}>
              <Form.Label htmlFor='name'>Qual seu nome?</Form.Label>
              <Form.Input type='text' name='name' />
              <Form.ErrorMessage field='name' />
            </Form.Field>
            <Form.Field size={1}>
              <Form.Label htmlFor='email'>Qual seu email?</Form.Label>
              <Form.Input type='email' name='email' />
              <Form.ErrorMessage field='email' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='password'>Qual sua senha?</Form.Label>
              <Form.Input type='password' name='password' />
              <Form.ErrorMessage field='password' />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor='isTeacher'>
                Marque se for professor
              </Form.Label>
              <Form.Checkbox type='checkbox' name='isTeacher' />
              <Form.ErrorMessage field='isTeacher' />
            </Form.Field>
            {isTeacher &&
              additionalData &&
              additionalData.attributes.teacherFields.length > 0 && (
                <>
                  <h2 className='text-center font-bold text-3xl col-span-3 mt-4'>
                    Informações adicionais
                  </h2>
                  {additionalData.attributes.teacherFields.map(
                    (field, index) => (
                      <Form.Field size={field.options.size} key={index}>
                        <Form.Label htmlFor={field.name}>
                          {field.label}
                        </Form.Label>
                        {renderFormElement(field)}
                        <Form.ErrorMessage field={field.name} />
                      </Form.Field>
                    ),
                  )}
                </>
              )}
            {!isTeacher &&
              additionalData &&
              additionalData.attributes.studentFields.length > 0 && (
                <>
                  <h2 className='text-center font-bold text-3xl col-span-3 mt-4'>
                    Informações adicionais
                  </h2>
                  {additionalData.attributes.studentFields.map(
                    (field, index) => (
                      <Form.Field size={field.options.size} key={index}>
                        <Form.Label htmlFor={field.name}>
                          {field.label}
                        </Form.Label>
                        {renderFormElement(field)}
                        <Form.ErrorMessage field={field.name} />
                      </Form.Field>
                    ),
                  )}
                </>
              )}
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary mt-4 btn-block col-span-3'
            >
              Cadastrar
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </main>
  );
}
