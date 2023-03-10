import React from 'react';
import Image from 'next/image';
import styles from '@/styles/modules/PageHeader.module.scss';
import NabBar from './NavBar';

export default function PageHeader({ pageType }) {
    return (
        <header>
            <div className={styles.container}>
                <div
                    className={
                        pageType ? `page-header ${pageType}` : 'page-header'
                    }
                >
                    <figure>
                        <Image
                            src="/images/cappex-logo-light.svg"
                            alt="Cappex Logo"
                            width={200}
                            height={50}
                        />
                    </figure>
                    {pageType === 'results' ? <NabBar /> : null}
                </div>
            </div>
        </header>
    );
}
