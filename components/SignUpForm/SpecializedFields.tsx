import { SignUpFields } from '@/types/sign_up_types';
import { Form } from '../Form';

export function SpecializedFields({
  attributes,
  role,
}: {
  attributes: SignUpFields['data']['attributes'];
  role: string;
}) {
  const getRole = () => {
    const roleOptions = attributes.role.values.split(';');
    if (roleOptions[0] === role) {
      return 'student';
    }
    if (roleOptions[1] === role) {
      return 'professional';
    }
    if (roleOptions[2] === role) {
      return 'teacher';
    }
  };

  const roleType = getRole();
  if (roleType === 'student') {
    return (
      <>
        <Form.Field>
          <Form.Label htmlFor='graduationStep'>
            {attributes.graduationStep.label}
          </Form.Label>
          <Form.Input
            type='number'
            name='graduationStep'
            placeholder={attributes.graduationStep.placeholder}
          />
          <Form.ErrorMessage field='graduationStep' />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor='institution'>
            {attributes.institution.label}
          </Form.Label>
          <Form.Input
            type='text'
            name='institution'
            placeholder={attributes.institution.placeholder}
          />
          <Form.ErrorMessage field='institution' />
        </Form.Field>
      </>
    );
  }

  if (roleType === 'professional') {
    const timeSinceOptions = attributes.timeSinceGraduation.values.split(';');
    return (
      <Form.Field>
        <Form.Label htmlFor='timeSinceGraduation'>
          {attributes.timeSinceGraduation.field.label}
        </Form.Label>
        <Form.Select type='text' name='timeSinceGraduation'>
          <option value=''>
            {attributes.timeSinceGraduation.field.validation}
          </option>
          {timeSinceOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Form.Select>
        <Form.ErrorMessage field='timeSinceGraduation' />
      </Form.Field>
    );
  }

  if (roleType === 'teacher') {
    return (
      <Form.Field>
        <Form.Label htmlFor='institution'>
          {attributes.institution.label}
        </Form.Label>
        <Form.Input
          type='text'
          name='institution'
          placeholder={attributes.institution.placeholder}
        />
        <Form.ErrorMessage field='institution' />
      </Form.Field>
    );
  }
}
