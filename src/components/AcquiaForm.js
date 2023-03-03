import React, { useRef } from 'react';
import useScript from '@/hooks/useScript';

//* ==========
//* EAB Acquia Form
// const x = `//alr-wd-layout-library-sandbox-sj-1-2.contact-server.com/form/generate.js?id=2`;

const AcquiaForm = ({ src, multiple }) => {
    const scriptRef = useRef(null);
    const status = useScript(src, scriptRef, multiple);

    return (
        <div ref={scriptRef} id="mauticform">
            {status === 'loading' && <span>Loading...</span>}
            {status === 'error' && <span>Error</span>}
        </div>
    );
};

export default AcquiaForm;
