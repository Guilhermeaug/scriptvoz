'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Form } from './Form';
import { createGroup } from '@/lib/groups';
import { PatientAttributes } from '@/types/patients_types';
import Select from 'react-select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CreateFormGroupProps {
  patients: PatientAttributes[];
}

const FormSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  patients: z.array(z.object({ value: z.number(), label: z.string() })).min(1),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateFormGroup({ patients }: CreateFormGroupProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const registerForm = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = registerForm;

  async function onSubmit(data: FormData) {
    const user = session!.user;
    try {
      const searchTitle = data.title.toLowerCase().replace(/\s/g, '-');
      const patients = data.patients.map((patient) => patient.value);
      const payload = {
        ...data,
        searchTitle,
        patients,
        teacher: parseInt(user.id),
      };
      await createGroup(payload);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  const options = patients.map((patient) => ({
    value: patient.id,
    label: patient.attributes.title,
  }));

  if (!session) {
    return null;
  }

  return (
    <FormProvider {...registerForm}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
        <Form.Field size={3}>
          <Form.Label htmlFor='title'>
            Dê um título para a nova turma
          </Form.Label>
          <Form.Input type='text' name='title' />
          <Form.ErrorMessage field='title' />
        </Form.Field>
        <Form.Field size={3}>
          <Form.Label htmlFor='description'>
            Dê uma descrição para a nova turma
          </Form.Label>
          <Form.TextArea name='description' />
          <Form.ErrorMessage field='description' />
        </Form.Field>
        <Form.Field size={3}>
          <Form.Label htmlFor='patients'>
            Escolha os pacientes da turma
          </Form.Label>
          <Controller
            name='patients'
            control={control}
            render={({ field }) => (
              // @ts-ignore
              <Select
                {...field}
                options={options}
                isMulti
                className='my-react-select-container'
                classNamePrefix='my-react-select'
                placeholder={'Selecione os pacientes'}
              />
            )}
          />
          <Form.ErrorMessage field='patients' />
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
  );
}
