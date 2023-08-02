/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getMatchedSchool } from '@/helpers/getMatchedSchool';
import { useRequest } from '@/hooks/useRequest';
import { useCookies } from 'react-cookie';

const UserLocationContext = createContext({});

function ContextProvider({ children }) {
    const { data: schools, error } = useRequest('/quiz/schools');

    const [matchedSchools, setMatchedSchools] = useState([]);

    const [cookies, setCookies] = useCookies(['initialData']);

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

    const [apiRequestMade, setApiRequestMade] = useState(false);

    useEffect(() => {
        // Check if the initial data is already stored in cookies
        const { initialData } = cookies;

        if (initialData) {
            // Use the initial data from cookies instead of hitting the api
            setLocation(initialData);
        } else if (!apiRequestMade) {
            // Only make the API request if it hasn't been made yet
            setApiRequestMade(true);
            axios
                .get(apiURL)
                .then((response) => {
                    const { data } = response;
                    const { region_iso_code, country_code } = data;

                    // Store the initial data in cookies
                    const initialResponseData = {
                        region_iso_code,
                        country_code,
                        notUS: country_code !== 'US',
                    };
                    setLocation(initialResponseData);
                    setCookies('initialData', initialResponseData);
                })
                .catch((error) => {
                    // Handle the error here
                    console.log('API Error:', error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiURL, schools, setLocation, setCookies]);

    // wait for userLocation to be populated and then set matchedSchool based on userLocation.region_iso_code
    useEffect(() => {
        if (location) {
            const matchedSchoolInternal = getMatchedSchool(
                location?.region_iso_code,
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
