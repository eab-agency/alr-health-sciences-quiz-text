import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Question from './Question';
import ResetQuizButton from "../components/ResetQuizButton";
import Score from "@/components/Score";
import data from '../data/quizData.json';
import {useLocalStorage}  from '@/hooks/useLocalStorage';

function Quiz() {
    const [quizData, setQuizData] = useState(null);
    const [eabQuizData, setEabQuizData] = useLocalStorage('eab-quiz-data', {
        answers: [],
        currentQuestion: 0,
        score: {
            "executive": 0,
            "practitioner": 0,
            "educator": 0,
            "scientist": 0,
            "analyst": 0
        },
        highestScorePersonality: null
    });
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('./quizData.json')
            .then((res) => res.json())
            .then((data) => {
                setQuizData(data)
                setLoading(false)
            })
    }, []);


    const handleAnswer = (question, answer ) => {
        // calculate personality score based on selected answer
        const personality = answer.personality;
        const answerWeight = eabQuizData.score[personality] ? eabQuizData.score[personality] + answer.weight : answer.weight;

        // set highest score personality
        const highestScorePersonality = Object.keys(eabQuizData.score).reduce((a, b) => eabQuizData.score[a] > eabQuizData.score[b] ? a : b);



        setEabQuizData({ ...eabQuizData, answers: [ ...eabQuizData.answers, {question: question, answer: answer.answer} ], score: { ...eabQuizData.score, [personality]: answerWeight }, currentQuestion: eabQuizData.currentQuestion + 1, highestScorePersonality: highestScorePersonality })
    };

    const handleRetakeQuiz = () => {
        // reset state
        setEabQuizData({
            ...eabQuizData, answers: [], currentQuestion: 0, score: {
                "executive": 0,
                "practitioner": 0,
                "educator": 0,
                "scientist": 0,
                "analyst": 0 },
            highestScorePersonality: null})

    };

    if (isLoading) return <p>Loading...</p>
    if (!quizData) return <p>No quiz data</p>


    return (
        <div>
            <Score score={eabQuizData.score} personality={eabQuizData.highestScorePersonality} />
            <h3>Question {eabQuizData.currentQuestion + 1} of {quizData.questions.length}</h3>
            {quizData && (<Question
                question={quizData.questions[eabQuizData.currentQuestion]} handleAnswer={handleAnswer}
            />)}
            <ResetQuizButton onClick={handleRetakeQuiz} />
        </div>
    );
}


export default Quiz;
