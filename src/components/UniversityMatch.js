/* eslint-disable react/no-danger */
import Image from 'next/image';

const UniversityMatch = ({ school }) => (
    <div className="university-match">
        <h2>Here’s a potential University match:</h2>
        <Image
            width={352}
            height={433}
            src={school.imageURL}
            alt={school.title}
        />
        <h3>{school.title}</h3>
        <h4>{school.subTitle}</h4>
        <p dangerouslySetInnerHTML={{ __html: school.description }} />
        <a href={school.link}>{school.linkText}</a>
    </div>
);

export default UniversityMatch;
