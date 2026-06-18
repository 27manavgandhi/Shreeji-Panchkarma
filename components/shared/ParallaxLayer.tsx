"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = direction === "up" ? -speed * 100 : speed * 100;

  const rawY = useTransform(scrollYProgress, [0, 1], [0, factor]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
