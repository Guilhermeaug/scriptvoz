'use client';

import { cn } from '@/util/cn';
import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export default function Field({ ...props }: FieldProps) {
  const style = cn('flex-1', props.className);

  return <div className={style}>{props.children}</div>;
}
