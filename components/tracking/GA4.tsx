import Script from "next/script"
import React from "react"

const GA4 = () => {
  const GA4_TAG = process.env.NEXT_PUBLIC_GA4_TAG
  if (!GA4_TAG) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TAG}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_TAG}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

export default GA4
