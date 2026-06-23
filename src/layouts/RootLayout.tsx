import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet';
import { type ReactNode } from 'react';
import { ScrollRestoration } from 'react-router-dom';

import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <HelmetProvider>
      <Website>
        <Helmet>
          <title>DPM Enterprise | Premium Interior Design &amp; Turnkey Solutions | Mumbai</title>
          <meta name="description" content="DPM Enterprise — ISO 9001:2015 certified interior design and furniture manufacturing company since 2007. Serving Indian Navy, Army, Railways, and Fortune 500 companies. GeM registered vendor." />
        </Helmet>
        <ScrollRestoration />
        <Header />
        {children}
        <Footer />
      </Website>
    </HelmetProvider>
  );
}
