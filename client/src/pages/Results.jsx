import { useLocation, useNavigate } from "react-router-dom";

function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const results = location.state || {
        score: 0,
        totalQuestions: 0,
    };

    const percentage = 
        results.totalQuestions > 0
        ? Math.round((results.score / results.totalQuestions) * 100)
        : 0;

    let title = "";

    if(percentage === 100) {
        title = "Universal Intellect!"
    } else if (percentage >= 70) {
        title = "Just a scratch"
    } else if (percentage >= 40) {
        title = "Shoo something stinks..."
    } else {
        title = "Total Failure";
    }

    let message = "";

    if (percentage === 100) {
        message = "Didn't miss one? Alright Bill Nye"
    } else if (percentage >= 70) {
        message = "Dang you were almost a gene-e-us"
    } else if (percentage >= 40) {
        message = "Yikes, Sally did better and she's 7"
    } else {
        message = "Quick! Somebody! Help! Their brain... ITS MISSING"
    }

    return (
        <div className="page"> 
            <div className="card">
                <h2>{title}</h2>

                <p>
                    Dang! {results.score} out of {results.totalQuestions}
                </p>

                <p>{percentage}%</p>

                <p>{message}</p>

                <button onClick={() => navigate("/setup")}>
                    Play Again
                </button>

                <button onClick={() => navigate("/")}>
                    Home
                </button>
            </div>
        </div>
    );
}

export default Results;