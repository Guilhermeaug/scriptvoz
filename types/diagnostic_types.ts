import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { Pill, QuestionType } from './global_types';

export interface DiagnosticAttributes {
  id: number;
  summary: BlocksContent;
  questions: QuestionType[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
