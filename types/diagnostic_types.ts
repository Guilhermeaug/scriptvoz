import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { Pill } from './global_types';

export interface DiagnosticAttributes {
  id: number;
  summary: BlocksContent;
  pills: Pill[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
