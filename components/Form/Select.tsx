import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string;
}

export default function Select(props: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const style = classNames('select select-bordered select-primary w-full', {
    'select-error': Boolean(fieldError),
  });
  let isNumber = props.type === 'number';

  console.log(props.name, props.type, isNumber);

  return (
    <select
      id={props.name}
      className={style}
      {...register(props.name, { valueAsNumber: isNumber })}
      {...props}
    >
      {props.children}
    </select>
  );
}
