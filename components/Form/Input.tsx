import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  isNumber?: boolean;
}

export default function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const style = classNames('input input-bordered input-primary w-full', {
    'input-error': Boolean(fieldError),
  });

  return (
    <input
      id={props.name}
      className={style}
      {...register(props.name, { valueAsNumber: props.isNumber })}
      {...props}
    />
  );
}
