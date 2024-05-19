'use client';

import { cn } from '@/util/cn';
import {
  BlocksRenderer,
  type BlocksContent,
} from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  readonly content: BlocksContent;
  readonly className?: string;
};

export default function BlocksRendererClient({ content, className }: Props) {
  const style = cn(
    'prose prose-stone max-w-prose text-justify lg:prose-lg',
    className,
  );

  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className={style}>{children}</p>,
        list: ({ children, format }) => {
          if (format === 'ordered') {
            return (
              <ol className={`list-inside list-decimal ${style}`}>
                {children}
              </ol>
            );
          } else {
            return (
              <ul className={`list-inside list-disc ${style}`}>{children}</ul>
            );
          }
        },
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className={`${style} text-3xl`}>{children}</h1>;
            case 2:
              return <h2 className={`${style} text-2xl`}>{children}</h2>;
            case 3:
              return <h3 className={`${style} text-lg`}>{children}</h3>;
            default:
              return <h3 className={`${style} text-xl`}>{children}</h3>;
          }
        },
        link: ({ children, url }) => (
          <Link href={url} className={`${style} prose-a:text-blue-600`}>
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
