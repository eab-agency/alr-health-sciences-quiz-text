/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMatchedSchool } from '@/helpers/getMatchedSchool';

import PageLayout from '@/components/PageLayout';
import Tabs from '@/components/Tabs';
import Stats from '@/components/Stats';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import { useRequest } from '@/hooks/useRequest';
import { BiLinkExternal } from 'react-icons/bi';

import styles from '@/styles/global/layouts/FinalPage.module.scss';
import Accordion from '@/components/Accordion';
import CappexFormSection from '@/components/CappexFormSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const AnalystPage = () => {
    const { data: results, error: resultsError } = useRequest('/quiz/results');
    const { data: schools, error: schoolsError } = useRequest('/quiz/schools');
    const [localQData] = useLocalStorage('eab-quiz-data');

    const { matchedSchool, setMatchedSchool } = useUser();

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

    const handleStateChange = (value) => {
        const matchedSchoolInternal = getMatchedSchool(value, schools);
        setMatchedSchool(matchedSchoolInternal);
    };

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
                <Tabs tabs={personalityData.tabs} />
                {!localQData && <CappexFormSection />}
                <section className={styles['career-path']}>
                    <div className={styles['path-intro']}>
                        <h2>
                            What’s a common health care career path for The
                            Analyst?
                        </h2>
                        <p>
                            Occupations that align with The Analyst’s career
                            path advise organizations on computerized healthcare
                            systems and analyze clinical data.
                        </p>
                    </div>
                    <div className={styles['executive-path']}>
                        <ul>
                            <li>
                                <strong>
                                    Health information technologists
                                </strong>{' '}
                                apply their knowledge of information technology
                                and health care in a variety of ways. Some
                                specialize in the electronic health records
                                systems used for storing and retrieving patient
                                data while others analyze healthcare data for
                                research or evaluation of products and services.
                            </li>
                            <li>
                                <strong>Medical registrars</strong> create and
                                maintain databases of information, such as those
                                used to track a particular disease or condition.
                                They may collect and analyze information for
                                facility, regional, and national databases;
                                review patients’ records and pathology reports
                                to verify completeness and accuracy; assign
                                classification codes to represent the diagnosis
                                and treatment; then track treatment, survival,
                                and recovery.
                            </li>
                            <li>
                                <strong>Bioinformatics specialists</strong>{' '}
                                combine knowledge of computer programming, big
                                data, and biology for careers that range from
                                pharmaceutical and biotechnology development to
                                biological and environmental analysis.
                            </li>
                        </ul>
                        <figure>
                            <Image
                                src="/images/analyst.jpg"
                                width={478}
                                height={284}
                                alt="Medical professional with computer"
                            />
                            <figcaption>
                                Medical professional with computer
                            </figcaption>
                        </figure>
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
                            Analyst?
                        </h2>
                        <p>
                            The degree necessary for careers in The Analyst’s
                            path varies depending on responsibilities. An
                            associate’s degree is a minimum requirement, with
                            many roles preferring a bachelor’s or master’s
                            degree.
                        </p>
                    </div>
                    <Tabs
                        tabs={personalityData.degreeTabs}
                        className="degreeTabs"
                    />
                </section>
                <section className={styles.certificates}>
                    <Accordion title="Does The Analyst need a license, certification, or registration?">
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
                                Employers may prefer to hire health information
                                technologists and medical registrars who have
                                certification, or they may expect applicants to
                                earn certification after being hired.
                            </p>
                            <p>
                                Credentials for a variety of specializations are
                                available from professional organizations,
                                including the Registered Health Information
                                Technician (RHIT), the Certified Documentation
                                Improvement Practitioner (CDIP), and the
                                Certified Health Data Analyst (CHDA).
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
                {matchedSchool && (
                    <section className={styles['matched-school']}>
                        <UniversityMatch school={matchedSchool} />
                    </section>
                )}
            </div>
        </div>
    );
};

AnalystPage.PageLayout = PageLayout;
export default AnalystPage;
