'use client';

import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  readonly content: BlocksContent;
};

export default function BlocksRendererClient({ content }: Props) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className='prose prose-stone max-w-prose text-justify lg:prose-lg'>
            {children}
          </p>
        ),
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return (
              <ol className='prose prose-stone max-w-prose list-inside list-decimal text-justify lg:prose-lg'>
                {children}
              </ol>
            );
          } else {
            return (
              <ul className='prose prose-stone max-w-prose list-inside list-disc text-justify lg:prose-lg'>
                {children}
              </ul>
            );
          }
        },
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <h1 className='prose prose-stone max-w-prose text-3xl lg:prose-lg'>
                  {children}
                </h1>
              );
            case 2:
              return (
                <h2 className='prose prose-stone max-w-prose text-2xl lg:prose-lg'>
                  {children}
                </h2>
              );
            case 3:
              return (
                <h3 className='prose prose-stone max-w-prose text-xl lg:prose-lg'>
                  {children}
                </h3>
              );
            default:
              return (
                <h3 className='prose prose-stone max-w-prose text-xl lg:prose-lg'>
                  {children}
                </h3>
              );
          }
        },
        link: ({ children, url }) => (
          <Link href={url} className='prose prose-stone prose-a:text-blue-600'>
            {children}
          </Link>
        ),
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ''}
              className='mx-auto max-w-full'
            />
          );
        },
      }}
      modifiers={{
        bold: ({ children }) => (
          <strong className='font-semibold'>{children}</strong>
        ),
        italic: ({ children }) => <span className='italic'>{children}</span>,
      }}
    />
  );
}
