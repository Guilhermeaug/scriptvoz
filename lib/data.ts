import qs from 'qs';
import { Group, Groups, UserProgress, UserProgressData } from '@/types/group_types';
import { PatientData } from '@/types/patients_types';

export async function getPatients({ locale }: { locale: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/patients?locale=${locale}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('Could not fetch patients data.');
  }

  return res.json() as Promise<PatientData>;
}

export async function getPatientStep({
  query,
  locale,
  path,
}: {
  query: string;
  locale: string;
  path: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/patients/${query}/${path}?locale=${locale}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('Could not fetch patient data.');
  }

  return res.json();
}

export async function getPageData({
  path,
  locale,
}: {
  path: string;
  locale: string;
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${path}?locale=${locale}&populate=deep`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the page data.');
  }

  return res.json();
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
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the group data.');
  }

  return res.json() as Promise<Group>;
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
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the user progress.');
  }

  return res.json() as Promise<UserProgress>;
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
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the student status.');
  }

  return res.json() as Promise<UserProgress>;
}

export async function verifyIfHasPatient({
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
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the student status.');
  }

  const json: UserProgress = await res.json();
  return json.data.length > 0;
}

export async function getGroups({ teacherId }: { teacherId: number }) {
  const query = qs.stringify(
    {
      filters: {
        teacher: {
          id: {
            $eq: teacherId,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/groups?${query}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error('An error occurred while fetching the groups.');
  }

  return res.json() as Promise<Groups>;
}
