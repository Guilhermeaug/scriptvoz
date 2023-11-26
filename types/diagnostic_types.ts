import { Pill } from './global_types';

export interface DiagnosticAttributes {
  id: number;
  summary: string;
  pills: Pill[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
