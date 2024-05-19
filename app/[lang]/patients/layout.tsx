import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/util/navigateTo';
import { redirect } from 'next/navigation';

export default async function Layout({
  params: { lang },
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = await useAuth();

  if (!session) {
    redirect(navigateTo(lang, '/'));
  }

  return <>{children}</>;
}
