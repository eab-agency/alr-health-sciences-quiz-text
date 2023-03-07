import '@/styles/globals.css';
import Context from '../context/context';

export default function App({ Component, pageProps }) {
    return (
        <Context>
            {Component.PageLayout ? (
                <Component.PageLayout>
                    <Component {...pageProps} />
                </Component.PageLayout>
            ) : (
                <Component {...pageProps} />
            )}
        </Context>
    );
}
