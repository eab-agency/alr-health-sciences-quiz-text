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

import styles from '@/styles/global/layouts/FinalPage.module.scss';

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
                <Tabs tabs={personalityData.tabs} className="personalityTabs" />
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
                                Administrative services and facilities managers:
                                Plan, direct, and coordinate activities that
                                help a health care facility run efficiently
                            </li>
                            <li>
                                Executives or administrators: Plan strategies
                                and policies to help organizations such as
                                hospital systems reach their goals.
                            </li>
                            <li>
                                Human resources manager: Plan, coordinate, and
                                direct the employee-focused functions of
                                organizations such as hospitals or clinics
                            </li>
                            <li>
                                Purchasing managers or agents: Buy products and
                                services such as medical supplies and equipment
                                for hospitals or clinics
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
                    <Tabs
                        tabs={personalityData.degreeTabs}
                        className="degreeTabs"
                    />
                </section>
                <section className={styles.certificates}>
                    <Image
                        src="https://via.placeholder.com/342x252"
                        width={342}
                        height={252}
                        alt="placeholder"
                    />
                    <h3>
                        Does The Executive need a license, certification, or
                        registration?
                    </h3>

                    <p>
                        The need for a license or certification depends on the
                        role.
                    </p>
                    <p>
                        All states require licensure for nursing home
                        administrators. The process often involves a
                        state-approved training program and national licensing
                        exam, and varies by state.
                    </p>
                    <p>
                        A license is not typically required in other areas of
                        medical and health services management, although some
                        positions do require a registered nurse or social worker
                        license.
                    </p>
                    <p>
                        While not required, certification can help your resume
                        stand out among your peers. You could become certified
                        in many of areas of practice, such as medical management
                        or health information management.
                    </p>
                </section>
                <section className="keep-exploring">
                    <h2>Keep exploring</h2>
                    <p>
                        Much of the career, education, and salary information
                        above was sourced from the Bureau of Labor Statistics.
                        You can find state-specific job outlooks and salary
                        details as well as even more information on related
                        careers on their website.
                    </p>
                    <a
                        href="https://www.bls.gov/ooh/healthcare/home.htm"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Bureau of Labor Statistics
                    </a>
                </section>
                {matchedSchool && (
                    <>
                        <div>
                            {/* select input that has all the states */}
                            <StateSelect onSelect={handleStateChange} />
                        </div>
                        <UniversityMatch school={matchedSchool} />
                    </>
                )}
            </div>
        </div>
    );
};

ExecutivePage.PageLayout = PageLayout;
export default ExecutivePage;
