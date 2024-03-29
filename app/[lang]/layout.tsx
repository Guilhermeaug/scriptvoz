import Navbar from '@/components/Navbar';
import './globals.css';

import Provider from '@/contexts/Provider';
import { NextAuthProvider } from '@/contexts/SessionProvider';
import { i18n } from '@/i18n-config';
import { Nunito_Sans } from 'next/font/google';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const garamond = Nunito_Sans({
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
    <html lang={params.lang} className={garamond.className}>
      <body>
        <NextAuthProvider>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
