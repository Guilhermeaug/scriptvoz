export interface User {
  id: number;
  attributes: {
    username: string;
    fullName: string;
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
      title: string;
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
