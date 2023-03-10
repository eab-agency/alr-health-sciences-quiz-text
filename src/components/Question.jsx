import React, { useState, useEffect } from 'react';
import styles from '@/styles/global/layouts/Question.module.scss';

function Question({ question, handleAnswer }) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // use useEffect to shuffle answers
    useEffect(() => {
        // shuffle answers
        const shuffledAnswersTemp = [...question.answers];
        shuffledAnswersTemp.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffledAnswersTemp);
    }, [question]);

    const handleClick = (q, answer, assocField) => {
        handleAnswer(q, answer, assocField);
    };

    return (
        // get dangerouslySetInnerHTML to work

        <>
            <h2
                className="question-copy"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            <ul className={styles.questions}>
                {shuffledAnswers.map((answer, index) => (
                    <button
                        className="answer-button"
                        type="button"
                        key={index}
                        onClick={() =>
                            handleClick(
                                question.question,
                                answer,
                                question.associatedField
                            )
                        }
                    >
                        {answer.answer} ({answer.personality})
                    </button>
                ))}
            </ul>
        </>
    );
}

export default Question;
