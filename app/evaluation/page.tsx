import InformationHeader from '@/components/InformationHeader';

import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import Question from '@/components/Question';
import ThemeProvider from '@/contexts/ThemeProvider';
import { getData } from '@/lib/data';
import { EvaluationData, Media, QuestionType } from '@/types/evaluation_types';
import Image from 'next/image';

export const metadata = {
  title: 'Avaliação fonoaudiológica',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

export default async function EvaluationStep() {
  const { data }: EvaluationData = await getData({
    path: 'assessments/1?populate=deep',
  });
  const { attributes } = data;

  return (
    <ThemeProvider color='evaluation'>
      <div className='container mx-auto p-7'>
        <ArrowNavigator href='/' direction='left' />
        <header>
          <h1 className='text-center text-4xl'>Avaliação Fonoaudiológica</h1>
        </header>
        <main>
          <section className='mt-10 space-y-4'>
            <article className='space-y-4'>
              <InformationHeader title='Anamnese' />
              <InformationBox
                title='Dados Pessoais'
                description={attributes.personal_data}
              />
              <InformationBox
                title='História Pregressa da Disfonia'
                description={attributes.history}
              />
              <InformationBox
                title='Queixa'
                description={attributes.complaint}
              />
              <InformationBox
                title='Comportamentos Vocais'
                description={attributes.behavior}
              />
              <InformationBox
                title='Sintomas'
                description={attributes.symptoms}
              />
              <InformationBox
                title='Investigação complementar'
                description={attributes.investigation}
              />
            </article>

            <article className='space-y-4'>
              <InformationHeader title='Amostras Vocais' />
              <AudioSamples audios={attributes.audio_files.data} />
              <InformationBox
                title='Respiração'
                description={attributes.breathing}
              />
              <InformationBox
                title='Coordenação Pneumofonoarticulátoria'
                description={attributes.cpfa}
              />
              <InformationBox
                title='Avaliação Palpatória da Laringe'
                description={attributes.larynx_analysis}
              />
              <InformationBox
                title='Autoavaliação Vocal'
                description={attributes.self_evaluation}
              />
            </article>

            <article>
              <InformationHeader title='Análise Acústica' />
              <ComplementaryFiles files={attributes.complementary_files.data} />
            </article>

            <article>
              <InformationHeader title='Videolaringoestroboscopia' />
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
            <InformationHeader title='Vamos treinar o raciocínio lógico relacionado à avaliação?' />
            <Questions questions={attributes.questions.data} />
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
        const { attributes } = question;
        const answers = [
          attributes.A,
          attributes.B,
          attributes.C,
          attributes.D,
        ];
        const feedbacks = [
          attributes.feedback_a,
          attributes.feedback_b,
          attributes.feedback_c,
          attributes.feedback_d,
        ];
        return (
          <Question
            key={question.id}
            question={attributes.question}
            answers={answers}
            feedbacks={feedbacks}
            correctAnswer={attributes.answer}
          />
        );
      })}
    </>
  );
}
