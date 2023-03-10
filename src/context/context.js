/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { getMatchedSchool } from '@/components/helpers/getMatchedSchool';
import { useRequest } from '@/hooks/useRequest';

const UserLocationContext = createContext(null);

function ContextProvider({ children }) {
    const { data: schools, error } = useRequest('/quiz/schools');

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
                schools
            );
            // grab first school from schools and set matchedSchool
            setMatchedSchool(matchedSchoolInternal);
        }
    }, [schools, location]);

    // set matchedSchool to first school in schools
    useEffect(() => {
        if (schools) setMatchedSchool(schools[0]);
    }, [schools]);

    const valueUser = useMemo(
        () => ({ matchedSchool, setMatchedSchool }),
        [matchedSchool, setMatchedSchool]
    );

    return (
        <UserLocationContext.Provider value={valueUser}>
            {children}
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

export { useUser, ContextProvider };
