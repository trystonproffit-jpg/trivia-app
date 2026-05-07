import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="card scroll-card home-card">
                <h1>Trials of Trivia!</h1>

                <p>
                    Step inside, choose your trial, and test your wisdom against the enchanted scrolls!
                </p>
                
                <button onClick={() => navigate("/setup")}>
                    Enter the Tavern
                </button>
            </div>
        </div>
    );
}

export default Home;