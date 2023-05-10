import React, { useState, useEffect } from 'react';
import { MdChevronRight } from 'react-icons/md';
import styles from '@/styles/global/components/StickyCta.module.scss';

export const StickyCta = ({ posY }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const trigger = posY - 600;

            if (window.scrollY >= trigger) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posY]);

    // console.log('the vertical: ', posY);

    const stickyCtaClass = `${styles.stickyCta} ${
        scrolled ? styles.scrolled : ''
    }`;

    const handleClick = () => {
        window.scrollTo({
            top: posY,
            behavior: 'smooth',
        });
    };

    return (
        <div className={stickyCtaClass}>
            <button type="button" onClick={handleClick}>
                <span>Explore your school matches</span>
                <i>
                    <MdChevronRight />{' '}
                </i>
            </button>
        </div>
    );
};
