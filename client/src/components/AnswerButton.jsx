function AnswerButton({ answer, buttonText, onClick, disabled }) {
    return (
        <button
            className="answer-button"
            onClick={onClick}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}

export default AnswerButton;