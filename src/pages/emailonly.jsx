import React from 'react';
import Head from 'next/head';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import styles from '@/styles/global/layouts/EmailOnly.module.scss';
import Button from '@/components/Button';

export default function emailonly() {
    return (
        <>
            <Head>
                <title>Email Only | Health Science Quiz</title>
                <meta name="description" content="Cappex Health Science Quiz" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            {/* <PageHeader /> */}
            <main className={styles.short}>
                <div className="content-wrapper">
                    <div className={styles.container}>
                        <div className={styles['intro-copy']}>
                            <header>
                                <Image
                                    src="/images/cappex-logo.svg"
                                    alt="Cappex"
                                    width={200}
                                    height={50}
                                />
                                <h1>Define Your Future in Health Care</h1>
                            </header>
                            <p>
                                If you’re considering a career change, a role in
                                health care could be a great fit. The Bureau of
                                Labor Statistics predicts about{' '}
                                <strong>
                                    2 million jobs in health care will be
                                    created each year over the next decade
                                </strong>{' '}
                                — and many colleges and universities offer
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
                            <Button label="Get Started" type="primary" />
                        </div>
                        <figure className={styles['deco-image']}>
                            <Image
                                src="/images/cappex-define-your-future-img.png"
                                alt="Define Your Future in Health Care"
                                fill
                            />
                        </figure>
                    </div>
                </div>
            </main>
            <PageFooter />
        </>
    );
}
