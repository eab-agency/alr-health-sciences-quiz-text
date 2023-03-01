import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Question from './Question';
import Answers from './Answers';
import ResetQuizButton from "../components/ResetQuizButton";
import { QuizContext } from "../contexts/QuizContext";

function Quiz() {
    const router = useRouter();

    const [state, dispatch] = useContext(QuizContext);
    const { questions, currentQuestion, quizEnded, score, result } = state;
    console.log("🚀 ~ file: Quiz.jsx:13 ~ Quiz ~ state:", state)

  

    const handleAnswer = (answer) => {
        dispatch({ type: "ANSWER_QUESTION", payload: answer });
    };


    const handleRetakeQuiz = () => {
        dispatch({ type: "RESET_QUIZ" });
    };


    useEffect(() => {
        if (quizEnded) {
            dispatch({ type: "QUIZ_END", payload: result });
            router.push(`/${result}`);
        }
    }, [quizEnded, dispatch, router, result]);


    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Scores</h2>
            <ul>
                {Object.keys(score).map((personality, index) => (
                    <li key={index}>
                        {personality}: {score[personality]}
                    </li>
                ))}
                <li>result: {result}</li>
            </ul>
            <Question
                question={questions[currentQuestion].question}
            />
            <Answers
                answers={questions[currentQuestion].answers}
                handleAnswer={handleAnswer}
            />
            <ResetQuizButton onClick={handleRetakeQuiz} />
        </div>
    );
}

export default Quiz;
