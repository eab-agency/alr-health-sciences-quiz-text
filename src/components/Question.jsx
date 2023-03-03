import React, { useState, useEffect } from 'react';

function Question({ question, handleAnswer }) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // use useEffect to shuffle answers
    useEffect(() => {
        // shuffle answers
        const shuffledAnswersTemp = [...question.answers];
        shuffledAnswersTemp.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledAnswersTemp);
    }, [question]);

    return (
        <>
            <h2>{question.question}</h2>
            <ul>
                {shuffledAnswers.map((answer, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => handleAnswer(question.question, answer)}
                    >
                        {answer.answer} ({answer.personality})
                    </button>
                ))}
            </ul>
        </>
    );
}

export default Question;
