interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function InformationHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <>
      <h2 className='break-words text-xl font-bold md:text-3xl'>{title}</h2>
      {subtitle && (
        <p className='break-words text-sm md:text-base'>
          {subtitle}
        </p>
      )}
    </>
  );
}
