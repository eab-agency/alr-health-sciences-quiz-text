// function that checks region_iso_code and returns a school if matched from .schools.associatedStates otherwise returns the first school from schools
export const getMatchedSchool = (state, schools) => {
    if (schools) {
        const matchedSchoolInternal = schools.find(
            (school) =>
                school.associatedStates.includes(state) ||
                school.associatedStates.includes('US')
        );

        // If no school matches the input state, return the first school in the array
        if (!matchedSchoolInternal) {
            return schools;
        }

        const remainingSchools = schools.filter(
            (school) => school !== matchedSchoolInternal
        );

        return [matchedSchoolInternal, ...remainingSchools];
    }
};
