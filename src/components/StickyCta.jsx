import React, { useState, useEffect } from 'react';
import { MdChevronRight } from 'react-icons/md';
import Button from '@/components/Button';
import styles from '@/styles/global/components/StickyCta.module.scss';

export const StickyCta = ({ trackedElement }) => {
    const [scrolled, setScrolled] = useState(false);
    const [posY, setPosY] = useState(0);
    const [quizLink, setQuizLink] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const trigger = posY - 700;

            if (window.scrollY >= trigger) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posY]);

    useEffect(() => {
        if (trackedElement && trackedElement.current) {
            const trackedElementPosY = trackedElement.current.offsetTop;
            setPosY(trackedElementPosY);

            const trackedElementClass =
                trackedElement.current.className.toLowerCase();

            setQuizLink(trackedElementClass);
        }
    }, [trackedElement]);

    const stickyCtaClass = `${styles.stickyCta} ${
        scrolled ? styles.scrolled : ''
    }`;

    const handleClick = () => {
        window.scrollTo({
            top: posY,
            behavior: 'smooth',
        });
    };

    if (quizLink.includes('quiz')) {
        return (
            <div className={stickyCtaClass}>
                <Button
                    type="primary"
                    label="Take the Quiz"
                    href="/careers/healthcare/quiz"
                    className={styles.button}
                />
            </div>
        );
    }

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
