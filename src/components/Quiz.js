/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
// import Score from '@/components/Score';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Image from 'next/image';
import styles from '@/styles/global/layouts/Quiz.module.scss';
import { useRequest } from '@/hooks/useRequest';
import Question from './Question';
import ResetQuizButton from './ResetQuizButton';
import Results from './Results';

function Quiz({ user }) {
    const { data: results, error: resultError } = useRequest('/quiz/results');
    const { data: questions, error: questionError } =
        useRequest('/quiz/questions');

    const [personalityData, setPersonalityData] = useState('executive');

    const [localQData, setLocalQData] = useLocalStorage('eab-quiz-data', {
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

    const handleAnswer = (question, answer, associatedField) => {
        // calculate personality score based on selected answer
        const { personality } = answer;
        // Only update score if the answer's personality is not 'initial'
        const answerWeight =
            personality !== 'initial'
                ? localQData.score[personality]
                    ? localQData.score[personality] + answer.weight
                    : answer.weight
                : 0;

        // find highest score personality from updated score object
        const updatedScore = {
            ...localQData.score,
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

        setLocalQData({
            ...localQData,
            answers: [
                ...localQData.answers,
                { question, answer: answer.answer, associatedField },
            ],
            score: updatedScore,
            currentQuestion: localQData.currentQuestion + 1,
            highestScorePersonality,
        });
    };

    // if highestScorePersonality is changes, then set the personalityData
    React.useEffect(() => {
        if (results) {
            const personalityDataInternal = results.find(
                (result) =>
                    result.title.toLowerCase() ===
                    localQData.highestScorePersonality
            );
            setPersonalityData(personalityDataInternal);
        }
    }, [localQData.highestScorePersonality, results]);

    const handleRetakeQuiz = () => {
        // reset state
        setLocalQData({
            ...localQData,
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
    if (questionError) return <p>Error loading questions.</p>;
    if (!questions) return <p className="loading">Loading...</p>;

    // if we are at the end of the quiz, show the results page and pass the score and personality
    if (localQData.currentQuestion === questions?.length) {
        const finalResults = {
            answers: localQData.answers,
            highestScorePersonality: localQData.highestScorePersonality,
        };
        return (
            <div className={styles.containerResults}>
                <div className={styles.content}>
                    <Results
                        personality={localQData.highestScorePersonality}
                        description={personalityData.description}
                        title={personalityData.title}
                        answers={finalResults}
                        user={user}
                    />
                    <ResetQuizButton onClick={handleRetakeQuiz} />
                </div>
            </div>
        );
    }
    if (localQData.currentQuestion === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className="intro-title">
                        Before we get started ...
                    </span>
                    <div className="questions-container">
                        {questions && (
                            <Question
                                questionNum={localQData.currentQuestion}
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
                    score={localQData.score}
                    winningPersonality={localQData.highestScorePersonality}
                />{' '}
                */}
                <span className="intro-title">
                    Define Your Future in Health Care
                </span>
                <div className={styles['questions-counter']}>
                    Question {localQData.currentQuestion + 1} of{' '}
                    {questions?.length}
                </div>
                <div className="questions-container">
                    <Question
                        handleAnswer={handleAnswer}
                        questionNum={localQData.currentQuestion}
                    />
                </div>
            </div>
        </div>
    );
}

export default Quiz;
