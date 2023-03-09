// import NavBar from './NavBar';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function PageLayout({ children }) {
    return (
        <>
            <div className="page-layout">
                <PageHeader pageType="results" />
                <div className="page-layout__container">
                    <div className="page-layout__content">{children}</div>
                </div>
            </div>
            <PageFooter />
        </>
    );
}
