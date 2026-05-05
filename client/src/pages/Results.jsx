import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";

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
    let message = "";

    if (percentage === 100) {
        title = "Legendary Sage!";
        message = "The tavern falls silent. Even the dragon in the corner is impressed.";
    } else if (percentage >= 90) {
        title = "Dragon-Minded Scholar!";
        message = "A near-perfect run. The wizard pretends not to be jealous.";
    } else if (percentage >= 75) {
        title = "Tavern Champion!";
        message = "The bard is already writing a suspiciously inaccurate song about you.";
    } else if (percentage >= 60) {
        title = "Scroll Apprentice!";
        message = "Respectable work. The scroll only mildly judged you.";
    } else if (percentage >= 40) {
        title = "Goblin Negotiator!";
        message = "Not amazing, not cursed. The goblins are willing to hear you out.";
    } else if (percentage >= 20) {
        title = "Confused Squire!";
        message = "You fought bravely, mostly against the question's wording.";
    } else {
        title = "Cursed by the Quiz Gremlin!";
        message = "The scroll was upside down. Probably.";
    }

    return (
        <div className="page"> 
            <div className="card">
                <h2>{title}</h2>

                <p className="result-score">
                    Dang! {results.score} out of {results.totalQuestions}
                </p>

                <p className="result-percentage">{percentage}%</p>

                <p className="result-message">{message}</p>

                <button onClick={() => navigate("/setup")}>
                    Play Again
                </button>

                <HomeButton />
            </div>
        </div>
    );
}

export default Results;