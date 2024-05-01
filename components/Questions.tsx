'use client';

import { QuestionType, TestStatus, TestType } from '@/types/global_types';
import { cn } from '@/util/cn';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import InformationBox from './InformationBox';
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
  patientId,
  questions,
}: {
  patientId: number;
  questions: QuestionType[];
}) {
  const [questionStatusStorage = [], saveQuestion] = useLocalStorage<
    QuestionStatus[]
  >('questions', []);

  function handleAnswer(testCaseId: number) {}

  return (
    <article className='space-y-8'>
      {questions.map((question) => {
        let questionStatus = questionStatusStorage.find(
          (qs) => qs.id === question.id,
        );
        if (!questionStatus) {
          questionStatus = {
            id: question.id,
            testCasesStatus: question.test_cases.map((testCase) => ({
              id: testCase.id,
              answered: false,
            })),
          };
        }
        return (
          <Question
            key={question.id}
            id={question.id}
            title={question.question}
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
  handleAnswer: (testCaseId: number) => void;
}

function Question({
  title: question,
  testCases,
  status,
  handleAnswer,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();

  return (
    <div className='space-y-3'>
      <h3 className='text-xl font-semibold'>{question}</h3>
      <Options
        status={status}
        testCases={testCases}
        handleAnswer={handleAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      {selectedAnswer !== undefined && (
        <InformationBox title={question} className='mt-3'>
          <Markdown className={'p-3'}>{}</Markdown>
        </InformationBox>
      )}
    </div>
  );
}

function Options({
  status,
  testCases,
  handleAnswer,
  setSelectedAnswer,
}: {
  status: QuestionStatus;
  testCases: TestType[];
  handleAnswer: (testCaseId: number) => void;
  setSelectedAnswer: (index: number) => void;
}) {
  return (
    <div className='flex flex-col gap-4'>
      {testCases.map((testCase, index) => {
        const testCaseStatus = status.testCasesStatus.find(
          (t) => t.id === testCase.id,
        )!;

        const isAnswered = testCaseStatus.isAnswered || false;
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
            onClick={() => handleAnswer(testCase.id)}
            className={style}
          >
            <p className='text-slate text-sm font-medium'>{testCase.title}</p>
          </button>
        );
      })}
    </div>
  );
}
