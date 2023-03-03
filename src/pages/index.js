import Head from 'next/head';
import Quiz from '@/components/Quiz';

export default function Home() {
    return (
        <>
            <Head>
                <html
                    lang="en"
                    xmlLang="en"
                    xmlns="http://www.w3.org/1999/xhtml"
                />
                <meta charset="UTF-8" />
                <meta name="google" content="notranslate" />
                <meta httpEquiv="Content-Language" content="en" />
                <title>Health Science Quiz</title>
                <meta name="description" content="Cappex Health Science Quiz" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Quiz />
            </main>
        </>
    );
}
