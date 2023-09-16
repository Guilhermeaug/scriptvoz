export interface SignUpForm {
  data: Data;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  studentFields: Field[];
  teacherFields: Field[];
  professional: Field[];
  commom: Field[];
  email: Field;
  password: Field;
  role: Field;
  fullName: Field;
  username: Field;
}

export interface Field {
  id: number;
  __component?: string;
  name: string;
  type: string;
  label: string;
  options: Options;
  values: Values;
}

export interface Options {
  id: number;
  required: boolean;
  size: 1 | 2 | 3;
  validation?: string;
  data_type: string;
}

export interface Values {
  values: string[];
}
