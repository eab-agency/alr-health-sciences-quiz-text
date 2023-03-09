import React from 'react';
import Image from 'next/image';
/* eslint-disable import/no-extraneous-dependencies */
import { MdHelpOutline, MdOutlinePrivacyTip } from 'react-icons/md';
import styles from '../styles/modules/PageFooter.module.scss';

export default function PageFooter() {
    return (
        <footer className={styles['page-footer']}>
            <div className={styles.wrapper}>
                <figure className={styles.logo}>
                    <Image
                        src="/images/cappex-footer-logo.svg"
                        alt="Cappex Logo"
                        fill
                    />
                </figure>
                <div className="copyright">
                    <p>
                        © 2023 All rights reserved.{' '}
                        <a href="https://www.cappex.com">www.Cappex.com</a>
                    </p>
                </div>
                <div className="help-privacy">
                    <ul>
                        <li>
                            <a href="#">
                                <MdHelpOutline />
                                Help
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <MdOutlinePrivacyTip />
                                Privacy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
