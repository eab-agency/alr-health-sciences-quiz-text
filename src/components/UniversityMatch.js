/* eslint-disable react/no-danger */
import Image from 'next/image';
import styles from '@/styles/global/components/UniversityMatch.module.scss';
import Button from './Button';

const UniversityMatch = ({ school }) => (
    <div className={styles['university-match']}>
        <figure>
            <Image
                width={352}
                height={433}
                src={school.imageURL}
                alt={school.title}
            />
        </figure>
        <div className={styles.content}>
            <div className={styles.intro}>
                Here’s a potential University match:
            </div>
            <div className={styles['school-name-title']}>
                <h2>{school.title}</h2>
                <p>{school.subTitle}</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: school.description }} />
            <Button type="primary" label={school.linkText} href={school.link} />
        </div>
    </div>
);

export default UniversityMatch;
