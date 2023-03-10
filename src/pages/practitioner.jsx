/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Tabs from '@/components/Tabs';
import PageLayout from '@/components/PageLayout';
import { useUser } from '@/context/context';
import UniversityMatch from '@/components/UniversityMatch';
import { useRequest } from '@/hooks/useRequest';

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{personalityData.title}</h1>
            <p>{personalityData.detailedDestription}</p>
            <Tabs tabs={personalityData.tabs} />
            {matchedSchool && <UniversityMatch school={matchedSchool} />}
        </div>
    );
};

PractitionerPage.PageLayout = PageLayout;

export default PractitionerPage;
