import { motion } from "framer-motion";

// Floating magical particles layered over the real portal image
const particles = [
    { left: "12%", top: "72%", delay: 0, duration: 7.2, size: 6 },
    { left: "20%", top: "58%", delay: 1.3, duration: 6.5, size: 8 },
    { left: "28%", top: "76%", delay: 2.1, duration: 7.8, size: 7 },
    { left: "38%", top: "64%", delay: 0.7, duration: 6.9, size: 6 },
    { left: "49%", top: "70%", delay: 1.8, duration: 7.4, size: 9 },
    { left: "58%", top: "62%", delay: 2.5, duration: 6.8, size: 7 },
    { left: "68%", top: "74%", delay: 0.9, duration: 7.6, size: 8 },
    { left: "78%", top: "60%", delay: 2.9, duration: 6.7, size: 6 },
    { left: "86%", top: "72%", delay: 1.5, duration: 7.1, size: 7 },
];

function PortalBackground() {
    return (
        <div className="portal-background">
            <div className="portal-vignette"></div>

            <motion.div
                className="portal-glow-overlay"
                animate={{
                    opacity: [0.35, 0.6, 0.35],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="portal-mist-overlay"
                animate={{
                    x: [0, 22, -14, 0],
                    y: [0, 10, 4, 0],
                    opacity: [0.16, 0.3, 0.16],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="portal-particle-layer">
                {particles.map((particle, index) => (
                    <motion.span
                        key={index}
                        className="portal-particle"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -110],
                            x: [0, index % 2 === 0 ? 18 : -18],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.1, 0.35],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default PortalBackground;