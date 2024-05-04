import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  subtitleLink?: string;
}

export default function InformationHeader({
  title,
  subtitle,
  subtitleLink,
}: SectionHeaderProps) {
  return (
    <>
      <h2 className='break-words text-xl font-bold md:text-3xl'>{title}</h2>
      {subtitle && subtitleLink && (
        <Link
          href={subtitleLink}
          className='float-right break-words text-sm text-sky-600 underline md:text-base'
        >
          {subtitle}
        </Link>
      )}
    </>
  );
}
