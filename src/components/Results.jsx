import React from 'react';
import Form from '@/components/Form';
import styles from '@/styles/global/layouts/Results.module.scss';

const Results = ({ personality, description, title, answers }) => (
    <div className={styles['results-container']}>
        <span className="intro-title">Your ideal role is ...</span>
        <div className={styles.role}>
            {/* Results: {personality} */}
            <h2>{title}</h2>
            <p>{description}</p>
        </div>

        <div className={styles['engage-copy']}>
            <p>
                Learn why we thought this role could be a good fit for you!
                Then, discover <strong>related careers</strong>, average{' '}
                <strong>salaries</strong> and job outlook, and{' '}
                <strong>academic programs</strong> that can help you reach your
                goals faster.
            </p>
        </div>
        <Form redirectTo={`/${personality}`} answers={answers} />
    </div>
);

export default Results;
