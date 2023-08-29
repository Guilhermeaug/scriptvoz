'use client';

import { useEffect, useMemo, useState } from 'react';
import InformationBox from './InformationBox';
import Markdown from './Markdown';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import classNames from 'classnames';

export interface QuestionStatus {
  id: number;
  answered: boolean;
  answers: boolean[];
}

interface QuestionProps {
  id: number;
  question: string;
  answers: string[];
  feedbacks: string[];
  correctAnswer: number;
}

const variations = {
  correct: 'bg-green-100 border-green-300 text-green-800',
  incorrect: 'bg-red-100 border-red-300 text-red-800',
  neutral: '',
};

export default function Question({
  id,
  question,
  answers,
  feedbacks,
  correctAnswer,
}: QuestionProps) {
  const [questionsStatus, saveQuestions] = useLocalStorage<QuestionStatus[]>(
    'questions',
    [],
  );
  const [status, setStatus] = useState<QuestionStatus | undefined>();

  useEffect(() => {
    setStatus(questionsStatus.find((question) => question.id === id));
  }, [questionsStatus]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    setSelectedAnswer(Number(e.currentTarget.dataset.index));
    const answer = e.currentTarget;
    const answerIndex = Number(answer.dataset.index);
    updateQuestionStatus(id, true, answerIndex);
  }

  function updateQuestionStatus(
    questionId: number,
    answered: boolean,
    optionIndex: number,
  ) {
    const questionIndex = questionsStatus.findIndex(
      (question) => question.id === questionId,
    );

    if (questionIndex === -1) {
      const newQuestion = {
        id: questionId,
        answered,
        answers: Array(4).fill(false),
      };
      newQuestion.answers[optionIndex] = true;
      saveQuestions([...questionsStatus, newQuestion]);
      return;
    }

    const newQuestion = questionsStatus[questionIndex];
    newQuestion.answered = answered;
    newQuestion.answers[optionIndex] = true;
    saveQuestions([...questionsStatus]);
  }

  return (
    <article>
      <h3 className='text-xl font-semibold'>{question}</h3>
      <div className='mt-3 flex flex-col gap-4'>
        {answers.map((answer, index) => {
          const isCorrect = index === correctAnswer;
          const isAnswered = status?.answers[index] || false;

          let variation: keyof typeof variations = 'neutral';
          if (isAnswered && isCorrect) {
            variation = 'correct';
          } else if (isAnswered && !isCorrect) {
            variation = 'incorrect';
          }
          const style = classNames(
            'rounded-md border px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            twMerge(variations[variation]),
          );
          return (
            <button
              key={index}
              data-index={index}
              onClick={handleAnswer}
              className={style}
            >
              <p className='text-slate text-sm font-medium'>{answer}</p>
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <InformationBox title={question} className='mt-3'>
          <Markdown>{feedbacks[selectedAnswer!]}</Markdown>
        </InformationBox>
      )}
    </article>
  );
}
