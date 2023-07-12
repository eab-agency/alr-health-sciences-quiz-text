import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/context';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function PageLayout({ children }) {
    const { setUtmSource } = useUser();
    const router = useRouter();

    const [resultsPage, setResultsPage] = useState(false);

    const { pathname } = router;

    useEffect(() => {
        if (pathname === '/') {
            setResultsPage(false);
        } else {
            setResultsPage(true);
        }
    }, [pathname]);

    useEffect(() => {
        if (router.query.utm_source) {
            setUtmSource(router.query.utm_source);
        }
    }, [router.query.utm_source, setUtmSource]);
    return (
        <>
            <div className="page-layout">
                {resultsPage && <PageHeader pageType="results" />}
                <main className="page-layout__container">
                    <div className="page-layout__content">{children}</div>
                </main>
            </div>
            {resultsPage && <PageFooter />}
        </>
    );
}
