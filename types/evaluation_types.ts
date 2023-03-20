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

export interface QuestionType {
  id: number;
  attributes: {
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    feedback_a: string;
    feedback_b: string;
    feedback_c: string;
    feedback_d: string;
    answer: number;
  };
}

interface EvaluationAttributes {
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

  audio_files: {
    data: Media[];
  };

  complementary_files: {
    data: Media[];
  };

  exam_video: {
    data: Media;
  };

  questions: {
    data: QuestionType[];
  };

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface EvaluationData {
  data: {
    id: number;
    attributes: EvaluationAttributes;
  };
}
