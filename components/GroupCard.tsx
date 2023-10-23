interface GroupCardProps {
  title: string;
  numberOfStudents: number;
}

export default function GroupCard({ title, numberOfStudents }: GroupCardProps) {
  return (
    <li
      className={
        'flex justify-between text-xl border border-1 border-red-700 border-b-0 p-1 last:border-b hover:cursor-pointer hover:bg-amber-200'
      }
    >
      <span>{title}</span>
      <span>{numberOfStudents} alunos</span>
    </li>
  );
}
