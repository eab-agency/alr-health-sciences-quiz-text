import React from 'react';
import Form from '@/components/Form';
import Link from 'next/link';

import styles from '@/styles/global/layouts/Results.module.scss';
import useUser from '@/hooks/useUser';

const Results = ({ personality, description, title, answers }) => {
    const { user } = useUser();
    return (
        <div className={styles['results-container']}>
            <span className="intro-title">Your ideal role is ...</span>
            <div className={styles.role}>
                {/* Results: {personality} */}
                <h2 className={styles.roleTitle}>{title}</h2>
                <p>{description}</p>
            </div>

            <div className={styles.engageCopy}>
                <p>
                    Learn why we thought this role could be a good fit for you!
                    Then, discover <strong>related careers</strong>, average{' '}
                    <strong>salaries</strong> and job outlook, and{' '}
                    <strong>academic programs</strong> that can help you reach
                    your goals faster.
                </p>
            </div>
            <div className={styles.Form}>
                <h2>Where should we send your results?</h2>
                <Form
                    redirectTo={`/${personality}`}
                    answers={answers}
                    user={user}
                />
                {process.env.NODE_ENV === 'development' && (
                    <Link href={`/${personality}`}>
                        Skip form (only shows in dev mode)
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Results;
