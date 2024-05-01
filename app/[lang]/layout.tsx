import Navbar from '@/components/Navbar';
import './globals.css';

import Footer from '@/components/Footer';
import { NextAuthProvider } from '@/contexts/SessionProvider';
import { i18n } from '@/i18n-config';
import { Nunito_Sans } from 'next/font/google';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'auto',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={nunito.className}>
      <body className='flex min-h-screen flex-col'>
        <NextAuthProvider>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer lang={params.lang} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
