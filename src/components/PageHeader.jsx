import React from 'react';
import Image from 'next/image';
import NabBar from './NavBar';

export default function PageHeader({ pageType }) {
    return (
        <header>
            {/* <div className={className}> */}
            <div
                className={pageType ? `page-header ${pageType}` : 'page-header'}
            >
                <figure>
                    <Image
                        src="/images/cappex-logo-light.svg"
                        alt="Cappex Logo"
                        width={300}
                        height={300}
                    />
                </figure>
                {pageType === 'results' ? <NabBar /> : null}
            </div>
        </header>
    );
}
