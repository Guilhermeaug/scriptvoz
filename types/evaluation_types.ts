import { QuestionType } from './global_types';

export interface Media {
  id: number;
  name: string;
  url: string;
  caption: string;
  width: number;
  height: number;
}

export interface EvaluationAttributes {
  personal_data: string;
  history: string;
  complaint: string;
  behavior: string;
  symptoms: string;
  investigation: string;
  orl_report: string;
  larynx_analysis: string;
  self_evaluation: string;
  breathing: string;
  cpfa: string;
  audio_files: Media[];
  complementary_files: Media[];
  exam_video: Media;
  personal_video: Media;
  questions: QuestionType[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface EvaluationPage {
  data: {
    id: number;
    attributes: {
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
    };
  };
}
