function AnswerButton({ buttonText, onClick, disabled, status }) {
    const buttonClass = status
        ? `answer-button ${status}`
        : "answer-button";
    
    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}

export default AnswerButton;