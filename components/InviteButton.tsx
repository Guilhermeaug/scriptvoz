'use client';

import { ClipboardIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  inviteLink: string;
}

export default function InviteButton({ inviteLink, ...props }: Props) {
  const buttonText = useRef('Link de Convite');
  const [value, copy] = useCopyToClipboard();

  function copyToKeyboard() {
    copy(inviteLink);
    buttonText.current = 'Link Copiado';
  }

  return (
    <button
      className='btn btn-primary text-white'
      onClick={copyToKeyboard}
      type='button'
      {...props}
    >
      {buttonText.current}
      <ClipboardIcon className='h-6 w-6' />
    </button>
  );
}
