import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input(props: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const fieldError = get(errors, props.name);
  const style = classNames('input input-bordered input-primary w-full max-w-xs', {
    'input-error': Boolean(fieldError),
  });

  return (
    <input
      id={props.name}
      className={style}
      {...register(props.name)}
      {...props}
    />
  );
}
