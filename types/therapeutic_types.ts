export interface Answers {
  diagnostics: Array<{ name: string; feedback: string }>;
  correct: number[];
}

interface TherapeuticAttributes {
  summary: string;
  answers: Answers;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TherapeuticData {
  data: {
    id: number;
    attributes: TherapeuticAttributes;
  };
}
