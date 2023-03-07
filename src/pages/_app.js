import '@/styles/globals.css';
import { ContextProvider } from '../context/context';

export default function App({ Component, pageProps }) {
    return (
        <ContextProvider>
            {Component.PageLayout ? (
                <Component.PageLayout>
                    <Component {...pageProps} />
                </Component.PageLayout>
            ) : (
                <Component {...pageProps} />
            )}
        </ContextProvider>
    );
}
