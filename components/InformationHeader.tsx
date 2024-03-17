interface SectionHeaderProps {
  title: string;
}

export default function InformationHeader({ title }: SectionHeaderProps) {
  return <h2 className='break-words text-xl font-bold md:text-3xl'>{title}</h2>;
}
