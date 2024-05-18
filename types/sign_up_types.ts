interface Page<T = Record<string, string>> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface Field {
  id: number;
  label: string;
  validation: string;
  placeholder: string;
}

export interface FieldWithValues {
  id: number;
  values: string;
  field: Field;
}

interface SignUp {
  username: Field;
  email: Field;
  password: Field;
  fullName: Field;
  role: FieldWithValues;
  age: Field;
  gender: FieldWithValues;
  city: Field;
  country: Field;
  graduationStep: Field;
  institution: Field;
  timeSinceGraduation: FieldWithValues;
  email_username_already_taken: string;
  unknown_error: string;
  email_not_confirmed: string;
}

export type SignUpFields = Page<SignUp>;
