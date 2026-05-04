import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Try Your Trivia!</h1>
            <p>Test your knowledge with fun trivia questions!</p>
            <button onClick={() => navigate("/setup")}>
                Begin
            </button>
        </div>
    );
}

export default Home;