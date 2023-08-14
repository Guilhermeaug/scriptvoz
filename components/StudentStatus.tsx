import { getStudentStatus } from '@/lib/data';
import { User, UserProgress } from '@/types/group_types';

interface StudentStatusProps {
  id: number;
  student: User;
  patientsIds: number[];
}

export default async function StudentStatus({
  id,
  student,
  patientsIds,
}: StudentStatusProps) {
  const { username } = student.attributes;
  const { data }: UserProgress = await getStudentStatus({
    patientsIds,
    studentId: id,
  });

  return (
    <div className='collapse bg-base-200'>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>{username}</div>
      <div className='collapse-content'>
        <div className='flex flex-col space-y-4'>
          {data.map((p) => {
            const { patient, finished} = p.attributes;
            const {title} = patient.data.attributes;
            return <div key={p.id} className='flex flex-row space-x-8'>
              <p>{title}</p>
              <p>{finished ? 'Finalizado' : 'Em andamento'}</p>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}
