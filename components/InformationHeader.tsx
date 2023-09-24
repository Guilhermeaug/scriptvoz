interface SectionHeaderProps {
  title: string;
}

export default function InformationHeader({ title }: SectionHeaderProps) {
  return <h2 className='mt-6 break-words text-3xl font-medium'>{title}</h2>;
}
