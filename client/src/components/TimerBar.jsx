import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

function TimerBar({ timeLeft, timerLength, isRunning, timerKey }) {
    const controls = useAnimationControls();

    useEffect(() => {
        controls.set({ scaleX: 1 });

        if (isRunning) {
            controls.start({
                scaleX: 0,
                transition: {
                    duration: timerLength,
                    ease: "linear",
                },
            });
        }
    }, [timerKey, timerLength]);

    useEffect(() => {
        if (!isRunning) {
            controls.stop();
        }
    }, [isRunning]);

    return (
        <div className="timer-section">
            <p className="timer-label">
                Curse Timer: {timeLeft}s
            </p>

            <div className="timer-bar">
                <motion.div
                    className="timer-fill"
                    animate={controls}
                ></motion.div>
            </div>
        </div>
    );
}

export default TimerBar;