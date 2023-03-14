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
import CappexFormSection from '@/components/CappexFormSection';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ScientistPage = () => {
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
                            What’s a common health care career path for The
                            Scientist?
                        </h2>
                        <p>
                            Occupations that align with The Scientist’s career
                            path conduct research aimed at improving overall
                            human health. They often use clinical trials and
                            other investigative methods to research their
                            findings.
                        </p>
                    </div>
                    <div className={styles['executive-path']}>
                        <ul>
                            <li>
                                <strong>Medical laboratory scientists</strong>{' '}
                                perform complex tests on patient samples to find
                                data that plays an important role in identifying
                                and treating cancerimport heart disease,
                                diabetes, and other medical conditions.
                            </li>
                            <li>
                                <strong>Clinical pharmacologist</strong>{' '}
                                research new drug therapies for health problems
                                such as seizure disorders and Alzheimer’s
                                disease.
                            </li>
                            <li>
                                <strong>Medical pathologists</strong> research
                                the human body and tissues, such as how cancer
                                progresses or how certain issues relate to
                                genetics.
                            </li>
                            <li>
                                <strong>Toxicologists</strong> study the
                                negative impacts of chemicals and pollutants on
                                human health
                            </li>
                        </ul>
                        <figure>
                            <Image
                                src="/images/scientist.jpg"
                                width={478}
                                height={284}
                                alt="Scientist looking at microscope"
                            />
                            <figcaption>
                                Medical professional in a lab
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
                            Scientist?
                        </h2>
                        <p>
                            For many roles in The Scientist’s career path, a
                            Ph.D. (often in biology or life sciences) or a
                            medical degree is required. Some positions will also
                            accept a master’s degree if the candidate also has
                            experience.
                        </p>
                    </div>
                    <Tabs
                        tabs={personalityData.degreeTabs}
                        className="degreeTabs"
                    />
                </section>
                <section className={styles.certificates}>
                    <Accordion title="Does The Scientist need a license, certification, or registration?">
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
                                Medical scientists mostly conduct research and
                                don’t usually need licenses or certifications.
                                However, those who practice medicine, such as by
                                treating patients in clinical trials or in
                                private practice, must be licensed as physicians
                                or other healthcare practitioners.
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
            {!localQData && <CappexFormSection />}
        </div>
    );
};

ScientistPage.PageLayout = PageLayout;
export default ScientistPage;
