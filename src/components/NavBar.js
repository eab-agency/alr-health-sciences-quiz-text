import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdMenu } from 'react-icons/md';
import styles from '../styles/modules/NavBar.module.scss';

export default function NabBar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <nav className={styles.navigation}>
            <button type="button" className={styles.hamburger}>
                <MdMenu />
            </button>
            <ul>
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
