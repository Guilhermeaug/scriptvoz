interface Page<T = Record<string, string>> {
  data: {
    id: number;
    attributes: T;
  };
}

interface Field {
  id: number;
  label: string;
  validation: string;
  placeholder: string;
}

interface FieldWithValues {
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
}

export type SignUpFields = Page<SignUp>;
