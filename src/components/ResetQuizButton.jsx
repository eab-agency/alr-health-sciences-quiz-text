import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdOutlineRefresh } from 'react-icons/md';

function ResetQuizButton({ onClick }) {
    return (
        <button
            className="button btn-secondary"
            type="button"
            onClick={onClick}
        >
            Retake Quiz
            <i>
                <MdOutlineRefresh />
            </i>
        </button>
    );
}

export default ResetQuizButton;
