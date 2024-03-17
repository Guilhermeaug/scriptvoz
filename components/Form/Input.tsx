'use client';

import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input(props: InputProps) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const fieldTouched = get(touchedFields, props.name);
  const style = classNames('input input-bordered w-full', {
    'input-error': Boolean(fieldError),
    'input-success': Boolean(fieldTouched) && !Boolean(fieldError),
  });
  let isNumber = props.type === 'number';

  return (
    <input
      id={props.name}
      className={style}
      {...register(props.name, { valueAsNumber: isNumber })}
      {...props}
    />
  );
}
