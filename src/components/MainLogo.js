import React from 'react';
import styles from '@/styles/global/components/MainLogo.module.scss';
import Image from 'next/image';

export default function MainLogo() {
    const [logo, setLogo] = React.useState(null);

    React.useEffect(() => {
        const logoLight = '/images/cappex-logo-light.svg';
        const logoDark = '/images/cappex-logo-dark.svg';

        const matchColorMode = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        if (matchColorMode.matches) {
            setLogo(logoDark);
        } else {
            setLogo(logoLight);
        }

        matchColorMode.addEventListener('change', (e) => {
            if (e.matches) {
                setLogo(logoDark);
            } else {
                setLogo(logoLight);
            }
        });
    }, []);

    return (
        <figure className={styles['main-logo']}>
            {logo && (
                <Image src={logo} alt="Cappex Logo" width={100} height={19} />
            )}
        </figure>
    );
}
