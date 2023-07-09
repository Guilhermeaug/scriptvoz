'use client';

import { QuestionType } from '@/types/global_types';
import Question from './Question';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeProvider';

interface QuestionStatus {
  id: number;
  answered: boolean;
}

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  const { setQuestionsStatus: canGoNext } = useContext(ThemeContext);
  const [questionsStatus, setQuestionsStatus] = useState<QuestionStatus[]>([]);
  useEffect(() => {
    const questionsStatus = questions.map((question) => {
      return {
        id: question.id,
        answered: false,
      };
    });
    setQuestionsStatus(questionsStatus);
    return () => {
      setQuestionsStatus([]);
    };
  }, [questions]);

  function setAnswered(questionId: number) {
    const questionIndex = questionsStatus.findIndex(
      (question) => question.id === questionId,
    );
    const newQuestionsStatus = [...questionsStatus];
    newQuestionsStatus[questionIndex].answered = true;
    setQuestionsStatus(newQuestionsStatus);
    if (newQuestionsStatus.every((question) => question.answered)) {
      canGoNext(true);
    }
  }

  return (
    <div className='p-2 space-y-8'>
      {questions.map((question) => {
        const answers = [question.A, question.B, question.C, question.D];
        const feedbacks = [
          question.feedback_a,
          question.feedback_b,
          question.feedback_c,
          question.feedback_d,
        ];
        return (
          <Question
            key={question.id}
            question={question.question}
            answers={answers}
            feedbacks={feedbacks}
            correctAnswer={question.answer}
            setAnsweredCorrect={() => setAnswered(question.id)}
          />
        );
      })}
    </div>
  );
}
