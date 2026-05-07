function TimerBar({ timeLeft, timerLength }) {
    const timerPercentage = (timeLeft / timerLength) * 100;

    return (
        <div className="timer-section">
            <p className="timer-label">
                Curse Timer: {timeLeft}s
            </p>

            <div className="timer-bar">
                <div
                    className="timer-fill"
                    style={{ width: `${timerPercentage}%` }}
                ></div>
            </div>
        </div>
    );
}

export default TimerBar;