'use client';

import { GeneralPage } from '@/types/page_types';
import { usePathname } from 'next/navigation';

const stepsObj = {
  evaluation: 1,
  diagnostic: 2,
  therapeutic: 3,
  finished: 4,
};

function buildStepper(
  p: keyof typeof stepsObj,
  generalAttributes: GeneralPage['data']['attributes'],
) {
  const value = stepsObj[p];

  return (
    <>
      <li className={`step ${value >= 1 ? 'step-primary' : ''}`}>
        {generalAttributes.evaluation}
      </li>
      <li className={`step ${value >= 2 ? 'step-primary' : ''}`}>
        {generalAttributes.diagnostic}
      </li>
      <li className={`step ${value >= 3 ? 'step-primary' : ''}`}>
        {generalAttributes.therapeutic}
      </li>
    </>
  );
}

interface Props {
  patient: string;
  generalAttributes: GeneralPage['data']['attributes'];
}

export default function Stepper({ patient, generalAttributes }: Props) {
  const pathname = usePathname().split('/');
  const lastSegment = pathname[pathname.length - 1];

  if (!(lastSegment in stepsObj)) {
    throw new Error(`Invalid step: ${lastSegment}`);
  }
  const steps = buildStepper(
    lastSegment as keyof typeof stepsObj,
    generalAttributes,
  );

  return (
    <div className='grid h-min w-min flex-1 auto-cols-max items-center justify-center gap-2 p-1 text-center'>
      <div className='bg-stone-600 p-2'>
        <p className='text-xl font-semibold text-white'>{patient}</p>
      </div>
      <ul className='steps steps-vertical'>{steps}</ul>
    </div>
  );
}
