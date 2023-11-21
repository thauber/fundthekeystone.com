import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect, useState } from 'react';

export default function Document() {
  const [snapClass, setSnapClass] = useState<string>("snap-y snap-proximity md:snap-mandatory snap-always")
  useEffect(() => {
    import('react-device-detect').then(({isMobile}) => {
      if (isMobile) setSnapClass("")
    });
  }, [])

  return (
    <Html lang="en" className={`${snapClass} overflow-y-scroll`}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <body className={snapClass} >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
