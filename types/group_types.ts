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
      isActive: boolean;
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
      title: string;
      description: string;
      searchTitle: string;
      slug: string;
      students: {
        data: {
          id: number;
        }[];
      };
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
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
