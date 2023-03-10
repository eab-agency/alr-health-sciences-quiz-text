import React from 'react';
import styles from '@/styles/modules/PageHeader.module.scss';
import NabBar from './NavBar';
import MainLogo from './MainLogo';

export default function PageHeader({ pageType }) {
    return (
        <header>
            <div className={styles.container}>
                {pageType !== 'results' ? (
                    <div className={styles['page-header']}>
                        <MainLogo />
                    </div>
                ) : (
                    <div className={styles['page-header-results']}>
                        <MainLogo />
                        <NabBar />
                    </div>
                )}
            </div>
        </header>
    );
}
