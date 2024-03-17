import { Form } from '@/components/Form';
import { SignUpFields } from '@/types/sign_up_types';

export function CommonFields({
  attributes,
}: {
  attributes: SignUpFields['data']['attributes'];
}) {
  const roleOptions = attributes.role.values.split(';');
  const genderOptions = attributes.gender.values.split(';');
  const genderPlaceholder = attributes.gender.field.validation;
  const rolePlaceholder = attributes.role.field.validation;

  return (
    <>
      <Form.Field>
        <Form.Label htmlFor='username'>{attributes.username.label}</Form.Label>
        <Form.Input type='text' name='username' />
        <Form.ErrorMessage field='username' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='email'>{attributes.email.label}</Form.Label>
        <Form.Input type='text' name='email' />
        <Form.ErrorMessage field='email' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='password'>{attributes.password.label}</Form.Label>
        <Form.Input type='password' name='password' />
        <Form.ErrorMessage field='password' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='fullName'>{attributes.fullName.label}</Form.Label>
        <Form.Input type='text' name='fullName' />
        <Form.ErrorMessage field='fullName' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='age'>{attributes.age.label}</Form.Label>
        <Form.Input type='text' name='age' />
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
        <Form.Label htmlFor='city'>{attributes.city.label}</Form.Label>
        <Form.Input type='text' name='city' />
        <Form.ErrorMessage field='city' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='country'>{attributes.country.label}</Form.Label>
        <Form.Input type='text' name='country' />
        <Form.ErrorMessage field='country' />
      </Form.Field>
      <Form.Field>
        <Form.Label htmlFor='role'>{attributes.role.field.label}</Form.Label>
        <Form.Select type='text' name='role'>
          <option value=''>{rolePlaceholder}</option>
          {roleOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
        <Form.ErrorMessage field='role' />
      </Form.Field>
    </>
  );
}
