import SidebarShortcuts from '@/components/SidebarShortcuts';
import Stepper from '@/components/Stepper';
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
    <div className='mx:auto container relative lg:grid lg:grid-cols-7 lg:gap-4'>
      <aside className='sticky left-0 top-0 col-span-2 hidden h-screen self-start overflow-y-auto bg-stone-100 p-3 lg:block'>
        <Stepper patient={title} generalAttributes={generalAttributes} />
        <SidebarShortcuts
          evaluationAttributes={pageAttributes}
          generalAttributes={generalAttributes}
        />
      </aside>
      <div className='lg:col-span-5'>{children}</div>
    </div>
  );
}
