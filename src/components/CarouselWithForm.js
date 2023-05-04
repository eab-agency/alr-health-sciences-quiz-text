import { useState } from 'react';
import SchoolCarousel from '@/components/SchoolCarousel';
import Form from '@/components/Form';
import { useUser } from '@/context/context';
import styles from '@/styles/global/components/CarouselWithForm.module.scss';
import { RiArrowGoBackFill } from 'react-icons/ri';

const CarouselWithForm = () => {
    const [visibleForm, setVisibleForm] = useState(false);
    const { matchedSchools, user } = useUser();

    const onCarouselClick = () => {
        setVisibleForm(!visibleForm);
    };
    return (
        <section className={styles.matchedSchools}>
            <div className={styles.intro}>
                <h2>Want More from Cappex?</h2>
            </div>

            <div className={styles.container}>
                <SchoolCarousel
                    schools={matchedSchools}
                    handleClick={() => onCarouselClick()}
                />

                {visibleForm && (
                    <div className={styles.carouselForm}>
                        <button
                            className={styles.closeBtn}
                            type="button"
                            onClick={() => onCarouselClick()}
                        >
                            Back{' '}
                            <i>
                                <RiArrowGoBackFill />
                            </i>
                        </button>

                        <div className={styles.intro}>
                            {/* <h3>Let's Get Started</h3> */}
                            <p>
                                Let us know the best way to contact you with
                                helpful information and potential college or
                                university matches.
                            </p>
                        </div>
                        <Form user={user} id="2" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default CarouselWithForm;
