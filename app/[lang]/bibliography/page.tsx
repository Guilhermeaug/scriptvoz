import BlocksRendererClient from '@/components/BlocksRendererClient';
import { getPageData } from '@/lib/page_data';
import { BibliographyPage as BibliographyAttributes } from '@/types/page_types';

export default async function BibliographyPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const {
    data: { attributes: pageAttributes },
  }: BibliographyAttributes = await getPageData({
    path: 'bibliography-page',
    locale: lang,
  });

  return (
    <div className='container mx-auto p-4 md:pt-8'>
      <BlocksRendererClient content={pageAttributes.content} />
    </div>
  );
}
