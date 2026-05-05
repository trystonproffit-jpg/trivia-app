import { useLocation, useNavigate } from "react-router-dom";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const results = location.state || {
        score: 0,
        totalQuestions: 0,
    };

    const percentage = Math.round((results.score / results.totalQuestions) * 100);

    return (
        <div>
            <h2>Results</h2>

            <p>
                Dang! {results.score} out of {results.totalQuestions}
            </p>

            <p>{percentage}%</p>

            <button onClick={() => navigate("/setup")}>
                Play Again
            </button>
        </div>
    );
}

export default Results;