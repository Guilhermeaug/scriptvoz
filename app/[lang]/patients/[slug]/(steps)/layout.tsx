import Sidebar from '@/components/Sidebar';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { EvaluationPage, GeneralPage } from '@/types/page_types';
import { Patient } from '@/types/patients_types';

export default async function StepsLayout({
  params: { lang, slug },
  children,
}: {
  children: React.ReactNode;
  params: { lang: string; slug: string };
}) {
  const patientPromise: Promise<Patient> = getPatient({
    locale: lang,
    slug,
  });
  const evaluationPagePromise: Promise<EvaluationPage> = getPageData({
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
        attributes: { title },
      },
    },
    {
      data: { attributes: pageAttributes },
    },
    {
      data: { attributes: generalAttributes },
    },
  ] = await Promise.all([
    patientPromise,
    evaluationPagePromise,
    generalPagePromise,
  ]);

  return (
    <div className='container relative lg:grid lg:grid-cols-7 lg:gap-4'>
      <Sidebar
        title={title}
        generalAttributes={generalAttributes}
        pageAttributes={pageAttributes}
      />
      <div className='lg:col-span-5'>{children}</div>
    </div>
  );
}
