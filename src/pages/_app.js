import { SWRConfig } from 'swr';
import '@/styles/style.scss';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { GTM_ID, pageview } from '@/lib/gtm';
import { useEffect } from 'react';
import { ModalContainer } from 'reoverlay';
import { Analytics } from '@vercel/analytics/react';
import { CookiesProvider } from 'react-cookie';
import { ContextProvider } from '../context/context';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeComplete', pageview);
        return () => {
            router.events.off('routeChangeComplete', pageview);
        };
    }, [router.events]);

    return (
        <>
            {/* Google Tag Manager - Global base code */}
            <Script
                id="gtag-base"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
                }}
            />
            <Script
					src="https://cdn.cookielaw.org/consent/f621c13f-1c94-43c9-8362-0f5d72c69f26/OtAutoBlock.js"
					strategy="beforeInteractive"
				/>
				<Script
					src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
					data-domain-script="f621c13f-1c94-43c9-8362-0f5d72c69f26"
				/>
				<Script
					id="otStubData"
					dangerouslySetInnerHTML={{
						__html: "function OptanonWrapper() {}",
					}}
				/>

            <SWRConfig value={{ fetcher }}>
                <CookiesProvider>
                    <ContextProvider>
                        {Component.PageLayout ? (
                            <Component.PageLayout>
                                <Component {...pageProps} />
                            </Component.PageLayout>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </ContextProvider>
                </CookiesProvider>
            </SWRConfig>
            <Analytics />
            <ModalContainer />
        </>
    );
}
