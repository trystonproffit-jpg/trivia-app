import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Setup() {
    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState("9");
    const [difficulty, setDifficulty] = useState("easy");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
            
        navigate("/quiz", {
            state: {
                amount,
                category,
                difficulty,
            },
        })
    }
    return (
        <div className="page">
            <div className="card">
                <h2>Pick Your Poison</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Number of Questions:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>
                    
                    <label>
                        Category:
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="9">General</option>
                            <option value="11">Films</option>
                            <option value="12">Music</option>
                            <option value="17">Science</option>
                            <option value="21">Sports</option>
                            <option value="23">History</option>
                        </select>
                    </label>
                    
                    <label>
                        Difficulty:
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="easy">Light Work</option>
                            <option value="medium">Average</option>
                            <option value="hard">Extreme</option>
                        </select>
                    </label>

                    <button type="submit">Start er' up!</button>
                </form>
            </div>
        </div>
    )
}

export default Setup;