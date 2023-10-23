import qs from 'qs';
import { UserProgress, Groups, Group } from '@/types/group_types';

async function verifyIfHasPatient({
  studentId,
  patientId,
}: {
  studentId: number;
  patientId: number;
}) {
  const query = qs.stringify(
    {
      filters: {
        student: {
          id: {
            $eq: studentId,
          },
        },
        patient: {
          id: {
            $eq: patientId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/user-progresses?${query}`;
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['groups'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the student status.');
  }

  const json: UserProgress = await res.json();
  return json.data.length > 0;
}

export async function getGroups({
  teacherId,
  active = true,
}: {
  teacherId: number;
  active?: boolean;
}) {
  const query = qs.stringify(
    {
      filters: {
        teacher: {
          id: {
            $eq: teacherId,
          },
        },
        isActive: {
          $eq: active,
        },
      },
      populate: {
        students: {
          fields: ['id'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/groups?${query}`;
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['groups'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the groups.');
  }

  return res.json();
}

export async function createGroup(data: {
  description: string;
  searchTitle: string;
  teacher: number;
  patients: number[];
}) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/groups`;
  const res = await fetch(endpoint, {
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

export async function toggleGroup({
  id,
  active = false,
}: {
  id: number;
  active?: boolean;
}) {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/groups/${id}`;

  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    method: 'put',
    body: JSON.stringify({
      data: { isActive: active },
    }),
  });

  if (!res.ok) {
    console.error(res.status);
    throw new Error('Could not update group.');
  }

  return res.json();
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
  console.log({ groupId, userId, patientsIds });
  await connectStudentToGroup();
  await connectUserProgress();

  async function connectStudentToGroup() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
      },
      method: 'PUT',
      next: {
        tags: ['groups'],
      },
      body: JSON.stringify({
        data: {
          students: {
            connect: [userId],
          },
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

export async function getGroupData({ slug }: { slug: string }) {
  const query = qs.stringify(
    {
      populate: {
        teacher: {
          fields: ['*'],
        },
        students: {
          fields: ['*'],
        },
        patients: {
          fields: ['*'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/slugify/slugs/group/${slug}?${query}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['groups'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the group data.');
  }

  return res.json();
}

export async function getUserProgress({
  studentId,
  patientId,
}: {
  studentId: number;
  patientId: number;
}) {
  const query = qs.stringify(
    {
      filters: {
        student: {
          id: {
            $eq: studentId,
          },
        },
        patient: {
          id: {
            $eq: patientId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-progresses?${query}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['groups'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the user progress.');
  }

  return (await res.json()) as Promise<UserProgress>;
}

export async function getStudentStatus({
  studentId,
  patientsIds,
}: {
  studentId: number;
  patientsIds: number[];
}) {
  const query = qs.stringify(
    {
      filters: {
        student: {
          id: {
            $eq: studentId,
          },
        },
        patient: {
          id: {
            $in: patientsIds,
          },
        },
      },
      populate: {
        patient: {
          fields: ['title'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-progresses?${query}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    next: {
      tags: ['groups'],
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the student status.');
  }

  return (await res.json()) as Promise<UserProgress>;
}

export async function endProgram({
  patientId,
  studentId,
}: {
  patientId: number;
  studentId: number;
}) {
  const { data } = await getUserProgress({
    patientId,
    studentId,
  });

  console.log(data);

  if (!data) {
    throw new Error('Could not find user progress.');
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-progresses/${data[0].id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    body: JSON.stringify({
      data: {
        finished: true,
      },
    }),
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while ending the program.');
  }

  return res.json();
}
