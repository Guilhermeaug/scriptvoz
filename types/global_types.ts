export interface QuestionType {
  id: number;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  feedback_a: string;
  feedback_b: string;
  feedback_c: string;
  feedback_d: string;
  answer: number;
}

export interface Pill {
  id: number;
  title: string;
  feedback: string;
  correct: boolean;
}
