import React from 'react';
import styles from '@/styles/modules/PageHeader.module.scss';
import NabBar from './NavBar';
import MainLogo from './MainLogo';

export default function PageHeader({ pageType }) {
    return (
        <header>
            <div className={styles.container}>
                <div
                    className={
                        pageType ? `page-header ${pageType}` : 'page-header'
                    }
                >
                    <MainLogo />
                    {pageType === 'results' ? <NabBar /> : null}
                </div>
            </div>
        </header>
    );
}
