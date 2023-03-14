import React from 'react';
import Form from '@/components/Form';
import MainLogo from './MainLogo';

const CappexFormSection = () => (
    <section className="cappex-form">
        <div className="content">
            <h3>
                Want more from <MainLogo />?
            </h3>
            <p>
                Let us know the best way to contact you with helpful information
                and potential college or university matches.
            </p>
            <Form id="2" />
        </div>
    </section>
);

export default CappexFormSection;
