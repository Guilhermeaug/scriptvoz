import { getUserProgress } from "./data";

export async function endProgram({
  patientId,
  studentId,
}: {
  patientId: number;
  studentId: number;
}) {
  const { data } = await getUserProgress({
    patientId: patientId,
    studentId: studentId,
  });

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
