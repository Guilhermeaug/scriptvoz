'use client';

import { useState } from 'react';
import InformationBox from './InformationBox';
import Markdown from './Markdown';

interface QuestionProps {
  question: string;
  answers: string[];
  feedbacks: string[];
  correctAnswer: number;
  setAnsweredCorrect: () => void;
}

export default function Question({
  question,
  answers,
  feedbacks,
  correctAnswer,
  setAnsweredCorrect,
}: QuestionProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    setAnswered(true);
    setSelectedAnswer(Number(e.currentTarget.dataset.index));

    const answer = e.currentTarget;
    const answerIndex = Number(answer.dataset.index);
    const isCorrect = answerIndex === correctAnswer;

    if (isCorrect) {
      answer.classList.add(
        'bg-green-100',
        'border-green-300',
        'text-green-800'
      );
      setAnsweredCorrect();
    } else {
      answer.classList.add('bg-red-100', 'border-red-300', 'text-red-800');
    }
  }

  return (
    <article>
      <h3 className='text-xl font-semibold'>{question}</h3>
      <div className='mt-3 flex flex-col gap-4'>
        {answers.map((answer, index) => (
          <button
            key={index}
            data-index={index}
            onClick={handleAnswer}
            className='rounded-md border border-gray-300 px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <p className='text-slate text-sm font-medium'>{answer}</p>
          </button>
        ))}
      </div>
      {answered && (
        <InformationBox title={question} className='mt-3'>
          <Markdown>{feedbacks[selectedAnswer!]}</Markdown>
        </InformationBox>
      )}
    </article>
  );
}
