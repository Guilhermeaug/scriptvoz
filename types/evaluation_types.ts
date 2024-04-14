import { QuestionType } from './global_types';
import {
  type BlocksContent}
from '@strapi/blocks-react-renderer';
export interface Media {
  id: number;
  attributes: {
    name: string;
    url: string;
    caption: string;
    width: number;
    height: number;
  };
}

export interface EvaluationAttributes {
  id: number;
  personal_data: BlocksContent;
  history: BlocksContent;
  complaint: BlocksContent;
  behavior: BlocksContent;
  symptoms: BlocksContent;
  other_symptoms: BlocksContent;
  risk_factors: BlocksContent;
  investigation: BlocksContent;
  orl_report: BlocksContent;
  larynx_analysis: BlocksContent;
  self_evaluation: BlocksContent;
  breathing: BlocksContent;
  cpfa: BlocksContent;
  vocal_quality: BlocksContent;
  audio_files: {
    data: Media[];
  };
  complementary_files: {
    data: Media[];
  };
  exam_video: {
    data: Media;
  };
  personal_video: {
    data: Media;
  };
  see_evaluation_results: BlocksContent;
  see_vocal_results: BlocksContent;
  questions: QuestionType[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
