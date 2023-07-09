'use client';

import { useContext, useEffect, useState } from 'react';
import arrayShuffle from 'array-shuffle';
import InformationBox from './InformationBox';
import { Pill } from '@/types/global_types';
import Markdown from './Markdown';
import { ThemeContext } from '@/contexts/ThemeProvider';

interface PillsStatus {
  id: number;
  answered: boolean;
}

interface DiagnosticsProps {
  pills: Pill[];
}

export default function Pills({ pills }: DiagnosticsProps) {
  const { setPillStatus: canGoNext } = useContext(ThemeContext);
  const [pillsStatus, setPillsStatus] = useState<PillsStatus[]>([]);
  const [shuffledPills, setShuffledPills] = useState<Pill[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const selectedDiagnostic = shuffledPills[selected];

  useEffect(() => {
    setShuffledPills(arrayShuffle(pills));

    const pillsStatus = pills.filter(pill => pill.correct).map((pill) => {
      return {
        id: pill.id,
        answered: false,
      };
    });
    setPillsStatus(pillsStatus);
    return () => {
      setShuffledPills([]);
      setPillsStatus([]);
    };
  }, [pills]);

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
    const pillIndex = pillsStatus.findIndex(
      (pill) => pill.id === pillId,
    );
    const newPillsStatus = [...pillsStatus];
    newPillsStatus[pillIndex].answered = true;
    setPillsStatus(newPillsStatus);
    if (newPillsStatus.every((pill) => pill.answered)) {
      canGoNext(true);
    }
  }

  console.log(pillsStatus)

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
