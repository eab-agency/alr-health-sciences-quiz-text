import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { getMatchedSchool } from '@/components/helpers/getMatchedSchool';

const QuizDataContext = createContext(null);
const UserLocationContext = createContext(null);

function ContextProvider({ children }) {
    const [quizData, setQuizData] = useState();
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const [matchedSchool, setMatchedSchool] = useState(null);

    const apiURL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_KEY}`;

    const [location, setLocation] = useLocalStorage('489hLocation', null);

    useEffect(() => {
        const getData = setTimeout(() => {
            axios.get(apiURL).then((response) => {
                setLocation(response.data);
            });
        }, 2000);

        return () => clearTimeout(getData);
    }, [apiURL, setLocation]);

    // wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
    useEffect(() => {
        if (location) {
            const matchedSchoolInternal = getMatchedSchool(
                location.region_iso_code,
                quizData
            );
            // grab first school from quizData.schools and set matchedSchool
            setMatchedSchool(matchedSchoolInternal);
        }
    }, [quizData, location]);

    // grab quizData from quizData.json and set matchedSchool to first school in quizData.schoolss
    useEffect(() => {
        setLoading(true);
        fetch('./quizData.json')
            .then((res) => res.json())
            .then((data) => {
                setQuizData(data);
                setMatchedSchool(data.schools[0]);
                setLoading(false);
            });
    }, []);

    const valueUser = useMemo(
        () => ({ matchedSchool, setMatchedSchool }),
        [matchedSchool, setMatchedSchool]
    );

    const valueQuizData = useMemo(
        () => ({ quizData, setQuizData }),
        [quizData, setQuizData]
    );

    return (
        <UserLocationContext.Provider value={valueUser}>
            <QuizDataContext.Provider value={valueQuizData}>
                {children}
            </QuizDataContext.Provider>
        </UserLocationContext.Provider>
    );
}

function useUser() {
    const context = useContext(UserLocationContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a CountProvider');
    }
    return context;
}

function useQuizData() {
    const context = useContext(QuizDataContext);
    if (context === undefined) {
        throw new Error('useQuizData must be used within a CountProvider');
    }
    return context;
}

export { useQuizData, useUser, ContextProvider };
