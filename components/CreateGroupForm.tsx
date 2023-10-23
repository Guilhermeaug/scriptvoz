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
import * as Dialog from '@radix-ui/react-dialog';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { useState } from 'react';

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

  const [open, setOpen] = useState(false);

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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className='btn btn-primary text-white'>Adicionar Turma</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          <Dialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
            Adicionar Turma
          </Dialog.Title>
          <Dialog.Description className='text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal'>
            Preencha os campos para criar uma nova turma sob seu controle.
          </Dialog.Description>
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
              <div className='flex justify-center'>
                <button
                  type={'submit'}
                  disabled={isSubmitting}
                  className='btn btn-primary mt-4 btn-wide text-white'
                >
                  Cadastrar
                </button>
              </div>
              <Dialog.Close asChild>
                <button
                  type={'button'}
                  className='text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
                  aria-label='Close'
                >
                  <CloseIcon />
                </button>
              </Dialog.Close>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
