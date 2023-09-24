'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/auth';
import { signIn } from 'next-auth/react';
import { Form } from './Form';
import { SignUpError } from '@/types/auth_types';
import { useEffect, useState } from 'react';
import { ZodObject, z } from 'zod';
import { Data, Field } from '@/types/form_types';
import InformationBox from '@/components/InformationBox';

function renderFormElement(field: Field) {
  const isNumber = field.options.data_type === 'number';
  switch (field.type) {
    case 'text': {
      return (
        <Form.Input
          type={isNumber ? 'number' : 'text'}
          name={field.name}
          isNumber={isNumber}
        />
      );
    }
    case 'select':
      return (
        <Form.Select name={field.name} isNumber={isNumber}>
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
  formData: Data;
}

export default function SignUpForm({ formData }: SignUpFormProps) {
  const {
    attributes: {
      email,
      password,
      fullName,
      username,
      role,
      teacherFields,
      studentFields,
      professional,
      commom,
    },
  } = formData;
  const [FormSchema, setFormSchema] = useState<ZodObject<any, any>>(
    z.object({
      email: z.string().email(),
      password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
      role: z.string(),
      fullName: z.string().min(3, 'Escreva seu nome completo'),
      username: z.string().min(3, 'Escreva seu nome de usuário'),
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
  const watch1 = watch('role');

  useEffect(() => {
    if (!watch1) {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          role: z.string(),
          ...formData.attributes.studentFields.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default: {
                const validation = options.validation || '';
                const dataType = options.data_type || 'text';
                if (dataType === 'number') {
                  return {
                    ...acc,
                    [field.name]: options.required
                      ? z.number().min(0, validation)
                      : z.number().optional(),
                  };
                }
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, validation)
                    : z.string().optional(),
                };
              }
            }
          }, {}),
          fullName: z.string().min(3, 'Escreva seu nome completo'),
          username: z.string().min(3, 'Escreva seu nome de usuário'),
        }),
      );

      return;
    }

    if (watch1.startsWith('3')) {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          role: z.string(),
          ...formData.attributes.teacherFields.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default: {
                const validation = options.validation || '';
                const dataType = options.data_type || 'text';
                if (dataType === 'number') {
                  return {
                    ...acc,
                    [field.name]: options.required
                      ? z.number().min(0, validation)
                      : z.number().optional(),
                  };
                }
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, validation)
                    : z.string().optional(),
                };
              }
            }
          }, {}),
          fullName: z.string().min(3, 'Escreva seu nome completo'),
          username: z.string().min(3, 'Escreva seu nome de usuário'),
        }),
      );
    } else if (watch1.startsWith('1')) {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          role: z.string(),
          ...formData.attributes.studentFields.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default: {
                const validation = options.validation || '';
                const dataType = options.data_type || 'text';
                if (dataType === 'number') {
                  return {
                    ...acc,
                    [field.name]: options.required
                      ? z.number().min(0, validation)
                      : z.number().optional(),
                  };
                }
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, validation)
                    : z.string().optional(),
                };
              }
            }
          }, {}),
          fullName: z.string().min(3, 'Escreva seu nome completo'),
          username: z.string().min(3, 'Escreva seu nome de usuário'),
        }),
      );
    } else {
      setFormSchema(
        z.object({
          email: z.string().email('Escreva um email válido'),
          password: z
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres'),
          role: z.string(),
          ...formData.attributes.professional.reduce((acc, field) => {
            const options = field.options;
            switch (field.type) {
              case 'checkbox':
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.boolean()
                    : z.boolean().optional(),
                };
              default: {
                const validation = options.validation || '';
                const dataType = options.data_type || 'text';
                if (dataType === 'number') {
                  return {
                    ...acc,
                    [field.name]: options.required
                      ? z.number().min(0, validation)
                      : z.number().optional(),
                  };
                }
                return {
                  ...acc,
                  [field.name]: options.required
                    ? z.string().min(3, validation)
                    : z.string().optional(),
                };
              }
            }
          }, {}),
          fullName: z.string().min(3, 'Escreva seu nome completo'),
          username: z.string().min(3, 'Escreva seu nome de usuário'),
        }),
      );
    }
  }, [formData, watch1]);

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
    }
  }

  return (
    <main className='container mx-auto p-3 space-y-8'>
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

      <InformationBox title={'Cadastro'}>
        <FormProvider {...registerForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-3 gap-2 p-3'
          >
            {fullName && (
              <Form.Field size={fullName.options.size}>
                <Form.Label htmlFor={fullName.name}>
                  {fullName.label}
                </Form.Label>
                {renderFormElement(fullName)}
                <Form.ErrorMessage field={fullName.name} />
              </Form.Field>
            )}
            {username && (
              <Form.Field size={username.options.size}>
                <Form.Label htmlFor={username.name}>
                  {username.label}
                </Form.Label>
                {renderFormElement(username)}
                <Form.ErrorMessage field={username.name} />
              </Form.Field>
            )}
            {email && (
              <Form.Field size={email.options.size}>
                <Form.Label htmlFor={email.name}>{email.label}</Form.Label>
                {renderFormElement(email)}
                <Form.ErrorMessage field={email.name} />
              </Form.Field>
            )}
            {password && (
              <Form.Field size={password.options.size}>
                <Form.Label htmlFor={password.name}>
                  {password.label}
                </Form.Label>
                <Form.Input type='password' name={password.name} />
                <Form.ErrorMessage field={password.name} />
              </Form.Field>
            )}
            {role && (
              <Form.Field size={role.options.size}>
                <Form.Label htmlFor={role.name}>{role.label}</Form.Label>
                {renderFormElement(role)}
                <Form.ErrorMessage field={role.name} />
              </Form.Field>
            )}
            {commom &&
              commom.map((field, index) => (
                <Form.Field size={field.options.size} key={index}>
                  <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                  {renderFormElement(field)}
                  <Form.ErrorMessage field={field.name} />
                </Form.Field>
              ))}
            {watch1 && (
              <>
                <h2 className='text-center font-bold text-3xl col-span-3 mt-4'>
                  Informações adicionais
                </h2>
                {watch1.startsWith('1') && (
                  <>
                    {studentFields &&
                      studentFields.map((field, index) => (
                        <Form.Field size={field.options.size} key={index}>
                          <Form.Label htmlFor={field.name}>
                            {field.label}
                          </Form.Label>
                          {renderFormElement(field)}
                          <Form.ErrorMessage field={field.name} />
                        </Form.Field>
                      ))}
                  </>
                )}
                {watch1.startsWith('2') && (
                  <>
                    {professional &&
                      professional.map((field, index) => (
                        <Form.Field size={field.options.size} key={index}>
                          <Form.Label htmlFor={field.name}>
                            {field.label}
                          </Form.Label>
                          {renderFormElement(field)}
                          <Form.ErrorMessage field={field.name} />
                        </Form.Field>
                      ))}
                  </>
                )}
                {watch1.startsWith('3') && (
                  <>
                    {teacherFields &&
                      teacherFields.map((field, index) => (
                        <Form.Field size={field.options.size} key={index}>
                          <Form.Label htmlFor={field.name}>
                            {field.label}
                          </Form.Label>
                          {renderFormElement(field)}
                          <Form.ErrorMessage field={field.name} />
                        </Form.Field>
                      ))}
                  </>
                )}
              </>
            )}
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary mt-4 btn-block col-span-3 text-white'
            >
              Cadastrar
            </button>
          </form>
        </FormProvider>
      </InformationBox>
    </main>
  );
}
