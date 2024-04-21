'use client';

import { EvaluationPage, GeneralPage } from '@/types/page_types';
import { usePathname } from 'next/navigation';

interface Props {
  evaluationAttributes: EvaluationPage['data']['attributes'];
  generalAttributes: GeneralPage['data']['attributes'];
}

export default function SidebarShortcuts({ evaluationAttributes, generalAttributes }: Props) {
  const pathname = usePathname();

  if (!pathname.includes('evaluation')) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-center text-xl font-semibold text-primary'>
        {generalAttributes.summary}
      </h3>
      <ul className='cursor-pointer space-y-6 text-center text-lg text-sky-600 underline'>
        <li onClick={() => scrollToElement('anamnesis')}>
          1. {evaluationAttributes.anamnesis}
        </li>
        <li onClick={() => scrollToElement('vocal_evaluation')}>
          2. {evaluationAttributes.vocal_evaluation}
        </li>
        <li onClick={() => scrollToElement('vocal_trial')}>
          3. {evaluationAttributes.vocal_trial}
        </li>
        <li onClick={() => scrollToElement('acoustic_analysis')}>
          4. {evaluationAttributes.acoustic_analysis}
        </li>
        <li onClick={() => scrollToElement('larynx_analysis')}>
          5. {evaluationAttributes.larynx_analysis}
        </li>
        <li onClick={() => scrollToElement('self_evaluation')}>
          6. {evaluationAttributes.self_evaluation}
        </li>
        <li onClick={() => scrollToElement('videolaryngostroboscopy')}>
          7. {evaluationAttributes.videolaryngostroboscopy}
        </li>
        <li onClick={() => scrollToElement('questions')}>
          8. {evaluationAttributes.questions_header}
        </li>
      </ul>
    </div>
  );
}

function scrollToElement(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
}
