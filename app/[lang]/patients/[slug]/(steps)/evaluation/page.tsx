import InformationBox from '@/components/InformationBox';
import VideoPlayer from '@/components/VideoPlayer';

import ArrowNavigator from '@/components/ArrowNavigator';
import AudioSample from '@/components/AudioSample';
import BlocksRendererClient from '@/components/BlocksRendererClient';
import InformationHeader from '@/components/InformationHeader';
import ModalImage from '@/components/ModalImage';
import Questions from '@/components/Questions';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { Media } from '@/types/evaluation_types';
import { EvaluationPage, GeneralPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';
import { navigateTo } from '@/util/navigateTo';

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
  const generalPagePromise: Promise<GeneralPage> = getPageData({
    path: 'general',
    locale: lang,
  });
  const [
    {
      data: {
        id,
        attributes: { evaluation: patient },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
    {
      data: { attributes: generalPageAttributes },
    },
  ] = await Promise.all([patientPromise, pagePromise, generalPagePromise]);

  const { correctAmount, correctIds } = patient.questions.reduce(
    (
      acc: {
        correctAmount: number;
        correctIds: number[];
      },
      q,
    ) => {
      q.test_cases.forEach((ts) => {
        if (ts.is_correct) {
          acc.correctAmount += 1;
          acc.correctIds.push(ts.id);
        }
      });
      return acc;
    },
    { correctAmount: 0, correctIds: [] },
  );

  return (
    <div className='mx-auto mt-6 max-w-screen-md space-y-4 p-3'>
      <section className='space-y-4'>
        <h2 className='text-wrap break-words text-center text-2xl md:text-4xl'>
          {pageAttributes.header}
        </h2>
        <InformationBox
          color='evaluation'
          title={pageAttributes.anamnesis}
          id='anamnesis'
        >
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
          </div>
        </InformationBox>
        <InformationBox
          color='evaluation'
          title={pageAttributes.vocal_evaluation}
          id='vocal_evaluation'
        >
          <div className='space-y-4 p-3'>
            <div>
              <InformationHeader title={pageAttributes.behavior} />
              <BlocksRendererClient content={patient.behavior} />
            </div>
            <div>
              <InformationHeader
                title={pageAttributes.symptoms}
                subtitle={pageAttributes.symptoms_info}
              />
              <BlocksRendererClient content={patient.symptoms} />
              <BlocksRendererClient content={patient.other_symptoms} />
            </div>
            <div>
              <InformationHeader title={pageAttributes.risk_factors} />
              <BlocksRendererClient content={patient.risk_factors} />
            </div>
            <div>
              <InformationHeader title={pageAttributes.vocal_quality} />
              <BlocksRendererClient content={patient.vocal_quality} />
            </div>
            <div>
              <InformationHeader title={pageAttributes.investigation} />
              <BlocksRendererClient content={patient.investigation} />
            </div>
          </div>
        </InformationBox>
        <InformationBox
          color='evaluation'
          title={pageAttributes.vocal_trial}
          id='vocal_trial'
        >
          <div className='space-y-4 p-3'>
            <div className='space-y-4'>
              <InformationHeader title={pageAttributes.voice_samples} />
              <AudioSamples audios={patient.audio_files.data} />
            </div>
            <div className='collapse collapse-arrow'>
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium'>
                {pageAttributes.see_results}
              </div>
              <div className='collapse-content'>
                <BlocksRendererClient content={patient.see_vocal_results} />
              </div>
            </div>
            <div className='mx-auto w-[35ch] max-w-full'>
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
        <InformationBox
          color='evaluation'
          title={pageAttributes.acoustic_analysis}
          id='acoustic_analysis'
        >
          <div className='space-y-4 p-3'>
            <ComplementaryFiles files={patient.complementary_files.data} />
            <div className='collapse collapse-arrow'>
              <input type='checkbox' />
              <div className='collapse-title text-xl font-medium'>
                {pageAttributes.see_results}
              </div>
              <div className='collapse-content'>
                <BlocksRendererClient content={patient.see_accoustic_results} />
              </div>
            </div>
          </div>
        </InformationBox>
        <InformationBox
          color='evaluation'
          title={pageAttributes.larynx_analysis}
          id='larynx_analysis'
        >
          <div className='space-y-4 p-3'>
            <BlocksRendererClient content={patient.larynx_analysis} />
          </div>
        </InformationBox>
        <InformationBox
          color='evaluation'
          title={pageAttributes.self_evaluation}
          id='self_evaluation'
        >
          <div className='space-y-4 p-3'>
            <BlocksRendererClient content={patient.self_evaluation} />
          </div>
        </InformationBox>
      </section>
      <section className='space-y-4'>
        <h2 className='text-wrap break-words text-center text-2xl md:text-4xl'>
          {pageAttributes.ent_assessment}
        </h2>
        <InformationBox
          color='evaluation'
          title={pageAttributes.videolaryngostroboscopy}
          id='videolaryngostroboscop'
        >
          <div className='space-y-4 p-3'>
            <div className='mx-auto max-w-full'>
              <VideoPlayer url={patient.exam_video.data.attributes.url} />
            </div>
            <div className='mx-auto mt-3 flex max-w-screen-md flex-col items-center justify-center gap-6'>
              <div className='collapse collapse-arrow'>
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium'>
                  {pageAttributes.collapse_text}
                </div>
                <div className='collapse-content'>
                  <InformationBox
                    color='evaluation'
                    title={pageAttributes.orl_report}
                  >
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
        <InformationBox
          color='evaluation'
          title={pageAttributes.questions_header}
          id='questions'
        >
          <div className='h-min space-y-4 p-3'>
            <InformationHeader title={pageAttributes.call_to_action} />
            <Questions patientId={id} questions={patient.questions} />
          </div>
        </InformationBox>
      </section>
      <ArrowNavigator
        href={navigateTo(lang, `patients/${slug}/diagnostic`)}
        direction='right'
        ids={correctIds}
        correctAmount={correctAmount}
        message={generalPageAttributes.finished_questions_message}
      />
    </div>
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
    <div className='mt-3 gap-4 space-y-10 p-3'>
      {files.map(({ attributes: file }, id) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${file.url}`;
        return (
          <ModalImage
            key={id}
            className='mx-auto block max-w-full'
            small={url}
            large={url}
            medium={url}
            alt={file.caption || file.name}
          />
        );
      })}
    </div>
  );
}
