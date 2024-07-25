import Navbar from '@/components/Navbar';
import './globals.css';

import { NextAuthProvider } from '@/contexts/SessionProvider';
import { i18n } from '@/i18n-config';
import { useAuth } from '@/lib/auth';
import MicrosoftClarity from '@/scripts/clarity';
import { Nunito_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = await useAuth();

  return (
    <html lang={lang} className={nunito.className}>
      <body className='flex min-h-screen flex-col'>
        <NextAuthProvider session={session}>
          <Navbar lang={lang} />
          <main className='relative flex-grow'>{children}</main>
          <Toaster />
        </NextAuthProvider>
        <MicrosoftClarity />
      </body>
    </html>
  );
}
