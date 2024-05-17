'use client';

import { resetPassword } from '@/lib/auth';
import { ResetPasswordPage } from '@/types/page_types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  code: string;
  pageAttributes: ResetPasswordPage['data']['attributes'];
}

export default function ResetPasswordForm({ code, pageAttributes }: Props) {
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleResetPassword() {
    const res = await resetPassword(code, password);
    if (res?.error) {
      setError(res.error);
      toast.error(pageAttributes.error_message);
      return;
    }
    toast.success(pageAttributes.success_message);
    router.push('/');
  }

  if (!code) {
    router.push('/');
  }

  return (
    <>
      {error && <p className='text-red-500'>{error}</p>}
      <input
        type='password'
        id='password'
        placeholder={pageAttributes.password}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='input input-primary w-full max-w-lg'
      />
      <button
        onClick={handleResetPassword}
        className='btn btn-primary w-full max-w-lg text-white'
      >
        {pageAttributes.button_text}
      </button>
    </>
  );
}
