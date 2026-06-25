"use client";

import { motion } from "motion/react";

const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const variants = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 },
    scale: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
