import Markdown from '@/components/Markdown';
import { useAuth } from '@/lib/auth';
import { getPageData } from '@/lib/page_data';
import Link from 'next/link';

import { HomePage as HomePageType } from '@/types/page_types';

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: HomePageType = await getPageData({
    path: 'home-page',
    locale: lang,
  });

  const session = await useAuth();

  const buttonStyle = 'btn btn-primary text-white';

  return (
    <div className='mx-auto max-w-screen-md space-y-4 p-4 md:pt-8'>
      <h1 className='text-3xl font-bold'>{pageAttributes.title}</h1>
      <Markdown>{pageAttributes.front_text}</Markdown>
      <div className='mt-2 flex justify-end gap-2'>
        {session ? (
          <>
            {session.user.isTeacher && (
              <Link href='groups' locale={lang}>
                <button className={buttonStyle}>
                  {pageAttributes.groups_button_text}
                </button>
              </Link>
            )}
            <Link href='patients' locale={lang}>
              <button className={buttonStyle}>
                {pageAttributes.start_button_text}
              </button>
            </Link>
          </>
        ) : (
          <Link href='sign-in' locale={lang}>
            <button className={buttonStyle}>
              {pageAttributes.login_button_text}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
