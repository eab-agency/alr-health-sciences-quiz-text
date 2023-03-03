/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Score from '@/components/Score';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Question from './Question';
import ResetQuizButton from './ResetQuizButton';
import Results from './Results';

function Quiz() {
    const [quizData, setQuizData] = useState(null);
    const [eabQuizData, setEabQuizData] = useLocalStorage('eab-quiz-data', {
        answers: [],
        currentQuestion: 0,
        score: {
            executive: 0,
            practitioner: 0,
            educator: 0,
            scientist: 0,
            analyst: 0,
            initial: 0,
        },
        highestScorePersonality: null,
    });
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('./quizData.json')
            .then((res) => res.json())
            .then((data) => {
                setQuizData(data);
                setLoading(false);
            });
    }, []);

    const handleAnswer = (question, answer) => {
        // calculate personality score based on selected answer
        const { personality } = answer;
        // Only update score if the answer's personality is not 'initial'
        const answerWeight =
            personality !== 'initial'
                ? eabQuizData.score[personality]
                    ? eabQuizData.score[personality] + answer.weight
                    : answer.weight
                : 0;

        // find highest score personality from updated score object
        const updatedScore = {
            ...eabQuizData.score,
            [personality]: answerWeight,
        };
        let highestScorePersonality = Object.keys(updatedScore)
            .filter((key) => key !== 'initial') // Filter out the 'initial' personality
            .reduce((a, b) => {
                if (updatedScore[a] === updatedScore[b]) {
                    return a; // If scores are tied, return the existing highest score personality
                }
                return updatedScore[a] > updatedScore[b] ? a : b;
            }, Object.keys(updatedScore)[0]); // Set the initial value to the first key in case all scores are 0

        if (updatedScore[highestScorePersonality] === 0) {
            highestScorePersonality = ''; // If all scores are 0, return an empty string as the highest score personality
        }

        setEabQuizData({
            ...eabQuizData,
            answers: [
                ...eabQuizData.answers,
                { question, answer: answer.answer },
            ],
            score: updatedScore,
            currentQuestion: eabQuizData.currentQuestion + 1,
            highestScorePersonality,
        });
    };

    const handleRetakeQuiz = () => {
        // reset state
        setEabQuizData({
            ...eabQuizData,
            answers: [],
            currentQuestion: 0,
            score: {
                executive: 0,
                practitioner: 0,
                educator: 0,
                scientist: 0,
                analyst: 0,
                initial: 0,
            },
            highestScorePersonality: null,
        });
        localStorage.removeItem('eab-quiz-data');
    };

    if (isLoading) return <p>Loading...</p>;
    if (!quizData) return <p>No quiz data</p>;

    // if we are at the end of the quiz, show the results page and pass the score and personality
    if (eabQuizData.currentQuestion === quizData.questions.length) {
        const { description, title } =
            quizData.results[eabQuizData.highestScorePersonality];
        return (
            <div>
                <Results
                    personality={eabQuizData.highestScorePersonality}
                    description={description}
                    title={title}
                />
                <ResetQuizButton onClick={handleRetakeQuiz} />
            </div>
        );
    }

    return (
        <div>
            <Score
                score={eabQuizData.score}
                winningPersonality={eabQuizData.highestScorePersonality}
            />
            <h3>
                Question {eabQuizData.currentQuestion + 1} of{' '}
                {quizData.questions.length}
            </h3>
            {quizData && (
                <Question
                    question={quizData.questions[eabQuizData.currentQuestion]}
                    handleAnswer={handleAnswer}
                />
            )}
            <ResetQuizButton onClick={handleRetakeQuiz} />
        </div>
    );
}

export default Quiz;
