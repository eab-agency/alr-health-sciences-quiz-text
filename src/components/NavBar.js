import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdClose, MdMenu } from 'react-icons/md';
import styles from '../styles/modules/NavBar.module.scss';

export default function NabBar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Note: AO - Prevent scrolling when the menu is open.
    // const pageBody = document.querySelector('body');

    const toggleMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            // pageBody.style.overflow = 'visible';
        } else {
            setIsMenuOpen(true);
            // pageBody.style.overflow = 'hidden';
        }
    };

    return (
        <nav className={styles.navigation}>
            <button
                type="button"
                className={
                    isMenuOpen ? styles.hamburgerOpen : styles.hamburgerClose
                }
                onClick={toggleMenu}
            >
                {isMenuOpen ? <MdClose /> : <MdMenu />}
            </button>
            <ul className={isMenuOpen ? styles.menuOpen : styles.menuClosed}>
                <li>
                    <Link
                        href="/practitioner"
                        className={
                            currentRoute === '/practitioner'
                                ? styles.active
                                : styles.nonActive
                        }
                    >
                        Practitioner
                    </Link>
                </li>
                <li>
                    <Link
                        href="/analyst"
                        className={
                            currentRoute === '/analyst'
                                ? styles.active
                                : styles.nonActive
                        }
                    >
                        Analyst
                    </Link>
                </li>
                <li>
                    <Link
                        href="/educator"
                        className={
                            currentRoute === '/educator'
                                ? styles.active
                                : styles.nonActive
                        }
                    >
                        Educator
                    </Link>
                </li>
                <li>
                    <Link
                        href="/executive"
                        className={
                            currentRoute === '/executive'
                                ? styles.active
                                : styles.nonActive
                        }
                    >
                        Executive
                    </Link>
                </li>
                <li>
                    <Link
                        href="/scientist"
                        className={
                            currentRoute === '/scientist'
                                ? styles.active
                                : styles.nonActive
                        }
                    >
                        Scientist
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
