import { SignUpFields } from '@/types/sign_up_types';
import { z } from 'zod';

export function getFieldsSchema(signUpFields: SignUpFields) {
  const {
    data: { attributes },
  } = signUpFields;

  const commomFieldsSchema = z.object({
    username: z.string().min(3, attributes.username.validation),
    email: z.string().email(attributes.email.validation),
    password: z.string().min(8, attributes.password.validation),
    fullName: z.string().min(3, attributes.fullName.validation),
    age: z.coerce
      .number({
        invalid_type_error: attributes.age.validation,
      })
      .min(10, attributes.age.validation),
    gender: z.string().min(3, attributes.gender.field.validation),
    city: z.string().min(3, attributes.city.validation),
    country: z.string().min(3, attributes.country.validation),
  });

  const roleOptions = attributes.role.values.split(';');

  const studentFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(roleOptions[0]),
    graduationStep: z.coerce
      .number({
        invalid_type_error: attributes.graduationStep.validation,
      })
      .min(1, attributes.graduationStep.validation)
      .max(12, attributes.graduationStep.validation),
    institution: z.string().min(3, attributes.institution.validation),
  });

  const timeSinceOptions = attributes.timeSinceGraduation.values.split(';');

  const professionalFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(roleOptions[1]),
    timeSinceGraduation: z.custom<string>((val) =>
      timeSinceOptions.includes(val as string),
    ),
  });

  const teacherFieldsSchema = commomFieldsSchema.extend({
    role: z.literal(roleOptions[2]),
    institution: z.string().min(3, attributes.institution.validation),
  });

  return z.discriminatedUnion('role', [
    studentFieldsSchema,
    professionalFieldsSchema,
    teacherFieldsSchema,
  ]);
}
