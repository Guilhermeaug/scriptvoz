import { Media } from "./evaluation_types";

export interface TestType {
  id: number;
  title: string;
  feedback: string;
  is_correct: boolean;
}

export interface TestStatus {
  id: number;
  answered: boolean;
}

export interface QuestionType {
  id: number;
  question: string;
  images: {
    data: Media[];
  }
  test_cases: TestType[];
}

export interface Pill {
  id: number;
  title: string;
  feedback: string;
  correct: boolean;
}
