import SidebarShortcuts from '@/components/SidebarShortcuts';
import Stepper from '@/components/Stepper';
import { getPageData } from '@/lib/page_data';
import { getPatient } from '@/lib/patients';
import { EvaluationPage } from '@/types/page_types';
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
  const pagePromise: Promise<EvaluationPage> = getPageData({
    path: 'evaluation-page',
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
  ] = await Promise.all([patientPromise, pagePromise]);

  return (
    <div className='relative mx-auto max-w-screen-md lg:max-w-screen-xl'>
      <div className='mx-auto lg:grid lg:grid-cols-7 lg:gap-4'>
        <aside className='sticky left-4 top-2 col-span-2 mt-3 hidden h-screen self-start overflow-y-auto bg-stone-100 p-3 lg:flex lg:flex-col lg:gap-3'>
          <div className='flex'>
            <Stepper patient={title} />
          </div>
          <h3 className='text-center text-xl font-semibold text-primary'>
            Sumário
          </h3>
          <SidebarShortcuts pageAttributes={pageAttributes} />
        </aside>
        <main className='md:p-4 lg:col-span-5'>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
