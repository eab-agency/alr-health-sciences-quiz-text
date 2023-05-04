import Image from 'next/image';
/* eslint-disable */
import Carousel from 'react-multi-carousel';
import styles from '@/styles/global/components/Accordion.module.scss';
// import 'react-multi-carousel/lib/styles.css';
/* eslint-enable */

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const SchoolCarousel = ({ schools, handleClick }) => {
    const handleButtonClick = () => {
        handleClick();
    };

    // if schools is empty, return null
    if (!schools) return null;

    return (
        <Carousel responsive={responsive}>
            {schools.map((school) => (
                <div key={school.title}>
                    <Image
                        src={school.imageURL}
                        width="200"
                        height="109"
                        alt={school.title}
                    />
                    <Image
                        src={school.logoUrl}
                        width="100"
                        height="100"
                        alt={`${school.title} logo`}
                    />
                    <h4 key={school.title}>{school.title}</h4>
                    <p>
                        {school.schoolMeta.city}, {school.schoolMeta.state}
                    </p>
                    <p>{school.description}</p>
                    <button type="button" onClick={() => handleButtonClick()}>
                        {school.buttonText}
                    </button>
                </div>
            ))}
        </Carousel>
    );
};
export default SchoolCarousel;
