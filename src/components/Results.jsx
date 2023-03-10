import React from 'react';
import Form from '@/components/Form';
import Link from 'next/link';

const Results = ({ personality, description, title, answers }) => (
    <div>
        Results: {personality}
        <h2>{title}</h2>
        <p>{description}</p>
        <Form redirectTo={`/${personality}`} answers={answers} />
        {process.env.NODE_ENV === 'development' && (
            <Link href={`/${personality}`}>Skip form</Link>
        )}
    </div>
);

export default Results;
