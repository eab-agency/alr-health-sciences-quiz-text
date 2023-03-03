/* eslint-disable react/prop-types */
import React from 'react';

const Score = ({ score, personality }) => (
    <div>
        <h2>Scores</h2>
        <ul>
            {score &&
                Object.keys(score).map((personAlity, index) => (
                    <li key={index}>
                        {personAlity}: {score[personAlity]}
                    </li>
                ))}
            <li>Winning personality: {personality}</li>
        </ul>
    </div>
);

export default Score;
