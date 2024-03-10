'use client';

import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export default function Field({ ...props }: FieldProps) {
  return <div className={props.className}>{props.children}</div>;
}
