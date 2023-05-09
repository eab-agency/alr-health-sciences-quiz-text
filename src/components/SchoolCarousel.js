import Image from 'next/image';
/* eslint-disable */
import Carousel from 'react-multi-carousel';
/* eslint-enable */
import { MdChevronRight } from 'react-icons/md';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1800 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 1800, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 40,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 40,
    },
};

const SchoolCarousel = ({ schools, handleClick, className }) => {
    const handleButtonClick = (school) => {
        handleClick(school);
    };

    // if schools is empty, return null
    if (!schools) return null;

    return (
        <Carousel
            responsive={responsive}
            showDots
            infinite
            containerClass={className}
        >
            {schools.map((school) => (
                <div className="item-content" key={school.title}>
                    <div className="item-head">
                        <Image
                            src={school.imageURL}
                            width="200"
                            height="109"
                            alt={school.title}
                            className="school-thumbnail"
                        />
                        <Image
                            src={school.logoUrl}
                            width="100"
                            height="100"
                            alt={`${school.title} logo`}
                            className="school-logo"
                        />
                    </div>
                    <div className="item-text">
                        <div className="item-head">
                            <h4 key={school.title}>{school.title}</h4>
                            <p>
                                {school.schoolMeta.city},{' '}
                                {school.schoolMeta.state}
                            </p>
                        </div>
                        <p>{school.description}</p>
                        <button
                            type="button"
                            onClick={() => handleButtonClick(school)}
                        >
                            <span>{school.buttonText}</span>
                            <i>
                                <MdChevronRight />
                            </i>
                        </button>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};
export default SchoolCarousel;
