import React from 'react';
import AcquiaForm from './AcquiaForm';

const Results = ({ personality, description, title }) => (
    <div>
        Results: {personality}
        <h2>{title}</h2>
        <p>{description}</p>
        <AcquiaForm src="https://alr-wd-layout-library-sandbox-sj-1-2.contact-server.com/form/generate.js?id=2" />
    </div>
);

export default Results;
