import { motion } from "framer-motion";

function AnswerButton({ buttonText, onClick, disabled, status }) {
    const buttonClass = status
        ? `answer-button ${status}`
        : "answer-button";

    const entranceVariants = {
        hidden: {
            opacity: 0,
            y: 35,
            scale: 0.92,
            rotateX: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const feedbackAnimation =
        status === "correct-answer"
            ? {
                scale: [1, 1.06, 1],
            }
            : status === "wrong-answer"
                ? {
                    x: [0, -10, 10, -7, 7, 0],
                }
                : {};

    return (
        <motion.div variants={entranceVariants}>
            <motion.button
                className={buttonClass}
                onClick={onClick}
                disabled={disabled}
                animate={feedbackAnimation}
                transition={{
                    duration: status === "wrong-answer" ? 0.35 : 0.6,
                }}
                whileHover={
                    !disabled
                        ? {
                            scale: 1.04,
                            x: 6,
                            boxShadow: "0 0 22px rgba(214, 168, 79, 0.45)",
                        }
                        : {}
                }
                whileTap={
                    !disabled
                        ? {
                            scale: 0.96,
                        }
                        : {}
                }
            >
                {buttonText}
            </motion.button>
        </motion.div>
    );
}

export default AnswerButton;