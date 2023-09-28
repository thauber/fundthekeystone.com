import GA4 from '@/components/tracking/GA4'
import '@/styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr/_internal';
import Tracked from '@/components/tracking/TrackingContext';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Fund The Keystone - Elkader, Iowa</title>
      <meta property="og:title" content="Fund the Keystone: Elkader, Iowa" key="title" />
      <meta property="og:description" content="Help us build a bridge to the future. Fund the Keystone." key="description" />
      <meta property="og:image" content="https://fundthekeystone.com/imagges/thumb.png" key="image" />
    </Head>
    <Head>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN'
        crossOrigin="anonymous"
      />
    </Head>
    <Tracked>
      <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(res => res.json()) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Tracked>
    <GA4 />
  </>
}
