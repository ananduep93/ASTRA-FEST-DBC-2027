import React from "react";
import { motion, useReducedMotion } from "motion/react";

// Refined editorial bezier curves
export const EASE_EDITORIAL = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH = [0.22, 1, 0.36, 1];

/**
 * Reveal: Viewport-triggered scroll reveal wrapper
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  className = "",
  amount = 0.2,
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40 };
      case "down":
        return { opacity: 0, y: -40 };
      case "left":
        return { opacity: 0, x: 40 };
      case "right":
        return { opacity: 0, x: -40 };
      case "scale":
        return { opacity: 0, scale: 0.92 };
      case "clip":
        return {
          opacity: 0,
          clipPath: "inset(0% 100% 0% 0%)",
        };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getAnimatePosition = () => {
    if (direction === "clip") {
      return {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration, delay, ease: EASE_EDITORIAL },
      };
    }
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: EASE_EDITORIAL },
    };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer: Parent container for sequential children reveals
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.05,
  className = "",
  amount = 0.15,
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem: Child element inside StaggerContainer
 */
export function StaggerItem({
  children,
  className = "",
  distance = 35,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: distance,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: EASE_EDITORIAL,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
