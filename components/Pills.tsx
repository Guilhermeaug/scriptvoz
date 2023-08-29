'use client';

import { useContext, useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import InformationBox from './InformationBox';
import { Pill } from '@/types/global_types';
import Markdown from './Markdown';
import { ProviderContext } from '@/contexts/Provider';
import { useLocalStorage } from 'usehooks-ts';

interface PillsStatus {
  id: number;
  answered: boolean;
  isCorrect: boolean;
}

interface DiagnosticsProps {
  pills: Pill[];
}

export default function Pills({ pills }: DiagnosticsProps) {
  const { setPillStatus: canGoNext } = useContext(ProviderContext);
  const [pillsStatus, savePills] = useLocalStorage<PillsStatus[]>('pills', []);
  const [shuffledPills, setShuffledPills] = useState<Pill[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const selectedDiagnostic = shuffledPills[selected];

  // useEffect(() => {
  //   setShuffledPills(arrayShuffle(pills));
  //
  //   const loadedPillsStatus = [...pillsStatus];
  //   pills.forEach((pill) => {
  //     const pillIndex = loadedPillsStatus.findIndex(
  //       (loadedPill) => loadedPill.id === pill.id,
  //     );
  //     if (pillIndex === -1) {
  //       loadedPillsStatus.push({
  //         id: pill.id,
  //         answered: false,
  //         isCorrect: pill.correct,
  //       });
  //     }
  //   });
  //   if (loadedPillsStatus.filter((p) => p.isCorrect).every((p) => p.answered)) {
  //     canGoNext(true);
  //   }
  //     savePills(loadedPillsStatus);
  // }, [canGoNext, pills, pillsStatus, savePills]);

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    setSelected(selectedIndex);

    const isCorrect = shuffledPills[selectedIndex].correct;
    if (isCorrect) {
      selected.classList.add('btn-success');
      setAnswered(shuffledPills[selectedIndex].id);
    } else {
      selected.classList.add('btn-error');
    }
  }

  function setAnswered(pillId: number) {
    const pillIndex = pillsStatus.findIndex((pill) => pill.id === pillId);
    const newPillsStatus = [...pillsStatus];
    newPillsStatus[pillIndex].answered = true;
    savePills(newPillsStatus);
    if (newPillsStatus.filter((p) => p.isCorrect).every((p) => p.answered)) {
      canGoNext(true);
    }
  }

  console.log(pillsStatus);

  return (
    <div className='mt-6 space-y-6'>
      <div className='grid grid-cols-2 justify-between gap-4'>
        {shuffledPills.map((pill, index) => {
          const { id, title } = pill;
          return (
            <button
              className='btn-rounded btn basis-1/2'
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
