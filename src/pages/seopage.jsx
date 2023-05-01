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
                                        <p>
                                            If you want to work in the medical
                                            field but you don’t know which job
                                            fits your skills and interests, this
                                            free quiz can help find a good fit
                                            and you plan your next steps.
                                        </p>

                                        <p>
                                            The Bureau of Labor Statistics
                                            predicts about{' '}
                                            <strong>
                                                2 million jobs in health care
                                                will be created each year over
                                                the next decade.
                                            </strong>{' '}
                                            Many colleges and universities offer
                                            flexible, affordable degrees or
                                            certificates that can help you get a
                                            head start in transferring your
                                            skills to a new or more advanced
                                            role.
                                        </p>

                                        <p>
                                            In less than three minutes, you
                                            could{' '}
                                            <strong>
                                                discover which type of health
                                                care career could be a good fit
                                                for you.
                                            </strong>{' '}
                                            We’ll also connect you with schools
                                            near you that
                                        </p>

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
                                        <h2>Want More from Cappex?</h2>
                                        <p>
                                            Let us know the best way to contact
                                            you with helpful information and
                                            potential college or university
                                            matches.
                                        </p>
                                    </div>
                                </section>
                                <section className={styles.takeQuiz}>
                                    <h2>Ready to Find Your Role?</h2>
                                    <p>
                                        In less than three minutes, you could
                                        discover which role could be a good fit
                                        for you — and the steps you can take to
                                        advance your career.
                                    </p>
                                    <Button
                                        type="primary"
                                        label={data.quizSection.buttonText}
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
