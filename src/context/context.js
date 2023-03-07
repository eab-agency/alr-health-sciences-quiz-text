import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { getMatchedSchool } from '@/components/helpers/getMatchedSchool';

export const QuizDataContext = createContext(null);
export const UserLocationContext = createContext(null);

function Context({ children }) {
    const [quizData, setQuizData] = useState();
    const [loading, setLoading] = useState(false);
    const [matchedSchool, setMatchedSchool] = useState(null);

    const [userLocation, setUserLocation] = useState(null);
    const apiURL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_KEY}`;

    useEffect(() => {
        const getData = setTimeout(() => {
            axios.get(apiURL).then((response) => {
                setUserLocation(response.data);
            });
        }, 2000);

        return () => clearTimeout(getData);
    }, []);

    // wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
    useEffect(() => {
        if (userLocation) {
            const matchedSchoolInternal = getMatchedSchool(
                userLocation.region_iso_code,
                quizData
            );
            // grab first school from quizData.schools and set matchedSchool
            setMatchedSchool(matchedSchoolInternal);
        }
    }, [userLocation]);

    // grab quizData from quizData.json and set matchedSchool to first school in quizData.schools
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

    return (
        <UserLocationContext.Provider
            value={{ userLocation, matchedSchool, setMatchedSchool }}
        >
            <QuizDataContext.Provider value={{ quizData, setQuizData }}>
                {children}
            </QuizDataContext.Provider>
        </UserLocationContext.Provider>
    );
}

export default Context;
