import type { AppProps } from 'next/app';
import Head from 'next/head';
import App from '../App';
import { SiteProvider } from '../cms/store';
import '../index.css';
import '../admin/admin.css';
export default function Website({ Component, pageProps }: AppProps) {
  return <SiteProvider initialSite={pageProps.initialSite}><Head>
    <title>Blue Wave Lodge | Rooms &amp; Apartments • Imi Ouaddar, Morocco</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Rooms and apartments in Imi Ouaddar, Morocco. Stay by the ocean and add optional experiences." />
    <meta property="og:title" content="Blue Wave Lodge | Rooms & Apartments • Imi Ouaddar, Morocco" />
    <meta property="og:description" content="Rooms and apartments in Imi Ouaddar, Morocco. Stay by the ocean and add optional experiences." />
    <meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" />
  </Head><App><Component {...pageProps} /></App></SiteProvider>;
}
