import { cn } from '@/util/cn';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

const MarkdownComponents: object = {
  p: (paragraph: { children?: boolean; node?: any }) => {
    const { node } = paragraph;

    if (node.children[0].tagName === 'img') {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
      const metaWidth = metastring.match(/{([^}]+)x/);
      const metaHeight = metastring.match(/x([^}]+)}/);
      const width = metaWidth ? metaWidth[1] : '768';
      const height = metaHeight ? metaHeight[1] : '432';
      const hasCaption = metastring?.toLowerCase().includes('{caption:');
      const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

      return (
        <>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${image.properties.src}`}
            width={width}
            height={height}
            alt={alt}
          />
          {hasCaption ? <div aria-label={caption}>{caption}</div> : null}
        </>
      );
    }
    return <p>{paragraph.children}</p>;
  },
  table: (table: { children?: boolean; node?: any }) => {
    const { children } = table;

    return <table className='table overflow-x-auto'>{children}</table>;
  },
};

export default function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ReactMarkdown
      className={cn('prose max-w-4xl md:prose-xl', className)}
      components={MarkdownComponents}
    >
      {children}
    </ReactMarkdown>
  );
}
