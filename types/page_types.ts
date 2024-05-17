import { BlocksContent } from '@strapi/blocks-react-renderer';

interface Page<T = Record<string, string>> {
  data: {
    id: number;
    attributes: T;
  };
}

interface HomePageAttributes {
  front_text: string;
  start_button_text: string;
  login_button_text: string;
  groups_button_text: string;
  title: string;
}

interface PatientsPageAttributes {
  header: string;
  clinical_cases: string;
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
  other_symptoms: string;
  risk_factors: string;
  vocal_trial: string;
  ent_assessment: string;
  questions_header: string;
  see_results: string;
  vocal_quality: string;
  vocal_evaluation: string;
  symptoms_info: string;
  symptoms_link: string;
}

interface TherapeuticPageAttributes {
  header: string;
  summary: string;
  call_to_action: string;
}

interface SignInPageAttributes {
  title: string;
  call_text: string;
  sign_in: string;
}

interface SignUpPageAttributes {
  title: string;
  sign_up: string;
}

interface GeneralAttributes {
  summary: string;
  diagnostic: string;
  evaluation: string;
  therapeutic: string;
}

interface FooterAttributes {
  about_us: string;
  contact: string;
  bibliographic_reference: string;
}

interface ManualAttributes {
  content: BlocksContent;
}

interface BibliographyAttributes {
  content: BlocksContent;
}

export type HomePage = Page<HomePageAttributes>;
export type PatientsPage = Page<PatientsPageAttributes>;
export type DiagnosticPage = Page<DiagnosticPageAttributes>;
export type EvaluationPage = Page<EvaluationPageAttributes>;
export type TherapeuticPage = Page<TherapeuticPageAttributes>;
export type SignInPage = Page<SignInPageAttributes>;
export type SignUpPage = Page<SignUpPageAttributes>;
export type GeneralPage = Page<GeneralAttributes>;
export type FooterPage = Page<FooterAttributes>;
export type ManualPage = Page<ManualAttributes>;
export type BibliographyPage = Page<BibliographyAttributes>;
