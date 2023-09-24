import './globals.css';

import { i18n } from '@/i18n-config';
import { EB_Garamond } from 'next/font/google';
import { NextAuthProvider } from '@/contexts/SessionProvider';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const inter = EB_Garamond({
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
  children: ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
