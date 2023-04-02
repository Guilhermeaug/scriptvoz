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

export const metadata = {
  title: 'Avaliação fonoaudiológica',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function EvaluationStep() {
  const { data }: EvaluationData = await getData({
    path: 'assessments/1',
  });
  const { attributes } = data;

  const { data: page }: EvaluationPage = await getData({
    path: 'evaluation-page',
  });
  const { attributes: pageAttributes } = page;

  return (
    <ThemeProvider color='evaluation'>
      <div className='container mx-auto p-7'>
        <ArrowNavigator href='/' direction='left' />
        <header>
          <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
        </header>
        <main>
          <section className='mt-10 space-y-4'>
            <article className='space-y-4'>
              <InformationHeader title={pageAttributes.anamnesis} />
              <InformationBox
                title={pageAttributes.personal_data}
                description={attributes.personal_data}
              />
              <InformationBox
                title={pageAttributes.history}
                description={attributes.history}
              />
              <InformationBox
                title={pageAttributes.complaint}
                description={attributes.complaint}
              />
              <InformationBox
                title={pageAttributes.behavior}
                description={attributes.behavior}
              />
              <InformationBox
                title={pageAttributes.symptoms}
                description={attributes.symptoms}
              />
              <InformationBox
                title={pageAttributes.investigation}
                description={attributes.investigation}
              />
            </article>

            <article className='space-y-4'>
              <InformationHeader title={pageAttributes.voice_samples} />
              <AudioSamples audios={attributes.audio_files.data} />
              <InformationBox
                title={pageAttributes.breathing}
                description={attributes.breathing}
              />
              <InformationBox
                title={pageAttributes.cpfa}
                description={attributes.cpfa}
              />
              <InformationBox
                title={pageAttributes.larynx_analysis}
                description={attributes.larynx_analysis}
              />
              <InformationBox
                title={pageAttributes.self_evaluation}
                description={attributes.self_evaluation}
              />
            </article>

            <article>
              <InformationHeader title={pageAttributes.acoustic_analysis} />
              <ComplementaryFiles files={attributes.complementary_files.data} />
            </article>

            <article>
              <InformationHeader
                title={pageAttributes.videolaryngostroboscopy}
              />
              <div className='mx-auto flex flex-col items-center justify-center gap-6 lg:w-10/12 lg:flex-row'>
                <VideoPlayer url={attributes.exam_video.data.attributes.url} />
                <InformationBox
                  title='Laudo ORL'
                  description={attributes.orl_report}
                />
              </div>
            </article>
          </section>

          <section className='space-y-4'>
            <InformationHeader title={pageAttributes.call_to_action} />
            <Questions questions={attributes.questions} />
          </section>
        </main>
        <ArrowNavigator href='/diagnostic' direction='right' />
      </div>
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
    <div className='flex flex-col items-center space-y-4'>
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
