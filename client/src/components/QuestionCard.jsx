function QuestionCard({ question, currentQuestionIndex, totalQuestions }) {
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    
    return (
        <>
            <p>
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            <h3>{question}</h3>
        </>
    );
}

export default QuestionCard;