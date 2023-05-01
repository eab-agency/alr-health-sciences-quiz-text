/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// import SeoPageLayout from '@/components/SeoPageLayout';
// import Tabs from '@/components/Tabs';
import Stats from '@/components/Stats';
import Link from 'next/link';

import styles from '@/styles/global/layouts/SeoPage.module.scss';
import Button from '@/components/Button';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import data from '../data/seopage.json';

/* eslint-disable react/no-danger */
const SeoPage = () => {
    const router = useRouter();
    const currentRoute = router.pathname.replace('/', '');

    const reasonsArray = data.whyChoose[1].reasons;
    const reasonsList = reasonsArray.map((reason) => (
        <li>
            <h3>{reason.title}</h3>
            <p
                dangerouslySetInnerHTML={{
                    __html: reason.description,
                }}
            />
        </li>
    ));

    const rightCareerArray = data.rightCareer[0].reasons;
    const rightCareerList = rightCareerArray.map((reason) => (
        <li>
            <p
                dangerouslySetInnerHTML={{
                    __html: reason.description,
                }}
            />
        </li>
    ));

    return (
        <>
            <div className="page-layout">
                <PageHeader pageType="seoPage" />
                <main className="page-layout__container">
                    <div className="page-layout__content">
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <section className={styles.pageHero}>
                                    <h1
                                        dangerouslySetInnerHTML={{
                                            __html: data.pageTitle,
                                        }}
                                    />
                                    <figure>
                                        <Image
                                            src="/images/which-health-care-career.jpg"
                                            width={800}
                                            height={480}
                                            alt="Health care professional in a laboratory"
                                        />
                                    </figure>
                                </section>
                                <section className={styles.quizSection}>
                                    <figure>
                                        <Image
                                            src="/images/profesional-man-researching-online.jpg"
                                            width={800}
                                            height={480}
                                            alt="Profesional man researching online"
                                        />
                                    </figure>

                                    <div className={styles.intro}>
                                        <h2>{data.quizSection.title}</h2>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: data.quizSection
                                                    .content,
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            label={data.quizSection.buttonText}
                                            href="/quiz"
                                            className={styles.button}
                                        />
                                    </div>
                                </section>
                                <Stats
                                    stats={data.stats}
                                    source={data.statsSource}
                                    className={styles.stats}
                                />
                                <section className={styles.whyChoose}>
                                    <div className={styles.intro}>
                                        <h2>{data.whyChoose[0].title}</h2>
                                    </div>
                                    <div className={styles.whyChooseContent}>
                                        <ul>{reasonsList}</ul>
                                        <figure>
                                            <Image
                                                src="/images/doctor-wearing-mas-and-sthethoscope.jpg"
                                                width={478}
                                                height={284}
                                                alt="Doctor wearing mask and a sthethoscope"
                                            />
                                        </figure>
                                    </div>
                                </section>
                                <section className={styles.testimonial}>
                                    <div className={styles.quotation}>
                                        <blockquote>
                                            <p>{data.testimonial.text}</p>
                                            <div
                                                className={
                                                    styles.testimonialAuthor
                                                }
                                            >
                                                <p>{data.testimonial.author}</p>
                                                <small>
                                                    {
                                                        data.testimonial
                                                            .authorTitle
                                                    }
                                                </small>
                                            </div>
                                        </blockquote>
                                    </div>
                                </section>
                                <section className={styles.rightCareer}>
                                    <div className={styles.intro}>
                                        <h2>{data.rightCareer[0].title}</h2>
                                        <p>{data.rightCareer[0].description}</p>
                                    </div>
                                    <ul>{rightCareerList}</ul>
                                </section>
                                <section className={styles.contactForm}>
                                    <div className={styles.intro}>
                                        <h2>{data.contactForm.title}</h2>
                                        <p>{data.contactForm.description}</p>
                                    </div>
                                </section>
                                <section className={styles.takeQuiz}>
                                    <h2>{data.takeQuiz.title}</h2>
                                    <p>{data.takeQuiz.description}</p>
                                    <Button
                                        type="primary"
                                        label={data.takeQuiz.buttonText}
                                        href="/quiz"
                                        className={styles.button}
                                    />
                                </section>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <PageFooter />
        </>
    );
};
// SeoPage.PageLayout = PageLayout;
export default SeoPage;
