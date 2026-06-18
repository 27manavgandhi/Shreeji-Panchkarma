"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const CHAPTERS = [
  { id: "hero", label: "Roots" },
  { id: "story", label: "Origin" },
  { id: "philosophy", label: "Wisdom" },
  { id: "treatments", label: "Healing" },
  { id: "products", label: "Gifts" },
  { id: "testimonials", label: "Stories" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeChapter, setActiveChapter] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docH;
      setActiveChapter(
        Math.min(Math.floor(progress * CHAPTERS.length), CHAPTERS.length - 1)
      );
      // Switch dot color based on background section
      const philosophy = document.getElementById("philosophy");
      if (philosophy) {
        const rect = philosophy.getBoundingClientRect();
        setIsDark(rect.top > window.innerHeight || rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top gold progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] pointer-events-none"
        style={{ scaleX, backgroundColor: "#C9A84C" }}
      />

      {/* Chapter indicator — right side, always visible */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-3 items-end">
        {CHAPTERS.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => {
              document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2.5 cursor-pointer"
            aria-label={`Go to ${ch.label}`}
          >
            {/* Label — always visible, styled */}
            <span
              className="text-[11px] font-raleway font-600 tracking-wider uppercase
                px-2.5 py-1 rounded-lg transition-all duration-300
                shadow-sm border"
              style={{
                backgroundColor: activeChapter === i
                  ? "rgba(201,168,76,0.95)"
                  : "rgba(27,67,50,0.85)",
                color: activeChapter === i ? "#1A2E1A" : "rgba(255,255,255,0.9)",
                borderColor: activeChapter === i
                  ? "rgba(201,168,76,0.5)"
                  : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {ch.label}
            </span>
            {/* Dot */}
            <motion.div
              animate={{
                width: activeChapter === i ? 20 : 6,
                height: activeChapter === i ? 6 : 6,
                backgroundColor:
                  activeChapter === i ? "#C9A84C" : "rgba(255,255,255,0.5)",
                boxShadow:
                  activeChapter === i
                    ? "0 0 8px rgba(201,168,76,0.6)"
                    : "none",
              }}
              transition={{ duration: 0.25 }}
              className="rounded-full flex-shrink-0"
            />
          </button>
        ))}
      </div>
    </>
  );
}
