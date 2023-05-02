import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const SchoolCarousel = ({ schools }) => (
    <Carousel responsive={responsive}>
        {schools.map((school) => (
            <>
                <h4 key={school.title}>{school.title}</h4>
                <p>
                    {school.schoolMeta.city}, {school.schoolMeta.state}
                </p>
                <Image
                    src={school.imageURL}
                    width="200"
                    height="100"
                    alt={school.title}
                />
                <Image src={school.logoUrl} width="100" height="100" />
                <p>{school.description}</p>
            </>
        ))}
    </Carousel>
);
export default SchoolCarousel;
