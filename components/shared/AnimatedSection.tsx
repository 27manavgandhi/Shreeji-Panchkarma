"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  const directionVariants = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...directionVariants[direction] };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

// Stagger children wrapper
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const prefersReducedMotion = useReducedMotion();

  const dirMap = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
  };

  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, ...dirMap[direction] },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
