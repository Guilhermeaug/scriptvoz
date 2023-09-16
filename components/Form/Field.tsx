import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3;
}

const sizes = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
};

export default function Field(props: FieldProps) {
  return <div className={`col-span-3 ${sizes[props.size || 3]}`} {...props} />;
}
