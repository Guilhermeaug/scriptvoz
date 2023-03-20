'use client';

import { Answers } from '@/types/diagnostic_types';
import { useState } from 'react';
import InformationBox from './InformationBox';

interface DiagnosticsProps {
  answers: Answers;
}

export default function Diagnostics({ answers }: DiagnosticsProps) {
  const { diagnostics, correct } = answers;
  const [selected, setSelected] = useState<number>(-1);
  const selectedDiagnostic = diagnostics[selected];

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    setSelected(selectedIndex);

    const isCorrect = correct.includes(selectedIndex);
    if (isCorrect) {
      selected.classList.add('btn-success');
    } else {
      selected.classList.add('btn-error');
    }
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
        {diagnostics.map((diagnostic, index) => {
          const { name } = diagnostic;

          return (
            <button
              className='btn-rounded btn text-xs'
              key={name}
              data-index={index}
              onClick={handleAnswer}
            >
              {name}
            </button>
          );
        })}
      </div>
      {selectedDiagnostic && (
        <InformationBox
          title={selectedDiagnostic.name}
          description={selectedDiagnostic.feedback}
        />
      )}
    </div>
  );
}
