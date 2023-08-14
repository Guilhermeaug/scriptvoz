export interface PatientsPage {
  data: {
    id: number;
    attributes: {
      header: string;
    };
  };
}

export interface PatientAttributes {
  id: number;
  attributes: { title: string };
}

export interface PatientData {
  data: PatientAttributes[];
}
