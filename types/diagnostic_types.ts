export interface Answers {
  diagnostics: Array<{ name: string; feedback: string }>;
  correct: number[];
}

interface DiagnosticAttributes {
  summary: string;
  answers: Answers;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DiagnosticData {
  data: {
    id: number;
    attributes: DiagnosticAttributes;
  };
}
