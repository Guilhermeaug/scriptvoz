'use client';

import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';

interface AudioSampleProps {
  title: string;
  audio: string;
}

export default function AudioSample({ title, audio }: AudioSampleProps) {
  const audioUrl = `${process.env.NEXT_PUBLIC_API_URL}${audio}`;
  const [play, { stop }] = useSound(audioUrl, {
    interrupt: true,
  });

  return (
    <div className='flex w-[80%] flex-initial flex-row items-center space-x-2 rounded-xl border md:w-[30%]'>
      <button
        className='btn btn-primary basis-1/4 border-none'
        onMouseEnter={() => play()}
        onMouseLeave={() => stop()}
      >
        <SpeakerWaveIcon className='h-10 w-10' />
      </button>
      <span className='px-1 text-sm'>{title}</span>
    </div>
  );
}
