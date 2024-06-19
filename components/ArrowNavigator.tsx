'use client';

import { TestStatus } from '@/types/global_types';
import { cn } from '@/util/cn';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useReadLocalStorage } from 'usehooks-ts';

interface ArrowNavigatorProps {
  direction: 'left' | 'right';
  href: string;
  ids?: number[];
  correctAmount?: number;
  message: string;
}

interface QuestionStatus {
  id: number;
  testCasesStatus: TestStatus[];
}

export default function ArrowNavigator({
  direction,
  href,
  ids = [],
  correctAmount = 0,
  message,
}: ArrowNavigatorProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storage = useReadLocalStorage<QuestionStatus[]>('questions') || [];
  let testCasesIdsLength = storage
    .flatMap((qs) => qs.testCasesStatus)
    .filter((ts) => ids.find((id) => id === ts.id))
    .filter((ts) => ts.answered).length;

  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    setIsCompleted(testCasesIdsLength === correctAmount);
  }, [correctAmount, storage, testCasesIdsLength]);

  useEffect(() => {
    if (isCompleted === true) {
      toast.success(message);
    }
  }, [isCompleted, message]);

  const navClasses = cn(
    `w-24 rounded-br-lg p-2 bg-neutral text-neutral-content`,
    {
      'polygon-bl flex justify-end float-right mt-6': direction === 'right',
      'polygon-tr': direction === 'left',
      hidden: !isCompleted && direction === 'right',
    },
  );

  return (
    <div className={navClasses}>
      <Link href={href}>
        <button className='btn btn-square btn-ghost'>
          {direction == 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        </button>
      </Link>
    </div>
  );
}
