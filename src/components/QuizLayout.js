import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/context';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function QuizLayout({ children }) {
    const { setUtmSource, utmSource } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (router.query.utm_source) {
            setUtmSource(router.query.utm_source);
        }
    }, [router.query.utm_source, setUtmSource]);
    return (
        <>
            <PageHeader pageType="quiz" />
            <main className="short quiz-layout">
                <div className="content-wrapper">
                    <div className="quiz-layout__content">{children}</div>
                </div>
            </main>
            <PageFooter />
        </>
    );
}
