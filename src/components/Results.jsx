import React from 'react';
import AcquiaForm from './AcquiaForm';

const Results = ({ personality, description, title }) => (
    <div>
        Results: {personality}
        <h2>{title}</h2>
        <p>{description}</p>
        <AcquiaForm src="https://go.cappex-health.com/form/generate.js?id=2" />
    </div>
);

export default Results;
