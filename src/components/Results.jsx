import React from 'react';
import AcquiaForm from './AcquiaForm';

const Results = ({ personality, description, title }) => (
    <div>
        <span>Your ideal role is ...</span>
        <div className="role">
            {/* Results: {personality} */}
            <h2>{title}</h2>
            <p>{description}</p>
        </div>

        <div className="engage-copy">
            <p>
                Learn why we thought this role could be a good fit for you!
                Then, discover <strong>related careers</strong>, average{' '}
                <strong>salaries</strong> and job outlook, and{' '}
                <strong>academic programs</strong> that can help you reach your
                goals faster.
            </p>
        </div>
        <AcquiaForm src="https://go.cappex-health.com/form/generate.js?id=2" />
    </div>
);

export default Results;
