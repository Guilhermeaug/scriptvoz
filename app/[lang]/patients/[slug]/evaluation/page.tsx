import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import BlocksRendererClient from '@/components/BlocksRendererClient';
import BreadCrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import InformationHeader from '@/components/InformationHeader';
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
      <main className='mx-auto max-w-screen-md space-y-4 p-3 md:pt-8'>
        <section className='space-y-4'>
          <h2 className='text-wrap break-words text-center text-2xl md:text-4xl'>
            {pageAttributes.header}
          </h2>
          <InformationBox title={pageAttributes.anamnesis}>
            <div className='space-y-4 p-3'>
              <div>
                <InformationHeader title={pageAttributes.personal_data} />
                <BlocksRendererClient content={patient.personal_data} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.history} />
                <BlocksRendererClient content={patient.history} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.complaint} />
                <BlocksRendererClient content={patient.complaint} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.behavior} />
                <BlocksRendererClient content={patient.behavior} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.symptoms} />
                <BlocksRendererClient content={patient.symptoms} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.other_symptoms} />
                <BlocksRendererClient content={patient.other_symptoms} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.risk_factors} />
                <BlocksRendererClient content={patient.risk_factors} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.investigation} />
                <BlocksRendererClient content={patient.investigation} />
              </div>
            </div>
          </InformationBox>
          <InformationBox title={pageAttributes.vocal_trial}>
            <div className='space-y-4 p-3'>
              <div className='space-y-4'>
                <InformationHeader title={pageAttributes.voice_samples} />
                <AudioSamples audios={patient.audio_files.data} />
              </div>
              <div className='mx-auto w-[180px] max-w-full'>
                <VideoPlayer url={patient.personal_video.data.attributes.url} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.breathing} />
                <BlocksRendererClient content={patient.breathing} />
              </div>
              <div>
                <InformationHeader title={pageAttributes.cpfa} />
                <BlocksRendererClient content={patient.cpfa} />
              </div>
            </div>
          </InformationBox>
          <InformationBox title={pageAttributes.acoustic_analysis}>
            <div className='space-y-4 p-3'>
              <ComplementaryFiles files={patient.complementary_files.data} />
            </div>
          </InformationBox>
          <InformationBox title={pageAttributes.larynx_analysis}>
            <div className='space-y-4 p-3'>
              <BlocksRendererClient content={patient.larynx_analysis} />
            </div>
          </InformationBox>
          <InformationBox title={pageAttributes.self_evaluation}>
            <div className='space-y-4 p-3'>
              <BlocksRendererClient content={patient.self_evaluation} />
            </div>
          </InformationBox>
        </section>
        <section className='space-y-4'>
          <h2 className='text-wrap break-words text-center text-2xl md:text-4xl'>
            {pageAttributes.ent_assessment}
          </h2>
          <InformationBox title={pageAttributes.videolaryngostroboscopy}>
            <div className='space-y-4 p-3'>
              <div className='mx-auto w-[400px] max-w-full'>
                <VideoPlayer url={patient.exam_video.data.attributes.url} />
              </div>
              <div className='mx-auto mt-3 flex max-w-screen-md flex-col items-center justify-center gap-6'>
                <div className='collapse collapse-arrow'>
                  <input type='checkbox' />
                  <div className='collapse-title text-xl font-medium'>
                    {pageAttributes.collapse_text}
                  </div>
                  <div className='collapse-content'>
                    <InformationBox title='Laudo ORL'>
                      <div className='p-3'>
                        <BlocksRendererClient content={patient.orl_report} />
                      </div>
                    </InformationBox>
                  </div>
                </div>
              </div>
            </div>
          </InformationBox>
        </section>
        <section className='space-y-4'>
          <InformationBox title={pageAttributes.questions_header}>
            <div className='h-min space-y-4 p-3'>
              <InformationHeader title={pageAttributes.call_to_action} />
              <Questions questions={patient.questions} />
            </div>
          </InformationBox>
        </section>
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
    <div className='mt-3 max-w-full gap-4 space-y-10 p-3'>
      {files.map(({ attributes: file }, id) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${file.url}`;
        return (
          <Image
            className='block mx-auto'
            key={id}
            src={url}
            alt={file.caption || ''}
            width={file.width}
            height={file.height}
            quality={100}
          />
        );
      })}
    </div>
  );
}
