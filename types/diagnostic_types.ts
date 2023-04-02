import { Pill } from "./therapeutic_types";

interface DiagnosticAttributes {
  summary: string;
  pills: Pill[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DiagnosticData {
  data: {
    id: number;
    attributes: DiagnosticAttributes;
  };
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