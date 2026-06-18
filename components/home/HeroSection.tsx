"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Clock, Users } from "lucide-react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; opacityDir: number; phase: number;
}

const WORDS = ["Where", "Ancient", "Ayurveda", "Meets", "Your", "Modern", "Life"];
const BADGES = [
  { icon: Shield, label: "AYUSH Certified" },
  { icon: Clock, label: "Est. 2009" },
  { icon: Users, label: "10,000+ Patients" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [mounted, setMounted] = useState(false);

  // Canvas particles
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.15),
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.45 + 0.15,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
    }));

    let tick = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(tick * 0.008 + p.phase) * 0.12;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.002;
        if (p.opacity > 0.65 || p.opacity < 0.1) p.opacityDir *= -1;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  // 3D tilt — desktop only
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(((e.clientY - cy) / cy) * -10);
    mouseY.set(((e.clientX - cx) / cx) * 10);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const wordVariants = {
    hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 55%, #40916C 100%)" }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Botanical BG */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none z-0 flex items-center justify-end" aria-hidden="true">
        <svg viewBox="0 0 500 600" className="w-64 h-80 md:w-96 md:h-[500px] mr-0" fill="white">
          <path d="M250 50 Q370 150 340 300 Q310 450 180 480 Q50 510 40 360 Q30 210 250 50Z" />
          <path d="M250 50 Q430 120 410 290 Q390 440 240 470 Q90 500 100 340 Q110 180 250 50Z" opacity="0.5" />
          <ellipse cx="250" cy="300" rx="120" ry="160" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="250" cy="300" rx="170" ry="210" fill="none" stroke="white" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </div>

      <div className="container-custom relative z-10 w-full pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

          {/* ── LEFT content ── */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Pre-headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-5"
            >
              <div className="h-px w-6 bg-accent/60" />
              <span className="text-accent font-raleway font-500 text-xs tracking-[0.2em] uppercase">
                Est. 2009 · Sonipat, Haryana
              </span>
              <div className="h-px w-6 bg-accent/60 hidden lg:block" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } }}
              className="font-cormorant font-700 text-white mb-5 leading-[1.08]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block mr-[0.2em] will-change-transform"
                  style={word === "Ayurveda" ? { color: "#F4D98C" } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="font-raleway text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}
            >
              Authentic Panchkarma treatments and Ayurvedic wellness products,
              trusted by 10,000+ patients across Delhi NCR and Haryana for over 15 years.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-8 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-soft text-forest px-7 py-4 rounded-full font-raleway font-600 text-sm transition-all duration-300 shadow-gold-glow cursor-pointer"
              >
                Book a Consultation
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/treatments"
                className="group inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/12 px-7 py-4 rounded-full font-raleway font-500 text-sm transition-all duration-300 cursor-pointer"
              >
                Explore Treatments
                <ArrowRight size={15} className="opacity-60 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.5 }}
              className="flex flex-wrap gap-2.5 justify-center lg:justify-start"
            >
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
                >
                  <Icon size={13} className="text-accent flex-shrink-0" />
                  <span className="text-white/80 text-xs font-raleway font-500">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT visual ── */}
          <motion.div
            ref={orbRef}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ rotateX: springX, rotateY: springY, perspective: 900 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-center will-change-transform"
          >
            <div className="relative w-72 h-72 xl:w-80 xl:h-80">
              {/* Spinning rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute inset-5 rounded-full border border-accent/20"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 rounded-full border border-white/8"
              />

              {/* Center orb */}
              <div
                className="absolute inset-12 rounded-full flex flex-col items-center justify-center text-center p-5"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 0 60px rgba(201,168,76,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Logo mark in center */}
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="mb-2">
                  {[0,45,90,135,180,225,270,315].map((a, i) => {
                    const r = (a*Math.PI)/180;
                    const cx = 24+10*Math.sin(r), cy = 24-10*Math.cos(r);
                    return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="7"
                      fill="rgba(201,168,76,0.25)" stroke="rgba(201,168,76,0.6)" strokeWidth="0.75"
                      transform={`rotate(${a} ${cx} ${cy})`}/>;
                  })}
                  <circle cx="24" cy="24" r="4" fill="#C9A84C" opacity="0.9"/>
                  <circle cx="24" cy="24" r="2" fill="rgba(27,67,50,0.9)"/>
                </svg>
                <p className="font-cormorant font-600 text-white text-lg leading-tight">
                  Authentic Ayurveda
                </p>
                <p className="font-raleway text-white/50 text-xs mt-1">Since 2009</p>
              </div>

              {/* Floating availability card */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-4 bg-white rounded-2xl shadow-float px-4 py-3 flex items-center gap-2.5"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-[stock-pulse_2s_ease_infinite]" />
                <div>
                  <p className="text-xs font-600 text-forest font-raleway leading-none">Next Available</p>
                  <p className="text-xs text-forest-muted font-raleway mt-0.5">Today · 10:00 AM</p>
                </div>
              </motion.div>

              {/* Stats card */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -top-2 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-float px-4 py-3"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
              >
                <p className="text-xl font-700 font-cormorant text-primary leading-none">10,000+</p>
                <p className="text-xs text-forest-muted font-raleway mt-0.5">Patients Healed</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
          onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to next section"
        >
          <span className="text-white/35 text-[10px] font-raleway tracking-widest uppercase group-hover:text-white/60 transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-white/35 group-hover:text-white/60 transition-colors" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
