export default function QuizLayout({ children }) {
    return (
        <div className="quiz-layout">
            <div className="quiz-layout__container">
                <div className="quiz-layout__content">{children}</div>
            </div>
        </div>
    );
}
