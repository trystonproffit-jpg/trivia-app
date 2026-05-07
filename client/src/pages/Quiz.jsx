import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTriviaQuestions } from "../services/api";
import AnswerButton from "../components/AnswerButton";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import QuestionCard from "../components/QuestionCard";
import HomeButton from "../components/HomeButton";
import TimerBar from "../components/TimerBar";

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function getCategoryName(categoryId) {
    const categories = {
        "9": "General Knowledge",
        "11": "Film",
        "12": "Music",
        "17": "Science",
        "21": "Sports",
        "23": "History",
    };

    return categories[categoryId] || "Trivia";
}

function getDifficultyName(difficulty) {
    const difficultyNames = {
        easy: "Light Work",
        medium: "Average",
        hard: "Extreme",
    };

    return difficultyNames[difficulty] || "Unknown Difficulty";
}

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();

    const quizSettings =location.state || {
        amount: 10,
        category: "9",
        difficulty: "easy",
        timerEnabled: false,
        timerLength: 20,
    };

    const timerEnabled = quizSettings.timerEnabled;
    const timerLength = quizSettings.timerLength;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(timerLength);

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

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];

            const answers = shuffleArray([
                currentQuestion.correct_answer,
                ...currentQuestion.incorrect_answers,
            ]);
            
            setShuffledAnswers(answers);
        }
    }, [questions, currentQuestionIndex]);

    useEffect(() => {
        if (!timerEnabled || selectedAnswer || loading || error) {
            return;
        }

        if (timeLeft <= 0) {
            setSelectedAnswer("Time ran out");
            setAnswerResult("Time's up! The hourglass goblin has judged you.");
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, timerEnabled, selectedAnswer, loading, error]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (questions.length === 0) {
        return <ErrorMessage message="No inquiries located in the portal." />
    }

    const currentQuestion = questions[currentQuestionIndex];

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const categoryName = getCategoryName(quizSettings.category);

    const difficultyName = getDifficultyName(quizSettings.difficulty);

    function handleAnswerClick(answer) {
        if (selectedAnswer) {
            return;
        }
        
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correct_answer) {
            setAnswerResult("Correct! The wizard nods approvingly.");
            setScore(score + 1);
        } else {
            setAnswerResult(`Wrong! The wizard lashes out... The correct answer was ${currentQuestion.correct_answer}.`);
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
                setTimeLeft(timerLength);
            }
    }

    return (
        <div className="page">
            <div className="card">
                <h2>Mysterious Question Portal</h2>

                <p className="quiz-meta">
                    {categoryName} | {difficultyName}
                </p>

                <p className="score-badge">Score: {score}</p>
                
                {timerEnabled && (
                    <TimerBar
                        timeLeft={timeLeft}
                        timerLength={timerLength}
                    />
                )}

                <QuestionCard
                    question={currentQuestion.question}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                />

                <div className="answer-list">
                    {shuffledAnswers.map((answer) => {
                        let buttonText = answer;
                        let status = "";

                        if (selectedAnswer) {
                            if (answer === currentQuestion.correct_answer) {
                                buttonText = `${answer} ✅`;
                                status = "correct-answer";
                            } else if (answer === selectedAnswer) {
                                buttonText = `${answer} ❌`;
                                status = "wrong-answer"
                            }
                        }

                        return (
                            <AnswerButton
                                key={answer}
                                buttonText={buttonText}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={selectedAnswer}
                                status={status}
                            />
                    );
                })}
            </div>

                {selectedAnswer && (
                        <p className="selected-answer">
                            Your offering to the portal: {selectedAnswer}
                        </p>
                    )}

                {answerResult && (
                    <p className="feedback">{answerResult}</p>
                )}

                {selectedAnswer && (
                    <button onClick={handleNextQuestion}>
                        {isLastQuestion ? "Reveal My Fate" : "Draw Next Scroll"}
                    </button>
                )}

                <HomeButton />

            </div>
        </div>
    );
}

export default Quiz;