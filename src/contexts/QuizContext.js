import { createContext, useReducer, useEffect } from "react";
import quizData from "../data/quizData.json";

const QuizContext = createContext();

function shuffleAnswers(answers) {
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    return shuffledAnswers;
}

const quizReducer = (state, action) => {
    switch (action.type) {
        case "SET_QUESTIONS":
            return {
                ...state,
                questions: action.payload,
            };
        case "ANSWER_QUESTION":
            const newScore = { ...state.score };
            newScore[action.payload.personality] += action.payload.weight;
            const quizEnded = state.currentQuestion === state.questions.length - 1;
            const result =
                quizEnded &&
                Object.keys(newScore).reduce(
                    (a, b) => (newScore[a] > newScore[b] ? a : b)
                );
            return {
                ...state,
                score: newScore,
                currentQuestion: quizEnded ? state.currentQuestion : state.currentQuestion + 1,
                quizEnded: quizEnded,
                result: result || "",
            };
        case "RESET_QUIZ":
            const shuffledQuestions = state.questions.map((question) => {
                const shuffledAnswers = shuffleAnswers(question.answers);
                return {
                    ...question,
                    answers: shuffledAnswers,
                };
            });
            return {
                questions: shuffledQuestions,
                currentQuestion: 0,
                 score: {
    "executive": 0,
    "practitioner": 0,
    "educator": 0,
    "scientist": 0,
    "analyst": 0
},
                quizEnded: false,
                result: "",
            };
        default:
            return state;
    }
};

const initialState = {
    currentQuestion: 0,
    score: {
    "executive": 0,
    "practitioner": 0,
    "educator": 0,
    "scientist": 0,
    "analyst": 0
},
    quizEnded: false,
    result: "",
    questions: [],
    isTie: false,
};


const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

useEffect(() => {
            dispatch({ type: "SET_QUESTIONS", payload: quizData.questions });
    }, []);

    return (
        <QuizContext.Provider value={[state, dispatch]}>
            {children}
        </QuizContext.Provider>
    );
};

export { QuizContext, QuizProvider };
