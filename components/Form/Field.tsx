'use client';

import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3;
}

const sizes = {
  1: 'col-span-3 sm:col-span-1',
  2: 'col-span-3 sm:col-span-2',
  3: 'col-span-3',
};

export default function Field({ size = 3, ...props }: FieldProps) {
  let sizeClass = sizes[size];

  return <div className={`${sizeClass}`}>{props.children}</div>;
}
