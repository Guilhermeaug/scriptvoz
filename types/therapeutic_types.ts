import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { QuestionType } from './global_types';

export interface TherapeuticAttributes {
  id: number;
  summary: BlocksContent;
  questions: QuestionType[];
}
