import React, { useState, useEffect } from 'react';
import { MdChevronRight } from 'react-icons/md';
import styles from '@/styles/global/components/StickyCta.module.scss';

export const StickyCta = ({ trackedElement }) => {
    const [scrolled, setScrolled] = useState(false);
    const [posY, setPosY] = useState(0);

    useEffect(() => {
        const trackedElementPosY = trackedElement.current.offsetTop;
        setPosY(trackedElementPosY);
    }, [trackedElement]);

    useEffect(() => {
        const handleScroll = () => {
            const trigger = posY - 200;

            if (window.scrollY >= trigger) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posY, trackedElement]);

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
                <span>Explore Your School Matches</span>
                <i>
                    <MdChevronRight />{' '}
                </i>
            </button>
        </div>
    );
};
