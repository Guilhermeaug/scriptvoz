import { i18n } from '@/i18n-config';
import './globals.css';

import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
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
    <html lang={params.lang} className={inter.className}>
      <body className='container mx-auto p-7'>{children}</body>
    </html>
  );
}
