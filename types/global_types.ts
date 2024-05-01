export interface QuestionType {
  id: number;
  question: string;
  test_cases: {
    title: string;
    feedback: string;
    is_correct: boolean;
  }
}

export interface Pill {
  id: number;
  title: string;
  feedback: string;
  correct: boolean;
}
