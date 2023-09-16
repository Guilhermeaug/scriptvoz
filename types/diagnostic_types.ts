import { Pill } from './global_types';

export interface DiagnosticAttributes {
  id: number;
  summary: string;
  pills: Pill[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
export interface DiagnosticPage {
  data: {
    id: number;
    attributes: {
      header: string;
      summary: string;
      call_to_action: string;
    };
  };
}
