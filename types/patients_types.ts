import { DiagnosticAttributes } from '@/types/diagnostic_types';
import { EvaluationAttributes } from '@/types/evaluation_types';
import { TherapeuticAttributes } from '@/types/therapeutic_types';

export interface PatientsPage {
  data: {
    id: number;
    attributes: {
      header: string;
    };
  };
}

export interface PatientAttributes {
  id: number;
  attributes: { title: string; searchTitle: string };
}

export interface PatientData {
  data: PatientAttributes[];
}

export interface Patient {
  data: {
    id: number;
    attributes: {
      title: string;
      diagnostic: DiagnosticAttributes;
      evaluation: EvaluationAttributes;
      therapeutic: TherapeuticAttributes;
    };
  };
}
