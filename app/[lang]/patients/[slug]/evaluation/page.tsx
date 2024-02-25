import InformationHeader from '@/components/InformationHeader';

import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import BreadCrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import Markdown from '@/components/Markdown';
import Questions from '@/components/Questions';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { Media } from '@/types/evaluation_types';
import { EvaluationPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';
import Image from 'next/image';

export const metadata = {
  title: 'Avaliação Fonoaudiológica',
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
    <>
      <Header />
      <BreadCrumb />
      <main className='mx-auto max-w-screen-md space-y-4 p-2 md:p-3'>
        <section className='space-y-4'>
          <h2 className='mt-2 text-center text-4xl'>{pageAttributes.header}</h2>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.anamnesis}
          >
            <div>
              <InformationHeader title={pageAttributes.personal_data} />
              <Markdown>{patient.personal_data}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.history} />
              <Markdown>{patient.history}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.complaint} />
              <Markdown>{patient.complaint}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.behavior} />
              <Markdown>{patient.behavior}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.symptoms} />
              <Markdown>{patient.symptoms}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.other_symptoms} />
              <Markdown>{patient.other_symptoms}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.risk_factors} />
              <Markdown>{patient.risk_factors}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.investigation} />
              <Markdown>{patient.investigation}</Markdown>
            </div>
          </InformationBox>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.vocal_trial}
          >
            <div className='space-y-4'>
              <InformationHeader title={pageAttributes.voice_samples} />
              <AudioSamples audios={patient.audio_files.data} />
            </div>
            <div>
              <InformationHeader title={pageAttributes.breathing} />
              <Markdown>{patient.breathing}</Markdown>
            </div>
            <div>
              <InformationHeader title={pageAttributes.cpfa} />
              <Markdown>{patient.cpfa}</Markdown>
            </div>
            <div className='mx-auto w-[180px] max-w-full'>
              <VideoPlayer url={patient.personal_video.data.attributes.url} />
            </div>
          </InformationBox>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.acoustic_analysis}
          >
            <ComplementaryFiles files={patient.complementary_files.data} />
          </InformationBox>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.larynx_analysis}
          >
            <Markdown>{patient.larynx_analysis}</Markdown>
          </InformationBox>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.self_evaluation}
          >
            <Markdown>{patient.self_evaluation}</Markdown>
          </InformationBox>
        </section>
        <section className='space-y-4'>
          <h2 className='mt-2 text-center text-4xl'>
            {pageAttributes.ent_assessment}
          </h2>
          <InformationBox
            className='space-y-4 p-3'
            title={pageAttributes.videolaryngostroboscopy}
          >
            <div className={'mx-auto w-[400px] max-w-full'}>
              <VideoPlayer url={patient.exam_video.data.attributes.url} />
            </div>
            <div className='mx-auto mt-3 flex max-w-screen-md flex-col items-center justify-center gap-6'>
              <div className={'flex items-center justify-center gap-4'}></div>
              <div className='collapse collapse-arrow'>
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
          </InformationBox>
        </section>
        <InformationBox
          className='space-y-4 p-3'
          title={pageAttributes.questions_header}
        >
          <InformationHeader title={pageAttributes.call_to_action} />
          <Questions questions={patient.questions} />
        </InformationBox>
      </main>
      <ArrowNavigator
        href={`/${lang}/patients/${slug}/diagnostic`}
        direction='right'
        ids={patient.questions.map((q) => q.id)}
      />
    </>
  );
}

function AudioSamples({ audios }: { audios: Media[] }) {
  return (
    <div className='flex flex-wrap justify-center gap-2'>
      {audios.map(({ attributes: audio, id }) => (
        <AudioSample
          key={id}
          title={audio.caption || audio.name}
          audio={audio.url}
        />
      ))}
    </div>
  );
}

function ComplementaryFiles({ files }: { files: Media[] }) {
  return (
    <div className='mx-auto mt-3 flex max-w-full flex-col gap-4 md:max-w-screen-md'>
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
