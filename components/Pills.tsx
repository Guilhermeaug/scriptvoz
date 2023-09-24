'use client';

import { useEffect, useState } from 'react';
import InformationBox from './InformationBox';
import { Pill } from '@/types/global_types';
import Markdown from './Markdown';
import { useLocalStorage } from 'usehooks-ts';
import classNames from 'classnames';
import { useProvider } from '@/contexts/Provider';

interface PillsStatus {
  id: number;
  answered: boolean;
}

interface PillsProps {
  pills: Pill[];
}

const variations = {
  correct: 'btn-success',
  incorrect: 'btn-error',
  neutral: '',
};

export default function Pills({ pills }: PillsProps) {
  const { setIsCompleted } = useProvider();
  const [pillsStatus, savePills] = useLocalStorage<PillsStatus[]>('pills', []);
  const [selected, setSelected] = useState<number>(-1);
  const [status, setStatus] = useState<PillsStatus[] | undefined>();

  useEffect(() => {
    setStatus(pillsStatus);
    const isEveryPillAnsweredCorrectly = pills
      .filter((pill) => pill.correct)
      .every(
        (pill) =>
          pillsStatus.find((pillStatus) => pillStatus.id === pill.id)?.answered,
      );
    setIsCompleted(isEveryPillAnsweredCorrectly);
  }, [pills, pillsStatus, setIsCompleted]);

  const selectedDiagnostic = pills[selected];

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const selected = e.currentTarget;
    const selectedIndex = Number(selected.dataset.index);
    setSelected(selectedIndex);
    updatePillsStatus(pills[selectedIndex].id);
  }

  function updatePillsStatus(pillId: number) {
    const pillIndex = pillsStatus.findIndex((pill) => pill.id === pillId);

    if (pillIndex === -1) {
      const newPill = {
        id: pillId,
        answered: true,
      };
      savePills([...pillsStatus, newPill]);
      return;
    }

    const newPill = pillsStatus[pillIndex];
    newPill.answered = true;
    savePills([...pillsStatus]);
  }

  return (
    <div className='mt-6 space-y-6 p-3'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 items-center'>
        {pills.map((pill, index) => {
          const { id, title, correct } = pill;
          const isAnswered =
            status?.find((pill) => pill.id == id)?.answered || false;

          const pillClass = classNames(
            'btn btn-rounded basis-1/2',
            isAnswered && variations[correct ? 'correct' : 'incorrect'],
          );

          return (
            <button
              className={pillClass}
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
          <Markdown className={'p-3'}>{selectedDiagnostic.feedback}</Markdown>
        </InformationBox>
      )}
    </div>
  );
}
