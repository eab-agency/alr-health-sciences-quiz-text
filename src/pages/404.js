import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import styles from '@/styles/global/layouts/Error.module.scss';

/* eslint-disable no-nested-ternary */
function FourOhFour({ statusCode }) {
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        setIsLightMode(mediaQuery.matches);

        const handleMediaQueryChange = (e) => setIsLightMode(e.matches);
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () =>
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, []);

    const errorImg =
        statusCode === 404
            ? isLightMode
                ? '/images/404-street-light.svg'
                : '/images/404-street-dark.svg'
            : isLightMode
            ? '/images/error-street-light.svg'
            : '/images/error-street-dark.svg';

    return (
        <>
            <PageHeader />
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <figure>
                        <Image
                            src={errorImg}
                            alt="404"
                            width={300}
                            height={300}
                        />
                    </figure>
                    <div className={styles.content}>
                        <div className={styles.intro}>
                            <h1>
                                Oops! The page you're looking for isn't here.
                            </h1>
                        </div>
                        <p>
                            It looks like the page you were trying to reach does
                            not exist. Do not worry, you can visit{' '}
                            <a
                                href="https://cappexhealth.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                cappexhealth.com
                            </a>{' '}
                            to start over and explore all the great resources we
                            offer for students interested in health care.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FourOhFour;
