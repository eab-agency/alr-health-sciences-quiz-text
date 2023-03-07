import NavBar from './NavBar';

export default function QuizLayout({ children }) {
    return (
        <div className="page-layout">
            <NavBar />
            <div className="page-layout__container">
                <div className="page-layout__content">{children}</div>
            </div>
        </div>
    );
}
