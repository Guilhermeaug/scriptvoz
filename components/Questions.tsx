'use client';

import { Media } from '@/types/evaluation_types';
import { QuestionType, TestStatus, TestType } from '@/types/global_types';
import { cn } from '@/util/cn';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Markdown from './Markdown';

const variations = {
  correct: 'bg-green-100 border-green-300 text-green-800',
  incorrect: 'bg-red-100 border-red-300 text-red-800',
  neutral: 'bg-white border-gray-300 text-gray-800',
};

interface QuestionStatus {
  id: number;
  testCasesStatus: TestStatus[];
}

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  const [questionStatusStorage = [], saveQuestions] = useLocalStorage<
    QuestionStatus[]
  >('questions', []);

  const [questionsStorage, setQuestionsStorage] = useState<QuestionStatus[]>(
    [],
  );
  useEffect(() => {
    setQuestionsStorage(questionStatusStorage);
  }, [questionStatusStorage]);

  function handleAnswer(questionStatus: QuestionStatus, testCaseId: number) {
    questionStatus.testCasesStatus = questionStatus.testCasesStatus.map((ts) =>
      ts.id === testCaseId ? { ...ts, answered: true } : ts,
    );
    const storageCopy = questionStatusStorage
      .slice()
      .filter((qs) => qs.id !== questionStatus.id);
    storageCopy.push(questionStatus);
    saveQuestions(storageCopy);
  }

  return (
    <article className='space-y-8'>
      {questions.map((question) => {
        let questionStatus = questionsStorage.find(
          (qs) => qs.id === question.id,
        );
        if (!questionStatus) {
          questionStatus = {
            id: question.id,
            testCasesStatus: question.test_cases.map((ts) => ({
              id: ts.id,
              answered: false,
            })),
          };
        }
        return (
          <Question
            key={question.id}
            id={question.id}
            title={question.question}
            images={question.images.data}
            testCases={question.test_cases}
            status={questionStatus}
            handleAnswer={handleAnswer}
          />
        );
      })}
    </article>
  );
}

interface QuestionProps {
  id: number;
  title: string;
  status: QuestionStatus;
  testCases: TestType[];
  handleAnswer: (questionStatus: QuestionStatus, testCaseId: number) => void;
  images?: Media[];
}

function Question({
  id,
  title,
  testCases,
  status,
  images,
  handleAnswer,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();

  return (
    <div className='space-y-3'>
      <div>
        <h3 className='text-xl font-semibold'>
          <Markdown>{title}</Markdown>
        </h3>
        <div className='flex gap-4'>
          {images &&
            images.map(({ attributes: file }, idx) => {
              const url = `${process.env.NEXT_PUBLIC_API_URL}${file.url}`;
              return (
                <Image
                  key={idx}
                  src={url}
                  alt={file.caption || file.name}
                  width={160}
                  height={160}
                  className='h-40 w-40 max-w-full cursor-pointer rounded-md border object-cover shadow-sm'
                />
              );
            })}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {testCases.map((testCase, index) => {
          const testCaseStatus = status.testCasesStatus.find(
            (t) => t.id === testCase.id,
          )!;

          const isAnswered = testCaseStatus.answered || false;
          const isCorrect = isAnswered && testCase.is_correct;

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
              key={testCase.id}
              onClick={() => {
                setSelectedAnswer(index);
                handleAnswer(status, testCase.id);
              }}
              className={style}
            >
              <p className='text-slate text-sm font-medium'>{testCase.title}</p>
            </button>
          );
        })}
      </div>
      {selectedAnswer !== undefined && (
        <Markdown className={'p-3'}>
          {testCases[selectedAnswer].feedback}
        </Markdown>
      )}
    </div>
  );
}
