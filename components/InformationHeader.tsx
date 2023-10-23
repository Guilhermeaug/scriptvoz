interface SectionHeaderProps {
  title: string;
}

export default function InformationHeader({ title }: SectionHeaderProps) {
  return <h2 className='break-words text-3xl font-bold'>{title}</h2>;
}
