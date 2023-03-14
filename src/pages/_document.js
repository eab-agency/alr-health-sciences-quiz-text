/* eslint-disable react/no-danger */
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    id="gtag-base"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-NPT5DSH');
          `,
                    }}
                />
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-3LRM3JKDWQ"
                />
                <Script
                    id="GA-config-code"
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || []; function gtag()
                {dataLayer.push(arguments)}
                gtag('js', new Date()); gtag('config', 'G-3LRM3JKDWQ');
                `,
                    }}
                />
            </Head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NPT5DSH" height="0" width="0" style="display: none; visibility: hidden;" />`,
                    }}
                />
                <Main />
                <NextScript />
            </body>
            import Script from 'next/script';
        </Html>
    );
}
