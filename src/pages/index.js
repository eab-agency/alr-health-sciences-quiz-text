import Head from 'next/head';
import QuizLayout from '@/components/QuizLayout';
import Quiz from '@/components/Quiz';

function Home() {
    return (
        <>
            <Head>
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

Home.PageLayout = QuizLayout;

export default Home;
