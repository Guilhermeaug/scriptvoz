'use client';

import { QuestionType } from '@/types/global_types';
import Question from './Question';
import { useContext, useEffect } from 'react';
import { ProviderContext } from '@/contexts/Provider';
import { useLocalStorage } from 'usehooks-ts';

interface QuestionStatus {
  id: number;
  answered: boolean;
}

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  const { setQuestionsStatus: canGoNext } = useContext(ProviderContext);
  const [questionsStatus, saveQuestions] = useLocalStorage<QuestionStatus[]>(
    'questions',
    [],
  );

  useEffect(() => {
    const loadedQuestionsStatus = [...questionsStatus];
    questions.forEach((question) => {
      if (
        !loadedQuestionsStatus.find(
          (questionStatus) => questionStatus.id === question.id,
        )
      ) {
        loadedQuestionsStatus.push({
          id: question.id,
          answered: false,
        });
      }
    });
    const questionsFromThisStep = loadedQuestionsStatus.filter((question) =>
      questions.find((q) => q.id === question.id),
    );
    if (questionsFromThisStep.every((question) => question.answered)) {
      canGoNext(true);
    }
    saveQuestions(loadedQuestionsStatus);
  }, []);

  function setAnswered(questionId: number) {
    const questionIndex = questionsStatus.findIndex(
      (question) => question.id === questionId,
    );
    const newQuestionsStatus = [...questionsStatus];
    newQuestionsStatus[questionIndex].answered = true;
    saveQuestions(newQuestionsStatus);
    if (newQuestionsStatus.every((question) => question.answered)) {
      canGoNext(true);
    }
    saveQuestions(newQuestionsStatus);
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
        const questionStatus =
          questionsStatus.find(
            (questionStatus) => questionStatus.id === question.id,
          )?.answered ?? false;
        return (
          <Question
            key={question.id}
            question={question.question}
            answers={answers}
            feedbacks={feedbacks}
            correctAnswer={question.answer}
            setAnsweredCorrect={() => setAnswered(question.id)}
            status={questionStatus}
          />
        );
      })}
    </div>
  );
}
