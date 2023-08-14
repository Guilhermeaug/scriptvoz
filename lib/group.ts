import { verifyIfHasPatient } from './data';

export async function createGroup(data: {
  description: string;
  searchTitle: string;
  teacher: number;
  patients: number[];
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/groups`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
    },
    method: 'POST',
    body: JSON.stringify({
      data: {
        ...data,
      },
    }),
  });

  if (!res.ok) {
    console.error(res.status);
    throw new Error('Could not create group.');
  }
}

export async function applyStudent({
  groupId,
  userId,
  patientsIds,
}: {
  groupId: number;
  userId: number;
  patientsIds: number[];
}) {
  await connectStudentToGroup();
  await connectUserProgress();

  async function connectStudentToGroup() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.BEARER}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        students: {
          connect: [userId],
        },
      }),
    });

    if (!res.ok) {
      console.error(res.statusText);
      throw new Error('Could not connect student to group.');
    }
  }

  async function connectUserProgress() {
    await Promise.all(
      patientsIds.map(async (patientId) => {
        const hasPatient = await verifyIfHasPatient({
          studentId: userId,
          patientId,
        });

        if (hasPatient) {
          return;
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-progresses`;
        const res = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER}`,
          },
          method: 'POST',
          body: JSON.stringify({
            data: {
              patient: patientId,
              student: userId,
            },
          }),
        });

        if (!res.ok) {
          console.error(res.statusText);
          throw new Error('Could not connect user progress.');
        }
      }),
    );
  }
}
