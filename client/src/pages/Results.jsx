import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
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

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, percentage, {
            duration: 1.2,
            ease: "easeOut",
        });

        return () => controls.stop();
    }, [percentage]);

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

    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 30,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="page">
            <motion.div
                className="card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 variants={itemVariants}>
                    {title}
                </motion.h2>

                <motion.p className="result-score" variants={itemVariants}>
                    Dang! {results.score} out of {results.totalQuestions}
                </motion.p>

                <motion.p className="result-percentage" variants={itemVariants}>
                    <motion.span>{rounded}</motion.span>%
                </motion.p>

                <motion.p className="result-message" variants={itemVariants}>
                    {message}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <button onClick={() => navigate("/setup")}>
                        Play Again
                    </button>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <HomeButton />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Results;