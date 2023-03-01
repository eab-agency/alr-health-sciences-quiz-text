import React from 'react';

function Answers({ answers, handleAnswer }) {
console.log("🚀 ~ file: Answers.jsx:4 ~ Answers ~ answers:", answers)

    return (
        <div>
            {answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)}>
                    {answer.answer} ({answer.personality})
                </button>
            ))}
        </div>
    );
}

export default Answers;
