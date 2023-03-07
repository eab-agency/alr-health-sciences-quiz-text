import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/NavBar.module.css';

export default function NabBar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <nav className="page-layout__nav">
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
        </nav>
    );
}
