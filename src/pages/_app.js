import { SWRConfig } from 'swr';
import '@/styles/style.scss';
import { ContextProvider } from '../context/context';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
    return (
        <SWRConfig value={{ fetcher }}>
            <ContextProvider>
                {Component.PageLayout ? (
                    <Component.PageLayout>
                        <Component {...pageProps} />
                    </Component.PageLayout>
                ) : (
                    <Component {...pageProps} />
                )}
            </ContextProvider>
        </SWRConfig>
    );
}
