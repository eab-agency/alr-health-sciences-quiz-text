import React from 'react';

function ResetQuizButton({ onClick }) {
    return (
        <button type="button" onClick={onClick}>
            Retake Quiz
        </button>
    );
}

export default ResetQuizButton;
