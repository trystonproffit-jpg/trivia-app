import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTriviaQuestions } from "../services/api";
import AnswerButton from "../components/AnswerButton";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import QuestionCard from "../components/QuestionCard";
import HomeButton from "../components/HomeButton";
import TimerBar from "../components/TimerBar";
import { motion } from "framer-motion";

// Creates a shuffled copy of an array so the correct answer is not always first
function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

// Converts Open Trivia DB category IDs into readable category names
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

// Converts API difficulty values into the custom app difficulty labels
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

    // Quiz settings come from the setup page.
    // Defaults are used if someone visits /quiz directly.
    const quizSettings = location.state || {
        amount: 10,
        category: "9",
        difficulty: "easy",
        timerEnabled: false,
        timerLength: 20,
    };

    const timerEnabled = quizSettings.timerEnabled;
    const timerLength = quizSettings.timerLength;

    // Main quiz state
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Current question / answer state
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerResult, setAnswerResult] = useState("");
    const [timeRanOut, setTimeRanOut] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // Timer state
    const [timeLeft, setTimeLeft] = useState(timerLength);

    // Fetch trivia questions when the quiz page first loads
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

    // Shuffle the answer choices whenever a new question loads
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

    // Countdown timer logic
    // Stops if timer is disabled, the user answered, or the page is loading/erroring.
    useEffect(() => {
        if (!timerEnabled || selectedAnswer || loading || error) {
            return;
        }

        // When time runs out, lock the question and show timeout feedback
        if (timeLeft <= 0) {
            setSelectedAnswer("Time ran out");
            setTimeRanOut(true);
            setAnswerResult("Time's up! The hourglass goblin has judged you.");
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Cleanup prevents multiple timers from stacking up
        return () => clearTimeout(timer);
    }, [timeLeft, timerEnabled, selectedAnswer, loading, error]);

    // Render loading, error, or empty states before trying to display quiz data
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (questions.length === 0) {
        return <ErrorMessage message="No inquiries located in the portal." />;
    }

    // Derived values for the current quiz screen
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const categoryName = getCategoryName(quizSettings.category);
    const difficultyName = getDifficultyName(quizSettings.difficulty);

    // Handles answer selection, score updates, and feedback text
    function handleAnswerClick(answer) {
        // Prevents users from answering the same question more than once
        if (selectedAnswer) {
            return;
        }
        
        setSelectedAnswer(answer);

        if (answer === currentQuestion.correct_answer) {
            setAnswerResult("Correct! The wizard nods approvingly.");
            setScore(score + 1);
        } else {
            setAnswerResult(
                `Wrong! The wizard lashes out... The correct answer was ${currentQuestion.correct_answer}.`
            );
        }
    }

    // Moves to the next question or sends the user to the results page
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
            setTimeRanOut(false);
            setTimeLeft(timerLength);
        }
    }

    return (
        <div className="page">
            <div className="card scroll-card quiz-card">
                <h2>Mysterious Question Portal</h2>

                <p className="quiz-meta">
                    {categoryName} | {difficultyName}
                </p>

                <p className="score-badge">Score: {score}</p>
                
                {timerEnabled && (
                    <TimerBar
                        timeLeft={timeLeft}
                        timerLength={timerLength}
                        isRunning={timerEnabled && !selectedAnswer}
                        timerKey={currentQuestionIndex}
                    />
                )}

                <QuestionCard
                    question={currentQuestion.question}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                />

                <motion.div
                    className="answer-list"
                    key={currentQuestionIndex}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.18,
                            },
                        },
                    }}
                >
                    {shuffledAnswers.map((answer) => {
                        let buttonText = answer;
                        let status = "";

                        // After an answer is chosen, visually mark correct/wrong answers
                        if (selectedAnswer) {
                            if (answer === currentQuestion.correct_answer) {
                                buttonText = `${answer} ✅`;
                                status = "correct-answer";
                            } else if (answer === selectedAnswer && !timeRanOut) {
                                buttonText = `${answer} ❌`;
                                status = "wrong-answer";
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
                </motion.div>

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