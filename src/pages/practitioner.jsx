/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Tabs from '@/components/Tabs';
import PageLayout from '@/components/PageLayout';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import { useRequest } from '@/hooks/useRequest';
import styles from '@/styles/global/layouts/FinalPage.module.scss';

import { BiLinkExternal } from 'react-icons/bi';
import Stats from '@/components/Stats';
import Accordion from '@/components/Accordion';
import Image from 'next/image';
import CappexFormSection from '@/components/CappexFormSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import CarouselWithForm from '@/components/CarouselWithForm';

const PractitionerPage = () => {
    const { data: results, error: resultsError } = useRequest('/quiz/results');
    const { matchedSchools } = useUser();
    const [localQData] = useLocalStorage('eab-quiz-data');
    const router = useRouter();
    const currentRoute = router.pathname.replace('/', '');

    //    wait for quizData to be populated and then set personalityData based on results.title
    const [personalityData, setPersonalityData] = useState(null);
    useEffect(() => {
        if (results) {
            const personalityDataInternal = results.find(
                (result) => result.title.toLowerCase() === currentRoute
            );
            setPersonalityData(personalityDataInternal);
        }
    }, [results, currentRoute]);

    // if no personalityData is found, return loading
    if (!personalityData) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className="intro-title">
                    Your ideal role could be ...
                </span>
                <section className={styles['intro-section']}>
                    <h1>{personalityData.title}</h1>
                    <p>{personalityData.detailedDescription}</p>
                </section>
                <Tabs className="react-tabs" tabs={personalityData.tabs} />
                {!localQData && <CappexFormSection />}
                <section className={styles['career-path']}>
                    <div className={styles['path-intro']}>
                        <h2>
                            What's a common health care career path for The
                            Practitioner?
                        </h2>
                        <p>
                            Occupations that align with The Practitioner’s
                            career path tend to examine, diagnose, treat, or
                            advise patients. There are a wide range of patient
                            care jobs available depending on your interests and
                            goals. Popular and high-need careers include:
                        </p>
                    </div>
                    <div className={styles['executive-path']}>
                        <ul>
                            <li>
                                <strong>Nursing:</strong> Nurses are an
                                essential role in any health care setting, and
                                there are many career advancement opportunities.
                                Most nurses start as an LVN/LPN and move into an
                                RN role. After that, an ARPN role allows nurses
                                to specialize in areas such as nurse
                                anesthetist, midwife, or nurse practitioner, or
                                other advanced career.
                            </li>
                            <li>
                                <strong>Dentistry:</strong> Dental hygienists
                                often only require an associate’s degree to
                                enter the field, and have a natural path to
                                becoming dentists.
                            </li>
                            <li>
                                <strong>Pharmacy:</strong> While a pharmacy
                                degree is required to become a licensed
                                pharmacist, pharmacy technicians help
                                pharmacists dispense medication and are on a
                                natural path to their advanced degree.
                            </li>
                        </ul>
                        <figure>
                            <Image
                                src="/images/nurse.jpg"
                                width={478}
                                height={284}
                                alt="Nurse reading a board"
                            />
                            <figcaption>Nurse</figcaption>
                        </figure>
                    </div>
                    <div className={styles['executive-path']}>
                        <figure>
                            <Image
                                src="/images/athletic-trainer-occupational-therapist.jpg"
                                width={478}
                                height={284}
                                alt="Occupational therapist in session"
                            />
                            <figcaption>
                                Athletic trainer or occupational therapist
                            </figcaption>
                        </figure>
                        <ul>
                            <li>
                                <strong>Therapy:</strong> There are a range of
                                careers such as respiratory and occupational
                                therapy that don’t require a doctoral degree.
                                These can be a good entry point to the medical
                                field.
                            </li>
                            <li>
                                <strong>Medicine:</strong> While there are
                                common professional degrees in medicine such as
                                the MD and DO, there are careers that require
                                less schooling that still involve patient care,
                                such as a Physician’s Assistant.
                            </li>
                            <li>
                                <strong>
                                    Nutrition and Athletic Training:
                                </strong>{' '}
                                Preventive wellness is an important part of
                                health care, and these careers often only
                                require a bachelor’s or master’s degree.
                            </li>
                        </ul>
                    </div>
                </section>
                <Stats
                    stats={personalityData.stats}
                    source={personalityData.statsSource}
                />
                <section className={styles['best-degrees']}>
                    <div className={styles['degrees-intro']}>
                        <h2>
                            What are the best health care degrees for The
                            Practitioner?
                        </h2>
                        <p>
                            For many roles in The Practitioner’s career path, a
                            bachelor’s degree is a minimum qualification.
                            Master’s degrees are common and often preferred,
                            especially for more senior management roles.
                        </p>
                    </div>
                    <Tabs
                        tabs={personalityData.degreeTabs}
                        className="degree-tabs"
                    />
                </section>
                <section className={styles.certificates}>
                    {/* <div className={styles.accordionHead}> */}
                    <Accordion title="Does The Practitioner need a license, certification, or registration?">
                        <figure>
                            <Image
                                src="/images/certificate-image.svg"
                                width={478}
                                height={284}
                                alt="Medical records"
                            />
                        </figure>
                        <div>
                            <p>
                                Most jobs involving patient care require
                                licensure. Nurses, occupational therapists,
                                physicians and physician’s assistants,
                                chiropractors, dentists, and pharmacists are
                                required by all states to have licenses.
                            </p>
                            <p>
                                Sometimes this requires a national licensure
                                exam or a state-specific test. It may also
                                require a certain number of practicing hours as
                                an intern or resident. The good news is that
                                most degree programs are designed to prepare
                                students to sit for these tests.
                            </p>
                        </div>
                    </Accordion>
                </section>
                <section className={styles['keep-exploring']}>
                    <div className={styles.sourceContent}>
                        <h2>Keep exploring</h2>
                        <p>
                            Much of the career, education, and salary
                            information above was sourced from the Bureau of
                            Labor Statistics. You can find state-specific job
                            outlooks and salary details as well as even more
                            information on related careers on their website.
                        </p>
                        <a
                            href="https://www.bls.gov/ooh/healthcare/home.htm"
                            target="_blank"
                            rel="noreferrer"
                            className="button btn-secondary"
                        >
                            Bureau of Labor Statistics{' '}
                            <i>
                                <BiLinkExternal />
                            </i>
                        </a>
                    </div>
                </section>
                <CarouselWithForm />
            </div>
        </div>
    );
};

PractitionerPage.PageLayout = PageLayout;

export default PractitionerPage;
