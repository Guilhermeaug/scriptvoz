import InformationHeader from '@/components/InformationHeader';

import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import { getPageData } from '@/lib/page_data';
import { EvaluationPage, Media } from '@/types/evaluation_types';
import Image from 'next/image';
import Markdown from '@/components/Markdown';
import Questions from '@/components/Questions';
import Provider from '@/contexts/Provider';
import { getPatient } from '@/lib/patients';
import { Patient } from '@/types/patients_types';

export const metadata = {
  title: 'Avaliação fonoaudiológica',
  description: 'Projeto de pesquisa em Fonoaudiologia',
};

interface EvaluationStepProps {
  params: { lang: string; slug: string };
}

export default async function EvaluationStep({
  params: { lang, slug },
}: EvaluationStepProps) {
  const patientPromise: Promise<Patient> = getPatient({
    locale: lang,
    slug,
  });
  const pagePromise: Promise<EvaluationPage> = getPageData({
    path: 'evaluation-page',
    locale: lang,
  });
  const [
    {
      data: {
        attributes: { evaluation: patient },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise]);

  return (
    <Provider color='evaluation'>
      <ArrowNavigator href={`/${lang}/patients`} direction='left' />
      <header>
        <h1 className='text-center text-4xl'>{pageAttributes.header}</h1>
      </header>
      <main>
        <section className='mt-10 space-y-4'>
          <article className='space-y-4'>
            <InformationHeader title={pageAttributes.anamnesis} />
            <InformationBox title={pageAttributes.personal_data}>
              <Markdown>{patient.personal_data}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.history}>
              <Markdown>{patient.history}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.complaint}>
              <Markdown>{patient.complaint}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.behavior}>
              <Markdown>{patient.behavior}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.symptoms}>
              <Markdown>{patient.symptoms}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.investigation}>
              <Markdown>{patient.investigation}</Markdown>
            </InformationBox>
          </article>

          <article className='space-y-4'>
            <InformationHeader title={pageAttributes.voice_samples} />
            <AudioSamples audios={patient.audio_files.data} />
            <InformationBox title={pageAttributes.breathing}>
              <Markdown>{patient.breathing}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.cpfa}>
              <Markdown>{patient.cpfa}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.larynx_analysis}>
              <Markdown>{patient.larynx_analysis}</Markdown>
            </InformationBox>
            <InformationBox title={pageAttributes.self_evaluation}>
              <Markdown>{patient.self_evaluation}</Markdown>
            </InformationBox>
          </article>

          <article>
            <InformationHeader title={pageAttributes.acoustic_analysis} />
            <ComplementaryFiles files={patient.complementary_files.data} />
          </article>

          <article>
            <InformationHeader title={pageAttributes.videolaryngostroboscopy} />
            <div className='mx-auto flex max-w-screen-md flex-col items-center justify-center gap-6'>
              <VideoPlayer url={patient.exam_video.data.attributes.url} />
              <div className='collapse-arrow collapse'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  {pageAttributes.collapse_text}
                </div>
                <div className='collapse-content'>
                  <InformationBox title='Laudo ORL'>
                    <Markdown>{patient.orl_report}</Markdown>
                  </InformationBox>
                </div>
              </div>
            </div>
          </article>

          <article>
            <InformationHeader title={'Vídeo Pessoal'} />
            <div className='mx-auto flex max-w-screen-md h-80 flex-col items-center justify-center gap-6'>
              <VideoPlayer url={patient.personal_video.data.attributes.url} />
            </div>
          </article>
        </section>

        <section className='space-y-4'>
          <InformationHeader title={pageAttributes.call_to_action} />
          <Questions questions={patient.questions} />
        </section>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/diagnostic`}
        direction='right'
      />
    </Provider>
  );
}

function AudioSamples({ audios }: { audios: Media[] }) {
  console.log(audios);
  return (
    <div className='flex flex-row flex-wrap justify-center gap-2'>
      {audios.map(({ attributes: audio, id }) => (
        <AudioSample key={id} title={audio.caption} audio={audio.url} />
      ))}
    </div>
  );
}

function ComplementaryFiles({ files }: { files: Media[] }) {
  return (
    <div className='mx-auto flex max-w-screen-md flex-col gap-4'>
      {files.map(({ attributes: file }, id) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${file.url}`;
        return (
          <Image
            key={id}
            src={url}
            alt={file.caption || ''}
            width={file.width}
            height={file.height}
          />
        );
      })}
    </div>
  );
}
