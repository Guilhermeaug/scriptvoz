'use client';

import { useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import InformationBox from './InformationBox';
import { Pill } from '@/types/global_types';
import Markdown from './Markdown';

interface DiagnosticsProps {
  pills: Pill[];
}

export default function Pills({ pills }: DiagnosticsProps) {
  const [shuffledPills, setShuffledPills] = useState<Pill[]>([]);

  useEffect(() => {
    setShuffledPills(arrayShuffle(pills));
  }, [pills]);

  const [selected, setSelected] = useState<number>(-1);
  const selectedDiagnostic = shuffledPills[selected];

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    setSelected(selectedIndex);

    const isCorrect = shuffledPills[selectedIndex].correct;
    if (isCorrect) {
      selected.classList.add('btn-success');
    } else {
      selected.classList.add('btn-error');
    }
  }

  return (
    <div className='mt-6 space-y-6'>
      <div className='grid grid-cols-2 justify-between gap-4'>
        {shuffledPills.map((pill, index) => {
          const { id, title } = pill;
          return (
            <button
              className='btn-rounded btn basis-1/2 '
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
        <InformationBox title={selectedDiagnostic.title}>
          <Markdown>{selectedDiagnostic.feedback}</Markdown>
        </InformationBox>
      )}
    </div>
  );
}
