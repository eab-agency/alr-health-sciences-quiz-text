const regionMatching = {
    northeast: [
        'ME',
        'VT',
        'NH',
        'MA',
        'RI',
        'CT',
        'NY',
        'NJ',
        'PA',
        'MD',
        'DE',
    ],
    midwest: [
        'OH',
        'MI',
        'IN',
        'IL',
        'WI',
        'MN',
        'IA',
        'MO',
        'ND',
        'SD',
        'NE',
        'KS',
    ],
    southwest: ['NM', 'AZ', 'CO', 'UT', 'NV', 'WY'],
    pacific: ['CA', 'OR', 'WA', 'AK', 'HI'],
    mountain: ['MT', 'ID', 'ND', 'SD', 'WY', 'CO', 'UT', 'NV'],
    southeast: ['VA', 'NC', 'SC', 'GA', 'FL'],
    southCentral: ['WV', 'KY', 'TN', 'AL', 'MS', 'AR', 'LA', 'OK', 'TX'],
};

// function that checks region_iso_code and returns a school if matched from .schools.associatedStates otherwise returns the first school from schools
export const getMatchedSchool = (state, schools) => {
    console.log(“☠️☠️”, state, schools)
    if (schools) {
        const region = Object.keys(regionMatching).find((r) =>
            regionMatching[r].includes(state)
        );

        const matchedSchoolInternal = schools.find(
            (school) => school.region === region || school.region === 'US'
        );

        // If no school matches the input state, return the first school in the array
        if (!matchedSchoolInternal) {
            return schools[0];
        }

        const remainingSchools = schools.filter(
            (school) => school !== matchedSchoolInternal
        );

        return [matchedSchoolInternal, ...remainingSchools];
    }
};
