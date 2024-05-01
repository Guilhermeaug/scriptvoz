import { QuestionType } from '@/types/global_types';
import Question from './Question';

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  return (
    <article className='space-y-8'>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            id={question.id}
            question={question.question}
            testCases={question.test_cases}
          />
        );
      })}
    </article>
  );
}
