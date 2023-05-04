import { useState } from 'react';
import SchoolCarousel from '@/components/SchoolCarousel';
import Form from '@/components/Form';
import { useUser } from '@/context/context';

const CarouselWithForm = () => {
    const [visibleForm, setVisibleForm] = useState(false);
    const { matchedSchools, user } = useUser();

    const onCarouselClick = () => {
        setVisibleForm(!visibleForm);
    };
    return (
        <>
            {!visibleForm && (
                <SchoolCarousel
                    schools={matchedSchools}
                    handleClick={() => onCarouselClick()}
                />
            )}

            {visibleForm && (
                <>
                    <button type="button" onClick={() => onCarouselClick()}>
                        X
                    </button>
                    <Form user={user} id="2" />
                </>
            )}
        </>
    );
};

export default CarouselWithForm;
