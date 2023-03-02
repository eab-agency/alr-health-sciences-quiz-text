import React from 'react'

const Score = ({score, personality}) => {
  return (
    <div>  <h2>Scores</h2>
            <ul>
                {score && Object.keys(score).map((personality, index) => (
                    <li key={index}>
                        {personality}: {score[personality]}
                    </li>
                ))}
                <li>Winning personality: {personality}</li>
            </ul></div>
  )
}

export default Score