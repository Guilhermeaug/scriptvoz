import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Checkbox(props: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const style = classNames('checkbox checkbox-primary', {
    'checkbox-error': Boolean(fieldError),
  });

  return (
    <input
      id={props.name}
      className={style}
      {...register(props.name)}
      {...props}
    >
      {props.children}
    </input>
  );
}
