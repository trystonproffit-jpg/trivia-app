import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="home-button"
            onClick={() => navigate("/")}
        >
            Return to Tavern
        </button>
    );
}

export default HomeButton