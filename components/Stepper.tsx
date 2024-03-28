'use client';

import { usePathname } from 'next/navigation';

const stepsObj = {
  evaluation: 1,
  diagnostic: 2,
  therapeutic: 3,
  finished: 4,
};

function buildStepper(p: keyof typeof stepsObj) {
  const value = stepsObj[p];

  return (
    <>
      <li className={`step ${value >= 1 ? 'step-primary' : ''}`}>Avaliação</li>
      <li className={`step ${value >= 2 ? 'step-primary' : ''}`}>
        Diagnóstico
      </li>
      <li className={`step ${value >= 3 ? 'step-primary' : ''}`}>Terapia</li>
      <li className={`step ${value >= 4 ? 'step-primary' : ''}`}>
        Agradecimento
      </li>
    </>
  );
}

export default function Stepper({ patient }: { patient: string }) {
  const pathname = usePathname().split('/');
  const lastSegment = pathname[pathname.length - 1];

  if (!(lastSegment in stepsObj)) {
    throw new Error(`Invalid step: ${lastSegment}`);
  }
  const steps = buildStepper(lastSegment as keyof typeof stepsObj);

  return (
    <div className='grid h-min w-min flex-1 auto-cols-max items-center justify-center gap-2 p-1 text-center'>
      <div className='bg-stone-600 p-2'>
        <p className='text-xl font-semibold text-white'>{patient}</p>
      </div>
      <ul className='steps steps-vertical'>{steps}</ul>
    </div>
  );
}
