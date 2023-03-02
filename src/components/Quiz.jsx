import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Question from './Question';
import Answers from './Answers';
import ResetQuizButton from "../components/ResetQuizButton";

import quizData from '../data/quizData.json';

function Quiz() {
    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [personalityType, setPersonalityType] = useState(null);
    const [resultText, setResultText] = useState(null);

    useEffect(() => {
        // Load previoius answers from local storage if available
        const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
        if (storedAnswers) {
            setAnswers(storedAnswers);
        }
    }, []);

    useEffect(() => {
        // Check if all questions have been answered and calculate results
        if (Object.keys(answers).length === quizData.questions.length) {
            const scores = {};
            quizData.questions.forEach((question, index) => {
                const selectedAnswer = answers[index];
                if (selectedAnswer) {
                    const personality = selectedAnswer.personality;
                    const weight = selectedAnswer.weight;
                    if (!scores[personality]) {
                        scores[personality] = 0;
                    }
                    scores[personality] += weight;
                }
            });
            // Find the personality with the highest score
            let maxScore = -Infinity;
            let maxPersonality = null;
            for (const personality in scores) {
                if (scores[personality] > maxScore) {
                    maxScore = scores[personality];
                    maxPersonality = personality;
                }
            }
            setPersonalityType(maxPersonality);
            setResultText(quizData.results[maxPersonality]);
            // Store answers in local storage
            localStorage.setItem('quizAnswers', JSON.stringify(answers));
        }
    }, [answers]);

    const handleAnswer = (index, answer) => {
        setAnswers({ ...answers, [index]: answer });
        setCurrentQuestion(currentQuestion + 1);
    };



    return (
        <div>
            <h2>Scores</h2>
            {/* <ul>
                {Object.keys(score).map((personality, index) => (
                    <li key={index}>
                        {personality}: {score[personality]}
                    </li>
                ))}
                <li>result: {result}</li>
            </ul> */}
            <Question
                question={quizData.questions[currentQuestion]}
            />
            {/* <ResetQuizButton onClick={handleRetakeQuiz} /> */}
        </div>
    );
}

export default Quiz;
