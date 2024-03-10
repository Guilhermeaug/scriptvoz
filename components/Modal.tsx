'use client';

import { sendResetPasswordCode } from '@/lib/auth';
import { useRef, useState } from 'react';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email(),
});

export default function Modal() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const dialog = useRef<HTMLDialogElement>(null);

  async function handleResetPassword() {
    const isValid = FormSchema.safeParse({ email }).success;
    if (!isValid) {
      setError('Email inválido');
      return;
    }
    const res = await sendResetPasswordCode(email);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setSuccess('Email enviado com sucesso');
  }

  return (
    <>
      <button
        className='btn btn-link text-xl'
        onClick={() => dialog?.current?.showModal()}
      >
        Esqueci minha senha
      </button>
      <dialog ref={dialog} className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>
            Informe seu email para resetar a sua senha.
          </h3>
          <div className='space-y-8 py-4'>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <input
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input input-primary w-full max-w-md'
            />
            <button
              onClick={handleResetPassword}
              className='btn btn-primary w-full max-w-md text-white'
            >
              Enviar
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
