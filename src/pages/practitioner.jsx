import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import Tabs from '@/components/Tabs';
import PageLayout from '@/components/PageLayout';
import { QuizDataContext, UserLocationContext } from '@/context/context';

const PractitionerPage = () => {
    const { userLocation } = useContext(UserLocationContext);
    const { quizData } = useContext(QuizDataContext);

    const router = useRouter();
    const currentRoute = router.pathname.replace('/', '');
    const [matchedSchool, setMatchedSchool] = useState(null);

    //    wait for quizData to be populated and then set personalityData based on quizData.results.title
    const [personalityData, setPersonalityData] = useState(null);
    useEffect(() => {
        if (quizData) {
            const personalityDataInternal = quizData.results.find(
                (result) => result.title.toLowerCase() === currentRoute
            );
            setPersonalityData(personalityDataInternal);
        }
    }, [quizData, currentRoute]);

    // if no personalityData is found, return loading
    if (!personalityData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{personalityData.title}</h1>
            <p>{personalityData.detailedDestription}</p>
            <Tabs tabs={personalityData.tabs} />
        </div>
    );
};

PractitionerPage.PageLayout = PageLayout;

export default PractitionerPage;
