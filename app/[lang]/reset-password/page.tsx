'use client';

import InformationBox from '@/components/InformationBox';
import { resetPassword } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage({
  params: { lang },
  searchParams: { code },
}: {
  params: { lang: string };
  searchParams: { code: string };
}) {
  const [error, setError] = useState<string>();
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleResetPassword() {
    const res = await resetPassword(code, password);
    if (res?.error) {
      setError(res.error);
      return;
    }
    alert('Senha resetada com sucesso. Prossiga com o login normalmente.');
    router.push('/');
  }

  if (!code) {
    router.push('/');
  }

  return (
    <div className='mx-auto flex max-w-screen-md flex-col items-center space-y-4 p-2 md:p-5 md:pt-16'>
      <InformationBox title='Recuperação de Senha' className='p-3'>
        <div className='flex flex-col items-center space-y-8 py-4'>
          {error && <p className='text-red-500'>{error}</p>}
          <input
            type='password'
            id='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input input-primary w-full max-w-lg'
          />
          <button
            onClick={handleResetPassword}
            className='btn btn-primary w-full max-w-lg text-white'
          >
            Enviar
          </button>
        </div>
      </InformationBox>
    </div>
  );
}
