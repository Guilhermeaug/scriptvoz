'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isNumber?: boolean;
}

export default function Input({
  name,
  isNumber = false,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);
  const style = classNames('input input-bordered input-primary w-full', {
    'input-error': Boolean(fieldError),
  });

  return (
    <input
      id={name}
      className={style}
      {...register(name, { valueAsNumber: isNumber })}
      {...props}
    />
  );
}
