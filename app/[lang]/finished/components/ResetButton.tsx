'use client';

import { navigateTo } from '@/util/navigateTo';
import { useRouter } from 'next/navigation';

type Props = {
  lang: string;
  text: string;
  patientId: number;
}

export default function ResetButton({lang, text, patientId}: Props) {
  const router = useRouter();

  function resetAndNavigate() {
    const allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    const patientQuestions = allQuestions.filter((q: { patientId: number; }) => q.patientId !== patientId);
    localStorage.setItem('questions', JSON.stringify(patientQuestions));
    router.replace(navigateTo(lang, ''));
  }

  return (
    <button className='btn btn-primary btn-lg' onClick={resetAndNavigate}>
      {text}
    </button>
  );
}
