export interface Pill {
  id: number;
  title: string;
  feedback: string;
  correct: boolean;
}

interface TherapeuticAttributes {
  summary: string;
  pills: Pill[];
}

export interface TherapeuticData {
  data: {
    id: number;
    attributes: TherapeuticAttributes;
  };
}

export interface TherapeuticPage {
  data: {
    id: number;
    attributes: {
      header: string;
      summary: string;
      call_to_action: string;
    };
  };
}