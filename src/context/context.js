/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import MockAdapter from 'axios-mock-adapter';

import { getMatchedSchool } from '@/helpers/getMatchedSchool';
import { useRequest } from '@/hooks/useRequest';

const UserLocationContext = createContext({});

function ContextProvider({ children }) {
    const { data: schools, error } = useRequest('/quiz/schools');

    const [matchedSchools, setMatchedSchools] = useState(null);

    const apiURL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_ABSTRACT_API_KEY}&fields=region_iso_code,country_code`;

    // Uncomment the below to simulate a 4XX error when making a GET request to apiURL
    // Create a new instance of axios mock
    // const mock = new MockAdapter(axios);
    // console.log(
    //     '🐛🐛🐛🐛 MockAdapter: Simulating a 4XX error for GET request to',
    //     apiURL
    // );
    // mock.onGet(apiURL).reply(416, { error: 'Bad Request' });

    // const [location, setLocation] = useLocalStorage('489hLocation', null);
    const [location, setLocation] = useState(null);

    const [formData, setFormData] = useState(null);

    const [utmSource, setUtmSource] = useState(null);

    useEffect(() => {
        const getData = setTimeout(() => {
            axios
                .get(apiURL)
                .then((response) => {
                    setLocation({
                        region_iso_code: response.data.region_iso_code,
                        country_code: response.data.country_code,
                        notUs: response.data.country_code !== 'US',
                    });
                })
                .catch((error) => {
                    // Handle the error here
                    console.log('API Error:', error);

                    const matchedSchoolInternal = getMatchedSchool(
                        null,
                        schools
                    );
                    // grab first school from schools and set matchedSchool
                    setMatchedSchools(matchedSchoolInternal);
                });
        }, 2000);

        return () => clearTimeout(getData);
    }, [apiURL, schools, setLocation]);

    // wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
    useEffect(() => {
        if (location) {
            const matchedSchoolInternal = getMatchedSchool(
                location.region_iso_code,
                schools
            );
            // grab first school from schools and set matchedSchool
            setMatchedSchools(matchedSchoolInternal);
        }
    }, [schools, location]);

    const valueUser = useMemo(
        () => ({
            matchedSchools,
            setMatchedSchools,
            location,
            formData,
            setFormData,
            utmSource,
            setUtmSource,
        }),
        [
            matchedSchools,
            setMatchedSchools,
            location,
            formData,
            setFormData,
            utmSource,
            setUtmSource,
        ]
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
