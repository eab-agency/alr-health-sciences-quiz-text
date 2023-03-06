import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PractitionerPage = () => {
    const [userLocation, setUserLocation] = useState(null);
    const apiURL = 'https://ipgeolocation.abstractapi.com/v1/';

    // const getUserLocationFromAPI = async () => {
    //     axios
    //         .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setUserLocation(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    React.useEffect(() => {
        const getData = setTimeout(() => {
            axios
                .get(
                    `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}`
                )
                .then((response) => {
                    console.log(response.data);
                    setUserLocation(response.data);
                });
        }, 2000);

        return () => clearTimeout(getData);
    }, []);

    return (
        <div>
            Looks like you are a Practitioner from {userLocation?.city},{' '}
            {userLocation?.region}!
            <div />
        </div>
    );
};

export default PractitionerPage;
