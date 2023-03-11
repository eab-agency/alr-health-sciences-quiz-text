/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Tabs from '@/components/Tabs';
import PageLayout from '@/components/PageLayout';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import { useRequest } from '@/hooks/useRequest';
import styles from '@/styles/global/layouts/FinalPage.module.scss';

const PractitionerPage = () => {
    const { data: results, error: resultsError } = useRequest('/quiz/results');
    const { matchedSchool } = useUser();

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
                {matchedSchool && (
                    <section className={styles.school}>
                        <UniversityMatch school={matchedSchool} />
                    </section>
                )}
            </div>
        </div>
    );
};

PractitionerPage.PageLayout = PageLayout;

export default PractitionerPage;
