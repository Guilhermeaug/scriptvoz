import { useFormContext } from 'react-hook-form';
import { get } from './ErrorMessage';
import classNames from 'classnames';

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string;
}

export default function Select(props: SelectProps) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const fieldError = get(errors, props.name);
  const fieldTouched = get(touchedFields, props.name);
  const style = classNames('select select-bordered w-full', {
    'select-error': Boolean(fieldError),
    'select-success': Boolean(fieldTouched) && !Boolean(fieldError),
  });
  let isNumber = props.type === 'number';

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
