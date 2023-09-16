import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  isNumber?: boolean;
}

export default function TextArea(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const style = classNames(
    'textarea textarea-bordered textarea-primary w-full',
    {
      'input-error': Boolean(fieldError),
    },
  );

  return (
    <textarea
      id={props.name}
      className={style}
      {...register(props.name, { valueAsNumber: props.isNumber })}
      {...props}
    />
  );
}
