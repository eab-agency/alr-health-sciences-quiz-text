/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import { MdHelpOutline, MdOutlinePrivacyTip } from 'react-icons/md';
import { Reoverlay } from 'reoverlay';
import styles from '../styles/modules/PageFooter.module.scss';
import PrivacyModal from './PrivacyModal';
import HelpModal from './HelpModal';

export default function PageFooter() {
    const helpClick = () => {
        Reoverlay.showModal(HelpModal, {});
    };
    const privacyClick = () => {
        Reoverlay.showModal(PrivacyModal, {});
    };

    return (
        <footer className={styles['page-footer']}>
            <div className={styles.wrapper}>
                <div className={styles.logoLegal}>
                <figure className={styles.logo}>
                    <Image
                        src="/images/appily-logo-dark.svg"
                        alt="Appily Logo"
                        fill
                        />
                </figure>
                    <div className={styles.legalLinks}>
                            <ul>
                                <li><a href="https://www.appily.com/about" target='_blank'>About Us</a></li>
                                <li><a href="https://www.appily.com/terms-and-conditions" target='_blank'>Terms and Conditions</a></li>
                                <li><a href="https://www.appily.com/privacy-policy" target='_blank'>Privacy Policy</a></li>
                                <li><a href="https://privacy.eab.com/appily-cs-tours-CA" target='_blank'>California Privacy Notice</a></li>
                                <li><a href="https://www.appily.com/your-privacy-rights" target='_blank'>Do Not Sell or Share My Personal Information</a></li>
                                <li><a href="https://www.appily.com/data" target='_blank'>Data Attribution</a></li>
                                <li><a href="https://www.appily.com/your-privacy-rights" target='_blank'>Personal Information Protection</a></li>
                            </ul>
                    </div>
                    <div className="copyright">
                        <p>
                            © 2023 All rights reserved.{' '}
                            <a
                                href="https://www.appily.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                www.Appily.com
                            </a>
                        </p>
                    </div>
                </div>
                
                <div className="help-privacy">
                    <ul>
                        <li>
                            <button
                                type="button"
                                className={styles.helpPrivBtn}
                                onClick={helpClick}
                            >
                                <MdHelpOutline />
                                Help
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className={styles.helpPrivBtn}
                                onClick={privacyClick}
                            >
                                <MdOutlinePrivacyTip />
                                Privacy
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
