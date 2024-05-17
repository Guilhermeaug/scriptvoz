import BlocksRendererClient from '@/components/BlocksRendererClient';
import { getPageData } from '@/lib/page_data';
import { ManualPage as ManualPageAttributes } from '@/types/page_types';

export default async function ManualPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: ManualPageAttributes = await getPageData({
    path: 'manual-page',
    locale: lang,
  });

  return (
    <div className='container mx-auto p-4 md:pt-8'>
      <BlocksRendererClient content={pageAttributes.content} />
    </div>
  );
}
