import { QuestionType } from '@/types/global_types';
import Question from './Question';
import { useContext } from 'react';

export default function Questions({
  questions,
}: {
  questions: QuestionType[];
}) {
  return (
    <section className='p-2 space-y-8'>
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
            id={question.id}
            question={question.question}
            answers={answers}
            feedbacks={feedbacks}
            correctAnswer={question.answer}
            // setAnsweredCorrect={() => setAnswered(question.id)}
          />
        );
      })}
    </section>
  );
}
