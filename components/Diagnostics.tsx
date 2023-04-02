'use client';

import { Pill } from '@/types/therapeutic_types';
import { useState } from 'react';
import InformationBox from './InformationBox';

interface DiagnosticsProps {
  pills: Pill[];
}

export default function Diagnostics({ pills }: DiagnosticsProps) {
  const [selected, setSelected] = useState<number>(-1);
  const selectedDiagnostic = pills[selected];

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    setSelected(selectedIndex);

    const isCorrect = pills[selectedIndex].correct;
    if (isCorrect) {
      selected.classList.add('btn-success');
    } else {
      selected.classList.add('btn-error');
    }
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8'>
        {pills.map((pill, index) => {
          const { id, title } = pill;

          return (
            <button
              className='btn-rounded btn text-xs'
              key={id}
              data-index={index}
              onClick={handleAnswer}
            >
              {title}
            </button>
          );
        })}
      </div>
      {selectedDiagnostic && (
        <InformationBox
          title={selectedDiagnostic.title}
          description={selectedDiagnostic.feedback}
        />
      )}
    </div>
  );
}
