import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="card">
                <h1>Try Your Trivia!</h1>

                <p>
                    Let's find out if you're as smart as you think you are!
                </p>
                
                <button onClick={() => navigate("/setup")}>
                    Commence
                </button>
            </div>
        </div>
    );
}

export default Home;