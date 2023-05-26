import InformationHeader from '@/components/InformationHeader';

import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import Question from '@/components/Question';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import {
  EvaluationData,
  EvaluationPage,
  Media,
  QuestionType,
} from '@/types/evaluation_types';
import Image from 'next/image';
import Markdown from '@/components/Markdown';

export const metadata = {
  title: 'Avaliação fonoaudiológica',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function EvaluationStep({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) {
  const { data }: EvaluationData = await getData({
    path: 'evaluations/1',
    locale: lang,
  });
  const { attributes } = data;

  const { data: page }: EvaluationPage = await getData({
    path: 'evaluation-page',
    locale: lang,
  });
  const { attributes: pageAttributes } = page;

  return (
    <ThemeProvider color='evaluation'>
      <ArrowNavigator href={`/${lang}`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main>
        <section className='mt-10 space-y-4'>
          <article className='space-y-4'>
            <InformationHeader title={pageAttributes.anamnesis} />
            <InformationBox title={pageAttributes.personal_data}>
              <Markdown>{attributes.personal_data}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.history}>
              <Markdown>{attributes.history}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.complaint}>
              <Markdown>{attributes.complaint}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.behavior}>
              <Markdown>{attributes.behavior}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.symptoms}>
              <Markdown>{attributes.symptoms}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.investigation}>
              <Markdown>{attributes.investigation}</Markdown>
            </InformationBox>
          </article>

          <article className='space-y-4'>
            <InformationHeader title={pageAttributes.voice_samples} />
            <AudioSamples audios={attributes.audio_files.data} />
            <InformationBox title={pageAttributes.breathing}>
              <Markdown>{attributes.breathing}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.cpfa}>
              <Markdown>{attributes.cpfa}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.larynx_analysis}>
              <Markdown>{attributes.larynx_analysis}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.self_evaluation}>
              <Markdown>{attributes.self_evaluation}</Markdown>
            </InformationBox>
          </article>

          <article>
            <InformationHeader title={pageAttributes.acoustic_analysis} />
            <ComplementaryFiles files={attributes.complementary_files.data} />
          </article>

          <article>
            <InformationHeader title={pageAttributes.videolaryngostroboscopy} />
            <div className='mx-auto flex max-w-screen-md flex-col items-center justify-center gap-6'>
              <VideoPlayer url={attributes.exam_video.data.attributes.url} />
              <div className='collapse-arrow collapse'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  {pageAttributes.collapse_text}
                </div>
                <div className='collapse-content'>
                  <InformationBox title='Laudo ORL'>
                    <Markdown>{attributes.orl_report}</Markdown>
                  </InformationBox>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className='space-y-4'>
          <InformationHeader title={pageAttributes.call_to_action} />
          <Questions questions={attributes.questions} />
        </section>
      </main>
      <ArrowNavigator href={`${lang}/patients/diagnostic`} direction='right' />
    </ThemeProvider>
  );
}

function AudioSamples({ audios }: { audios: Media[] }) {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-2'>
      {audios.map((audio) => (
        <AudioSample
          key={audio.id}
          title={audio.attributes.caption}
          audio={audio.attributes.url}
        />
      ))}
    </div>
  );
}

function ComplementaryFiles({ files }: { files: Media[] }) {
  return (
    <div className='mx-auto flex max-w-screen-md flex-col gap-4'>
      {files.map((file) => {
        const { attributes } = file;
        const url = `${process.env.NEXT_PUBLIC_API_URL}${attributes.url}`;
        return (
          <Image
            key={file.id}
            src={url}
            alt={attributes.caption || ''}
            width={attributes.width}
            height={attributes.height}
          />
        );
      })}
    </div>
  );
}

function Questions({ questions }: { questions: QuestionType[] }) {
  return (
    <>
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
          />
        );
      })}
    </>
  );
}
