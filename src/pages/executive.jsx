/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMatchedSchool } from '@/components/helpers/getMatchedSchool';

import PageLayout from '@/components/PageLayout';
import Tabs from '@/components/Tabs';
import Stats from '@/components/Stats';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import StateSelect from '@/components/helpers/StateSelect';
// import Form from '@/components/Form';
import { useRequest } from '@/hooks/useRequest';
import { BiLinkExternal } from 'react-icons/bi';

import styles from '@/styles/global/layouts/FinalPage.module.scss';
import Accordion from '@/components/Accordion';

const ExecutivePage = () => {
    const { data: results, error: resultsError } = useRequest('/quiz/results');
    const { data: schools, error: schoolsError } = useRequest('/quiz/schools');

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
                <section className={styles['career-path']}>
                    <div className={styles['path-intro']}>
                        <h2>
                            What's a common health care career path for The
                            Executive?
                        </h2>
                        <p>
                            Occupations that align with The Executive's career
                            path tend to establish plans and policies, direct
                            business activities, and oversee people, products,
                            and services.
                        </p>
                    </div>
                    <div className={styles['executive-path']}>
                        <ul>
                            <li>
                                <strong>
                                    Administrative services and facilities
                                    managers:
                                </strong>{' '}
                                Plan, direct, and coordinate activities that
                                help a health care facility run efficiently
                            </li>
                            <li>
                                <strong>Executives or administrators:</strong>{' '}
                                Plan strategies and policies to help
                                organizations such as hospital systems reach
                                their goals.
                            </li>
                            <li>
                                <strong>Human resources manager:</strong> Plan,
                                coordinate, and direct the employee-focused
                                functions of organizations such as hospitals or
                                clinics
                            </li>
                            <li>
                                <strong>Purchasing managers or agents:</strong>{' '}
                                Buy products and services such as medical
                                supplies and equipment for hospitals or clinics
                            </li>
                        </ul>
                        <figure>
                            <Image
                                src="/images/executive.jpg"
                                width={478}
                                height={284}
                                alt="Executive woman smiling in front of a laptop"
                            />
                            <figcaption>Healthcare administrator</figcaption>
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
                            Executive?
                        </h2>
                        <p>
                            For many roles in The Executive’s career path, a
                            bachelor’s degree is a minimum qualification.
                            Master’s degrees are common and often preferred,
                            especially for more senior management roles.
                        </p>
                    </div>
                    <Tabs tabs={personalityData.degreeTabs} />
                </section>
                <section className={styles.certificates}>
                    {/* <div className={styles.accordionHead}> */}
                    <Accordion
                        title="Does The Executive need a license, certification, or
                        registration?"
                    >
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
                                The need for a license or certification depends
                                on the role.
                            </p>
                            <p>
                                All states require licensure for{' '}
                                <strong>nursing home administrators.</strong>{' '}
                                The process often involves a state-approved
                                training program and national licensing exam,
                                and varies by state.
                            </p>
                            <p>
                                A license is{' '}
                                <strong>not typically required</strong> in other
                                areas of medical and health services management,
                                although some positions do require a registered
                                nurse or social worker license.
                            </p>
                            <p>
                                While not required,{' '}
                                <strong>
                                    certification can help your resume stand out
                                </strong>{' '}
                                among your peers. You could become certified in
                                many of areas of practice, such as medical
                                management or health information management.
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

ExecutivePage.PageLayout = PageLayout;
export default ExecutivePage;
