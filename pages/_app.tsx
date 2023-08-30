import GA4 from '@/components/tracking/GA4'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Fund The Keystone - Elkader, Iowa</title>
      <meta property="og:title" content="Fund the Keystone: Elkader, Iowa" key="title" />
      <meta property="og:description" content="Help us build a bridge to the future. Fund the Keystone." key="description" />
      <meta property="og:image" content="https://fundthekeystone.com/images/thumb.png" key="image" />
    </Head>
    <Component {...pageProps} />
    <GA4 />
  </>
}
