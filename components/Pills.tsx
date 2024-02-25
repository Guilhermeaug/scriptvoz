'use client';

import { useProvider } from '@/contexts/Provider';
import { Pill } from '@/types/global_types';
import { cn } from '@/util/cn';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import InformationBox from './InformationBox';
import Markdown from './Markdown';

interface PillStatus {
  id: number;
  isCorrect: boolean;
  answered: boolean;
}

interface PillsProps {
  patientId: number;
  pills: Pill[];
}

const variations = {
  correct: 'btn-success',
  incorrect: 'btn-error',
  neutral: 'btn-neutral',
};

export default function Pills({ patientId, pills }: PillsProps) {
  const { completionSet, setCompletionSet } = useProvider();
  const [pillsStatusStorage, savePills] = useLocalStorage<PillStatus[]>(
    `pills.${patientId}`,
    [],
  );
  const [pillsStatus, setPillsStatus] = useState<PillStatus[]>([]);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    setPillsStatus(pillsStatusStorage);
    pillsStatusStorage.forEach((pill) => {
      if (!completionSet.has(pill.id) && pill.isCorrect) {
        const completionSetCopy = new Set(completionSet);
        completionSetCopy.add(pill.id);
        setCompletionSet(completionSetCopy);
      }
    });
  }, [completionSet, pillsStatusStorage, setCompletionSet]);

  function handleAnswer(index: number) {
    setSelected(index);

    const pill = pills[index];
    const pillStatus = pillsStatusStorage.find((p) => p.id === pill.id);
    const pillStatusIndex = pillsStatusStorage.findIndex(
      (p) => p.id === pill.id,
    );
    if (!pillStatus) {
      const newPill = {
        id: pill.id,
        answered: true,
        isCorrect: pill.correct,
      };
      savePills([...pillsStatus, newPill]);
      return;
    }

    const pillsStatusCopy = [...pillsStatus];
    pillsStatusCopy[pillStatusIndex] = {
      ...pillStatus,
      answered: true,
      isCorrect: pill.correct,
    };
    savePills(pillsStatusCopy);
  }

  const selectedDiagnostic = pills[selected as number] || null;
  return (
    <article className='mt-6 space-y-6 p-3'>
      <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
        {pills.map((pill, index) => {
          const { id, title, correct } = pill;
          const isAnswered =
            pillsStatus?.find((pill) => pill.id == id)?.answered || false;

          let variation: keyof typeof variations = 'neutral';
          if (isAnswered && correct) {
            variation = 'correct';
          } else if (isAnswered) {
            variation = 'incorrect';
          }
          const style = cn('btn btn-rounded basis-1/2', variations[variation]);

          return (
            <button
              key={id}
              className={style}
              onClick={() => handleAnswer(index)}
            >
              {title}
            </button>
          );
        })}
      </div>
      {selectedDiagnostic !== null && (
        <InformationBox title={selectedDiagnostic.title}>
          <Markdown className={'p-3'}>{selectedDiagnostic.feedback}</Markdown>
        </InformationBox>
      )}
    </article>
  );
}
