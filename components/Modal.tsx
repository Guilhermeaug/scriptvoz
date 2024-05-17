'use client';

import { sendResetPasswordCode } from '@/lib/auth';
import { GeneralPage } from '@/types/page_types';
import { useRef, useState } from 'react';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email(),
});

interface Props {
  pageAttributes: GeneralPage['data']['attributes'];
}

export default function Modal({ pageAttributes }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const dialog = useRef<HTMLDialogElement>(null);

  async function handleResetPassword() {
    const isValid = FormSchema.safeParse({ email }).success;
    if (!isValid) {
      setError(pageAttributes.invalid_email);
      return;
    }
    const res = await sendResetPasswordCode(email);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setSuccess(pageAttributes.success_email_message);
  }

  return (
    <>
      <button
        className='btn btn-link block text-xl'
        onClick={() => dialog?.current?.showModal()}
      >
        {pageAttributes.forgot_password}
      </button>
      <dialog ref={dialog} className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>{pageAttributes.your_email}</h3>
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
              {pageAttributes.send}
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>{pageAttributes.send}</button>
        </form>
      </dialog>
    </>
  );
}
