import { QuestionType } from './global_types';

export interface TherapeuticAttributes {
  id: number;
  summary: string;
  questions: QuestionType[];
}
