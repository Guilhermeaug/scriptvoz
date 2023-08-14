import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export default function Field(props: FieldProps) {
  return (
    <div
      className={`col-span-3 ${props.size && `md:col-span-${props.size}`}`}
      {...props}
    />
  );
}
