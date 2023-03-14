import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import PageFooter from '@/components/PageFooter';
import styles from '@/styles/global/layouts/EmailOnly.module.scss';
import Button from '@/components/Button';
// eslint-disable-next-line import/no-unresolved
import MainLogo from '@/components/MainLogo';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function LandingPage() {
    const { user } = useUser();
    const router = useRouter();
    // grab utm_source from query params
    const utmSource = router.query.utm_source;

    const [localQData, setLocalQData] = useLocalStorage('eab-quiz-data', {
        answers: [],
        currentQuestion: 0,
        score: {
            executive: 0,
            practitioner: 0,
            educator: 0,
            scientist: 0,
            analyst: 0,
            initial: 0,
        },
        highestScorePersonality: null,
        utmSource: '',
    });

    useEffect(() => {
        if (utmSource) {
            setLocalQData({ ...localQData, utmSource });
        }
    }, [utmSource]);

    return (
        <>
            <Head>
                <title>
                    Define Your Future in Health Care | Health Science Quiz
                </title>
                <meta name="description" content="Cappex Health Science Quiz" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className="short landing">
                <div className="content-wrapper">
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <header>
                                <MainLogo />
                                {user && user.fname ? (
                                    <h1>
                                        {/* if user.fname this display some text */}
                                        {`${user.fname}, `} Define Your Future
                                        in Health Care
                                    </h1>
                                ) : (
                                    <h1>Define Your Future in Health Care</h1>
                                )}
                            </header>
                            <p>
                                If you’re considering a career change, a role in
                                health care could be a great fit. The Bureau of
                                Labor Statistics predicts about{' '}
                                <strong>
                                    2 million jobs in health care will be
                                    created each year over the next decade
                                </strong>
                                —and many colleges and universities offer
                                flexible, affordable degrees or certificates
                                that can help you get a head start in
                                transferring your skills to a new or more
                                advanced role.
                            </p>

                            <p>
                                In less than three minutes, you could{' '}
                                <strong>
                                    discover which role could be a good fit for
                                    you
                                </strong>
                                —and the steps you can take to advance your
                                career.
                            </p>
                            <Button
                                label="Get Started"
                                type="primary"
                                href="quiz"
                            />
                        </div>
                        <figure className={styles['deco-image']}>
                            <Image
                                src="/images/cappex-define-your-future-img.jpg"
                                alt="Define Your Future in Health Care"
                                // fill
                                width={500}
                                height={600}
                            />
                        </figure>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    );
}
