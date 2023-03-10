import React from 'react';
import Form from '@/components/Form';

const Results = ({ personality, description, title, answers }) => (
    <div>
        Results: {personality}
        <h2>{title}</h2>
        <p>{description}</p>
        <Form redirectTo={`/${personality}`} answers={answers} />
    </div>
);

export default Results;
