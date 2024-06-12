import Navbar from '@/components/Navbar';
import './globals.css';

import { NextAuthProvider } from '@/contexts/SessionProvider';
import { i18n } from '@/i18n-config';
import { Nunito_Sans } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Simulador de casos clínicos',
  description: 'Simulador de casos clínicos em fonoaudiologia',
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} className={nunito.className}>
      <head>
        <Script id="clarity-script" strategy="beforeInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mqslegzqke");
          `}
        </Script>
      </head>
      <body className='flex min-h-screen flex-col'>
        <NextAuthProvider>
          <Navbar lang={lang} />
          <main className='relative flex-grow'>{children}</main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
