import { QuestionType } from './global_types';

export interface TherapeuticAttributes {
  summary: string;
  questions: QuestionType[];
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
