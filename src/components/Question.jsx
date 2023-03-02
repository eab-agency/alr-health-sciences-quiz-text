import React, {useState, useEffect} from 'react';
function Question({ question, handleAnswer }) {

    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // use useEffect to shuffle answers
    useEffect(() => {
        // shuffle answers
        const shuffledAnswers = [...question.answers];
        shuffledAnswers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledAnswers);
    }, [question]);
    

    return (
        <>
            <h2>{question.question}</h2>
            <ul>
                {shuffledAnswers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(question.question, answer )}>
                        {answer.answer} ({answer.personality})
                    </button>
                ))}
            </ul>
        </>
    );
}

export default Question;
