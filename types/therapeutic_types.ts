import { QuestionType } from './global_types';
import { type BlocksContent } from '@strapi/blocks-react-renderer';


export interface TherapeuticAttributes {
  id: number;
  summary: BlocksContent;
  questions: QuestionType[];
}
