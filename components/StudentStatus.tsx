import { User } from '@/types/group_types';
import { getStudentStatus } from '@/lib/groups';

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
  const { username, fullName } = student.attributes;
  const { data } = await getStudentStatus({
    patientsIds,
    studentId: id,
  });

  const finished = data.filter((p) => p.attributes.finished).length;
  const total = data.length;

  return (
    <div className='collapse join-item border rounded-none'>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium flex justify-between'>
        <span>{fullName}</span>
        <span>
          {finished}/{total}
        </span>
      </div>
      <div className='collapse-content'>
        <div className='flex flex-col space-y-4'>
          {data.map((p) => {
            const { patient, finished } = p.attributes;
            const { title } = patient.data.attributes;
            return (
              <div key={p.id} className='flex flex-row space-x-8'>
                <p>{title}</p>
                <p>{finished ? 'Finalizado' : 'Em andamento'}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
