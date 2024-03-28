'use client';

import { EvaluationPage } from '@/types/page_types';

interface Props  {
  pageAttributes: EvaluationPage['data']['attributes'];
}

export default function SidebarShortcuts({
  pageAttributes
}: Props) {
  return (
    <ul className='space-y-6 text-center text-lg text-sky-600 underline'>
      <li onClick={() => scrollToElement("anamnesis")}>1. {pageAttributes.anamnesis}</li>
      <li onClick={() => scrollToElement("vocal_trial")}>2. {pageAttributes.vocal_trial}</li>
      <li onClick={() => scrollToElement("acoustic_analysis")}>3. {pageAttributes.acoustic_analysis}</li>
      <li onClick={() => scrollToElement("larynx_analysis")}>4. {pageAttributes.larynx_analysis}</li>
      <li onClick={() => scrollToElement("self_evaluation")}>5. {pageAttributes.self_evaluation}</li>
      <li onClick={() => scrollToElement("videolaryngostroboscopy")}>6. {pageAttributes.videolaryngostroboscopy}</li>
      <li onClick={() => scrollToElement("questions")}>7. {pageAttributes.questions_header}</li>
    </ul>
  );
}

function scrollToElement(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth'});
}
