import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTriviaQuestions } from "../services/api";

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();

    const quizSettings =location.state || {
        amount: 10,
        category: "9",
        difficulty: "easy",
    };

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        fetchTriviaQuestions(quizSettings)
            .then((data) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Loading questions...</h2>
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (questions.length === 0) {
        return <h2>No questions found.</h2>
    }

    const currentQuestion = questions[currentQuestionIndex];

    const answers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
    ];

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    function handleAnswerClick(answer) {
        if (selectedAnswer) {
            return;
        }
        
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correct_answer) {
            setAnswerResult("Correct!");
            setScore(score + 1);
        } else {
            setAnswerResult("Wrong!");
        }
    }

    function handleNextQuestion() {
            if (isLastQuestion) {
                navigate("/results", {
                    state: {
                        score,
                        totalQuestions: questions.length,
                    },
                });
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setSelectedAnswer("");
                setAnswerResult("");
            }
    }

    return (
        <div>
            <h2>Quiz Page</h2>

            <p>Questions loaded: {questions.length}</p>
            <p>Score: {score}</p>
            
            <p>
                Question {currentQuestionIndex + 1} of {questions.length}
            </p>

            <h3>{currentQuestion.question}</h3>

            {answers.map((answer) => (
                <button 
                    key={answer}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={selectedAnswer}
                >
                    {answer}
                </button>
            ))}

            {selectedAnswer && (
                    <p>You selected: {selectedAnswer}</p>
                )}

            {answerResult && (
                <p>{answerResult}</p>
            )}

            {selectedAnswer && (
                <button onClick={handleNextQuestion}>
                    {isLastQuestion ? "See Results" : "Next Question"}
                </button>
            )}

        </div>
    );
}

export default Quiz;