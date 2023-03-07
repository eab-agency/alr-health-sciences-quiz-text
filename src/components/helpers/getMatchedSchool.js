// function that checks region_iso_code and returns a school if matched from quizData.schools.associatedStates otherwise returns the first school from quizData.schools
export const getMatchedSchool = (state, quizData) => {
    if (quizData) {
        const matchedSchoolInternal = quizData.schools.find(
            (school) =>
                school.associatedStates.includes(state) ||
                school.associatedStates.includes('US')
        );

        // If no school matches the input state, return the first school in the array
        if (!matchedSchoolInternal) {
            return quizData.schools[0];
        }

        return matchedSchoolInternal;
    }
};
