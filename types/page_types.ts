interface Page<T = Record<string, string>> {
  data: {
    id: number;
    attributes: T;
  };
}

interface HomePageAttributes {
  front_text: string;
  call_text: string;
  button_text: string;
}

interface PatientsPageAttributes {
  header: string;
}

interface DiagnosticPageAttributes {
  header: string;
  summary: string;
  call_to_action: string;
}

interface EvaluationPageAttributes {
  header: string;
  anamnesis: string;
  personal_data: string;
  history: string;
  complaint: string;
  behavior: string;
  symptoms: string;
  investigation: string;
  voice_samples: string;
  breathing: string;
  cpfa: string;
  larynx_analysis: string;
  self_evaluation: string;
  acoustic_analysis: string;
  videolaryngostroboscopy: string;
  orl_report: string;
  call_to_action: string;
  collapse_text: string;
}

interface TherapeuticPageAttributes {
  header: string;
  summary: string;
  call_to_action: string;
}

export type HomePage = Page<HomePageAttributes>;
export type PatientsPage = Page<PatientsPageAttributes>;
export type DiagnosticPage = Page<DiagnosticPageAttributes>;
export type EvaluationPage = Page<EvaluationPageAttributes>;
export type TherapeuticPage = Page<TherapeuticPageAttributes>;
