import React from 'react';

function Question({ question }) {
    console.log("🚀 ~ file: Question.jsx:4 ~ Question ~ question:", question)
    return (
        <>
            <h2>{question.question}</h2>
            <ul>
                {question.answers.map((answer, index) => (
                    <li key={index} onClick={() => handleAnswer(currentQuestion, answer)}>
                        {answer.text}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Question;
