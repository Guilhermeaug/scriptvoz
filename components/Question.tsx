'use client';

import { useProvider } from '@/contexts/Provider';
import { cn } from '@/util/cn';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import InformationBox from './InformationBox';
import Markdown from './Markdown';

export interface QuestionStatus {
  id: number;
  answers: boolean[];
  isCorrect: boolean;
}

interface QuestionProps {
  id: number;
  question: string;
  testCases: {
    title: string;
    feedback: string;
    is_correct: boolean;
  }
}

const variations = {
  correct: 'bg-green-100 border-green-300 text-green-800',
  incorrect: 'bg-red-100 border-red-300 text-red-800',
  neutral: 'bg-white border-gray-300 text-gray-800',
};

export default function Question({
  id,
  question,
  testCases,
}: QuestionProps) {
  const { completionSet, setCompletionSet } = useProvider();
  const [questionStatusStorage, saveQuestion] = useLocalStorage<QuestionStatus>(
    `questions.${id}`,
    {
      id,
      answers: Array(4).fill(false),
      isCorrect: false,
    } as QuestionStatus,
  );
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  useEffect(() => {
    setQuestionStatus(questionStatusStorage);
    if (!completionSet.has(id) && questionStatusStorage.isCorrect) {
      const completionSetCopy = new Set(completionSet);
      completionSetCopy.add(id);
      setCompletionSet(completionSetCopy);
    }
  }, [completionSet, id, questionStatusStorage, setCompletionSet]);

  // function handleAnswer(index: number) {
  //   const isCorrect = index === correctAnswer;

  //   const newAnswers = questionStatusStorage.answers;
  //   newAnswers[index] = true;
  //   const newQuestion: QuestionStatus = {
  //     id,
  //     isCorrect: questionStatusStorage.isCorrect || isCorrect,
  //     answers: newAnswers,
  //   };
  //   setSelectedAnswer(index);
  //   saveQuestion(newQuestion);
  // }

  return (
    <div className='space-y-3'>
      <h3 className='text-xl font-semibold'>{question}</h3>
      {/* {questionStatus && (
        <Answers
          questionStatus={questionStatus}
          correctAnswer={correctAnswer}
          handleAnswer={handleAnswer}
          answers={answers}
        />
      )}
      {selectedAnswer !== undefined && (
        <InformationBox title={question} className='mt-3'>
          <Markdown className={'p-3'}>{feedbacks[selectedAnswer]}</Markdown>
        </InformationBox>
      )} */}
    </div>
  );
}

function Answers({
  questionStatus,
  correctAnswer,
  handleAnswer,
  answers,
}: {
  questionStatus: QuestionStatus;
  correctAnswer: number;
  handleAnswer: (index: number) => void;
  answers: string[];
}) {
  return (
    <div className='flex flex-col gap-4'>
      {answers.map((answer, index) => {
        const isAnswered = questionStatus.answers[index];
        const isCorrect = isAnswered && index === correctAnswer;

        let variation: keyof typeof variations = 'neutral';
        if (isCorrect) {
          variation = 'correct';
        } else if (isAnswered) {
          variation = 'incorrect';
        }
        const style = cn(
          'rounded-md border px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          variations[variation],
        );
        return (
          <button
            key={answer}
            onClick={() => handleAnswer(index)}
            className={style}
          >
            <p className='text-slate text-sm font-medium'>{answer}</p>
          </button>
        );
      })}
    </div>
  );
}
