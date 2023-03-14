import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function QuizLayout({ children }) {
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
