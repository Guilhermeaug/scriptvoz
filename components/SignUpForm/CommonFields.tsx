import { Form } from '@/components/Form';
import { SignUpFields } from '@/types/sign_up_types';
import { useFormContext } from 'react-hook-form';

export function CommonFields({
  attributes,
}: {
  attributes: SignUpFields['data']['attributes'];
}) {
  const roleOptions = attributes.role.values.split(';');
  const genderOptions = attributes.gender.values.split(';');
  const genderPlaceholder = attributes.gender.field.validation;

  const { register } = useFormContext();

  return (
    <>
      <Form.Field>
        <Form.Label htmlFor='username'>{attributes.username.label}</Form.Label>
        <Form.Input
          type='text'
          name='username'
          placeholder={attributes.username.placeholder}
        />
        <Form.ErrorMessage field='username' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='email'>{attributes.email.label}</Form.Label>
        <Form.Input
          type='text'
          name='email'
          placeholder={attributes.email.placeholder}
        />
        <Form.ErrorMessage field='email' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='password'>{attributes.password.label}</Form.Label>
        <Form.Input
          type='password'
          name='password'
          placeholder={attributes.password.placeholder}
        />
        <Form.ErrorMessage field='password' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='fullName'>{attributes.fullName.label}</Form.Label>
        <Form.Input
          type='text'
          name='fullName'
          placeholder={attributes.fullName.placeholder}
        />
        <Form.ErrorMessage field='fullName' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='age'>{attributes.age.label}</Form.Label>
        <Form.Input
          type='text'
          name='age'
          placeholder={attributes.age.placeholder}
        />
        <Form.ErrorMessage field='age' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='gender'>
          {attributes.gender.field.label}
        </Form.Label>
        <Form.Select type='text' name='gender'>
          <option value=''>{genderPlaceholder}</option>
          {genderOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
        <Form.ErrorMessage field='gender' />
      </Form.Field>
      <Form.Field>
        <Form.Field>
          <Form.Label htmlFor='country'>{attributes.country.label}</Form.Label>
          <Form.Input
            type='text'
            name='country'
            placeholder={attributes.country.placeholder}
          />
          <Form.ErrorMessage field='country' />
        </Form.Field>
        <Form.Label htmlFor='city'>{attributes.city.label}</Form.Label>
        <Form.Input
          type='text'
          name='city'
          placeholder={attributes.city.placeholder}
        />
        <Form.ErrorMessage field='city' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='role'>{attributes.role.field.label}</Form.Label>
        <div className='join'>
          {roleOptions.map((value) => {
            return (
              <input
                key={value}
                className='btn join-item'
                type='radio'
                aria-label={value}
                value={value}
                {...register('role')}
              />
            );
          })}
        </div>
        <Form.ErrorMessage field='role' />
      </Form.Field>
    </>
  );
}
