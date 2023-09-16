'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button className='btn btn-square btn-ghost' onClick={() => signOut()}>
      SAIR
    </button>
  );
}
