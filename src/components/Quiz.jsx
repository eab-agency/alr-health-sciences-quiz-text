/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
// import Score from '@/components/Score';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Image from 'next/image';
import styles from '@/styles/global/layouts/Quiz.module.scss';
import Question from './Question';
import ResetQuizButton from './ResetQuizButton';
import Results from './Results';
import { useQuizData } from '../context/context';

function Quiz() {
    const { quizData, setQuizData } = useQuizData();
    const [personalityData, setPersonalityData] = useState('executive');

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
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setLoading] = useState(false);

    const handleAnswer = (question, answer, associatedField) => {
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
                { question, answer: answer.answer, associatedField },
            ],
            score: updatedScore,
            currentQuestion: eabQuizData.currentQuestion + 1,
            highestScorePersonality,
        });
        setQuizData({
            ...quizData,
            personality: highestScorePersonality,
        });
    };

    // if highestScorePersonality is changes, then set the personalityData
    React.useEffect(() => {
        if (quizData && quizData.results) {
            const personalityDataInternal = quizData.results.find(
                (result) =>
                    result.title.toLowerCase() ===
                    eabQuizData.highestScorePersonality
            );
            setPersonalityData(personalityDataInternal);
        }
    }, [eabQuizData.highestScorePersonality, quizData]);

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
    };

    if (isLoading) return <p>Loading...</p>;
    if (!quizData) return <p>No quiz data</p>;

    // if we are at the end of the quiz, show the results page and pass the score and personality
    if (eabQuizData.currentQuestion === quizData.questions.length) {
        const results = {
            answers: eabQuizData.answers,
            highestScorePersonality: eabQuizData.highestScorePersonality,
        };
        return (
            <div>
                <Results
                    personality={eabQuizData.highestScorePersonality}
                    description={personalityData.description}
                    title={personalityData.title}
                    answers={results}
                />
                <ResetQuizButton onClick={handleRetakeQuiz} />
            </div>
        );
    }
    if (eabQuizData.currentQuestion === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className="intro-title">
                        Before we get started ...
                    </span>
                    <div className="questions-container">
                        {quizData && (
                            <Question
                                question={
                                    quizData.questions[
                                        eabQuizData.currentQuestion
                                    ]
                                }
                                handleAnswer={handleAnswer}
                            />
                        )}
                    </div>
                </div>
                <figure className={styles['deco-image']}>
                    <Image
                        src="/images/cappex-education-journey.jpg"
                        alt="Define Your Future in Health Care"
                        width={500}
                        height={600}
                    />
                </figure>
            </div>
        );
    }

    return (
        <div className={styles['container-quiz']}>
            <div className={styles.content}>
                {/* NOTE: This score components was just for testing purposes?? */}
                {/* } <Score
                    score={eabQuizData.score}
                    winningPersonality={eabQuizData.highestScorePersonality}
                />{' '}
                */}
                <span className="intro-title">
                    Define Your Future in Health Care
                </span>
                <div className={styles['questions-counter']}>
                    Question {eabQuizData.currentQuestion + 1} of{' '}
                    {quizData.questions.length}
                </div>
                <div className="questions-container">
                    {quizData && (
                        <Question
                            question={
                                quizData.questions[eabQuizData.currentQuestion]
                            }
                            handleAnswer={handleAnswer}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
