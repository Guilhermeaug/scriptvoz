export interface GroupAttributes {
  personal_data: string;
  history: string;
  complaint: string;
  behavior: string;
  symptoms: string;
  investigation: string;
  orl_report: string;
  larynx_analysis: string;
  self_evaluation: string;
  breathing: string;
  cpfa: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface User {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    isTeacher: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Patient {
  id: number;
  attributes: {
    title: string;
  };
}

export interface Group {
  data: {
    id: number;
    attributes: {
      description: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      teacher: {
        data: User;
      };
      students: {
        data: User[];
      };
      patients: {
        data: Patient[];
      };
    };
  };
}

export interface Groups {
  data: {
    id: number;
    attributes: {
      description: string;
      searchTitle: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
}

export interface UserProgressData {
  data: {
    id: number;
    attributes: {
      finished: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      patient: {
        data: Patient;
      };
    };
  };
}

export interface UserProgress {
  data: {
    id: number;
    attributes: {
      finished: boolean;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      patient: {
        data: Patient;
      };
    };
  }[];
}
