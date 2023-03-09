import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default function QuizLayout({ children }) {
    return (
        <>
            <PageHeader pageType="quiz" />
            <div className="quiz-layout">
                <div className="quiz-layout__container">
                    <div className="quiz-layout__content">{children}</div>
                </div>
            </div>
            <PageFooter />
        </>
    );
}
