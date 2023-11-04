export interface SignUpFormDefault {
  data: {
    id: number;
    attributes: {
      commom: Field[];
      studentFields: Field[];
      teacherFields: Field[];
      professional: Field[];
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      locale: string;
    };
  };
}

export interface SignUpFormModified {
  data: {
    id: number;
    attributes: {
      commom: CommomFields;
      studentFields: StudentFields;
      teacherFields: TeacherFields;
      professional: ProfessionalFields;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      locale: string;
    };
  };
}

export interface Options {
  id: number;
  required: boolean;
  size: 1 | 2 | 3;
  validation?: string;
  data_type: string;
}

export interface Field {
  id: number;
  __component: "form.select" | "form.input-text" | "form.checkbox";
  name: string;
  label: string;
  options: Options;
  values: {
    values: string[];
  }
}

export interface CommomFields {
  username: Field;
  email: Field;
  password: Field;
  fullName: Field;
  role: Field;
  age: Field;
  gender: Field;
  city: Field;
  country: Field;
}

export interface StudentFields {
  graduationStep: Field;
  institution: Field;
}

export interface TeacherFields {
  institution: Field;
}

export interface ProfessionalFields {
  timeSinceGraduation: Field;
}
