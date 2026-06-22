"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  CheckCircle, XCircle, Clock, IndianRupee, ArrowRight,
  Leaf, Shield, Star, Users, ChevronDown, Play, Sparkles,
  Heart, Brain, Activity, PersonStanding, Scale, Phone
} from "lucide-react";
import { getTreatmentBySlug, treatments } from "@/lib/treatments";
import { notFound } from "next/navigation";

// ── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Leaf, Scale, Brain, Sparkles, PersonStanding, Activity, Heart, Shield,
};

// ── Treatment accent colors ─────────────────────────────────────────────────
const TREATMENT_THEMES: Record<string, { from: string; to: string; accent: string; light: string }> = {
  "panchakarma":     { from: "#1B4332", to: "#2D6A4F", accent: "#C9A84C", light: "#F0F9F4" },
  "weight-loss":     { from: "#065F46", to: "#047857", accent: "#34D399", light: "#ECFDF5" },
  "stress-relief":   { from: "#1E3A5F", to: "#1D4ED8", accent: "#93C5FD", light: "#EFF6FF" },
  "skin-treatment":  { from: "#78350F", to: "#B45309", accent: "#FCD34D", light: "#FFFBEB" },
  "janu-basti":      { from: "#1B4332", to: "#065F46", accent: "#6EE7B7", light: "#F0FDF4" },
  "kati-basti":      { from: "#312E81", to: "#4F46E5", accent: "#A5B4FC", light: "#EEF2FF" },
};

// ── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-cormorant font-700 text-3xl md:text-4xl text-white mb-1">{value}</div>
      <div className="font-raleway text-white/55 text-xs uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

// ── Floating herb particle ──────────────────────────────────────────────────
function HerbParticle({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-white/10"
      style={{ left: x, fontSize: size, bottom: -20 }}
      animate={{ y: [0, -400], opacity: [0, 0.15, 0] }}
      transition={{ duration: 8 + delay, delay, repeat: Infinity, ease: "linear" }}
    >
      🌿
    </motion.div>
  );
}

// ── Process step with animated connector ────────────────────────────────────
function ProcessStep({
  step, title, desc, accent, isLast
}: {
  step: number; title: string; desc: string; accent: string; isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: step * 0.15 }}
      className="flex gap-6 relative"
    >
      {/* Step indicator */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: step * 0.15 + 0.2 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-cormorant font-700 text-xl text-white shadow-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}99, ${accent})` }}
        >
          {step}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: step * 0.15 + 0.4 }}
            className="w-0.5 flex-1 mt-3 origin-top"
            style={{ background: `linear-gradient(to bottom, ${accent}60, transparent)`, minHeight: 48 }}
          />
        )}
      </div>
      {/* Content */}
      <div className="pb-10 flex-1">
        <div
          className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg cursor-default"
          style={{ background: `${accent}08`, borderColor: `${accent}25` }}
        >
          <h3 className="font-cormorant font-600 text-forest text-xl mb-2">{title}</h3>
          <p className="font-raleway text-forest-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Benefit card ────────────────────────────────────────────────────────────
function BenefitCard({ benefit, index, accent }: { benefit: string; index: number; accent: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-current transition-all duration-200 group cursor-default"
      style={{ ["--benefit-accent" as string]: accent }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200"
        style={{ background: `${accent}18` }}
      >
        <CheckCircle size={16} style={{ color: accent }} />
      </div>
      <p className="font-raleway text-forest-muted text-sm leading-relaxed">{benefit}</p>
    </motion.div>
  );
}

// ── Sanskrit floating text ──────────────────────────────────────────────────
const SANSKRIT_BY_TREATMENT: Record<string, string> = {
  "panchakarma":   "पञ्चकर्म — पाँच क्रियाएँ",
  "weight-loss":   "मेदोवह स्रोतस्",
  "stress-relief": "शिरोधारा — मस्तिष्क शान्ति",
  "skin-treatment":"रक्त शोधन",
  "janu-basti":    "जानु बस्ति — जोड़ पोषण",
  "kati-basti":    "कटि बस्ति — कमर चिकित्सा",
};

// ── Stats by treatment ──────────────────────────────────────────────────────
const STATS_BY_TREATMENT: Record<string, { value: string; label: string }[]> = {
  "panchakarma":     [{ value: "7–21", label: "Days Programme" }, { value: "5", label: "Core Procedures" }, { value: "92%", label: "Patient Improvement" }],
  "weight-loss":     [{ value: "21–90", label: "Days Programme" }, { value: "15–20kg", label: "Avg. Weight Loss" }, { value: "89%", label: "Long-term Success" }],
  "stress-relief":   [{ value: "1–7", label: "Sessions Needed" }, { value: "45min", label: "Per Session" }, { value: "96%", label: "Stress Reduction" }],
  "skin-treatment":  [{ value: "14–28", label: "Days Programme" }, { value: "8+", label: "Conditions Treated" }, { value: "88%", label: "Visible Improvement" }],
  "janu-basti":      [{ value: "7–14", label: "Sessions" }, { value: "40min", label: "Per Session" }, { value: "91%", label: "Pain Reduction" }],
  "kati-basti":      [{ value: "7–14", label: "Sessions" }, { value: "45min", label: "Per Session" }, { value: "94%", label: "Pain Relief" }],
};

// ── Main Page ────────────────────────────────────────────────────────────────
export default function TreatmentClient({ slug }: { slug: string }) {
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const theme = TREATMENT_THEMES[slug] || TREATMENT_THEMES["panchakarma"];
  const stats = STATS_BY_TREATMENT[slug] || STATS_BY_TREATMENT["panchakarma"];
  const related = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3);
  const Icon = ICON_MAP[treatment.icon] || Leaf;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${theme.from} 0%, ${theme.to} 60%, ${theme.from}dd 100%)` }}
      >
        {/* Parallax botanical bg */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Large Sanskrit watermark */}
          <div
            className="absolute text-center font-cormorant italic font-300 leading-none"
            style={{
              fontSize: "clamp(80px,16vw,200px)",
              color: "rgba(255,255,255,.04)",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {SANSKRIT_BY_TREATMENT[slug] || treatment.name}
          </div>

          {/* Animated mandala ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border"
            style={{
              width: "clamp(300px,55vw,700px)",
              height: "clamp(300px,55vw,700px)",
              borderColor: `${theme.accent}15`,
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border"
            style={{
              width: "clamp(220px,42vw,530px)",
              height: "clamp(220px,42vw,530px)",
              borderColor: `${theme.accent}10`,
            }}
          />
          {/* Leaf particles */}
          {[2, 5, 8, 12, 16].map((d, i) => (
            <HerbParticle key={i} delay={d} x={`${15 + i * 18}%`} size={20 + i * 6} />
          ))}
        </motion.div>

        {/* Hero content */}
        <div className="container-custom relative z-10 pt-32 pb-16 md:pb-20">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-raleway mb-8 transition-colors cursor-pointer"
            >
              <ArrowRight size={14} className="rotate-180" /> All Treatments
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            {/* Left: Title block */}
            <div>
              {/* Treatment icon badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-3 rounded-full px-4 py-2 mb-6"
                style={{ background: `${theme.accent}20`, border: `1px solid ${theme.accent}40` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${theme.accent}30` }}
                >
                  <Icon size={14} style={{ color: theme.accent }} />
                </div>
                <span className="font-raleway text-xs font-600 tracking-widest uppercase" style={{ color: theme.accent }}>
                  AYUSH Certified Treatment
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-cormorant font-700 text-white mb-4"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.04 }}
              >
                {treatment.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-lora italic text-xl mb-6"
                style={{ color: theme.accent }}
              >
                {treatment.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="font-raleway text-white/70 text-base leading-relaxed max-w-xl mb-8"
              >
                {treatment.shortDesc}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-raleway font-700 text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: theme.accent, color: "#1B4332", boxShadow: `0 8px 24px ${theme.accent}40` }}
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-raleway font-500 text-sm border transition-all duration-300 hover:bg-white/10 cursor-pointer"
                  style={{ borderColor: "rgba(255,255,255,.3)", color: "rgba(255,255,255,.85)" }}
                >
                  How It Works <ChevronDown size={15} />
                </a>
              </motion.div>
            </div>

            {/* Right: Quick info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Clock, label: "Duration", value: treatment.duration },
                { icon: IndianRupee, label: "Starting From", value: treatment.priceRange },
                { icon: Shield, label: "Certified", value: "AYUSH Govt." },
                { icon: Users, label: "Treated", value: "10,000+ patients" },
              ].map(({ icon: Ic, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 border backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,.07)", borderColor: "rgba(255,255,255,.12)" }}
                >
                  <Ic size={16} className="mb-2" style={{ color: theme.accent }} />
                  <p className="font-raleway text-white/45 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="font-cormorant font-600 text-white text-lg leading-tight">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }} className="py-10 border-y border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-6 divide-x divide-white/15">
            {stats.map((s) => (
              <AnimatedCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS IT — Storytelling ─────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-xs font-raleway font-600 uppercase tracking-wider"
                style={{ background: `${theme.accent}18`, color: theme.to }}
              >
                <Leaf size={12} /> The Ancient Wisdom
              </div>
              <h2 className="font-cormorant font-600 text-forest mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                What is {treatment.name}?
              </h2>
              <div className="space-y-4 font-raleway text-forest-muted text-base leading-relaxed">
                {treatment.fullDesc.split(". ").reduce<string[][]>((acc, s, i) => {
                  const p = Math.floor(i / 2);
                  if (!acc[p]) acc[p] = [];
                  acc[p].push(s);
                  return acc;
                }, []).map((sentences, i) => (
                  <p key={i}>{sentences.join(". ")}{sentences.length > 0 ? "." : ""}</p>
                ))}
              </div>

              {/* Conditions treated pills */}
              <div className="mt-7">
                <p className="font-raleway text-xs font-600 uppercase tracking-widest text-forest-muted/60 mb-3">
                  Conditions We Treat
                </p>
                <div className="flex flex-wrap gap-2">
                  {treatment.conditions.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-raleway px-3 py-1.5 rounded-full border transition-colors duration-200 hover:text-white cursor-default"
                      style={{
                        borderColor: `${theme.to}35`,
                        color: theme.to,
                        background: `${theme.to}08`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Visual — animated illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative h-80 md:h-96 rounded-3xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${theme.from}18, ${theme.to}30)` }}
            >
              {/* Decorative SVG visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 360" className="w-full h-full opacity-80" fill="none">
                  {/* Outer mandala */}
                  <circle cx="200" cy="180" r="150" stroke={theme.accent} strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
                  <circle cx="200" cy="180" r="110" stroke={theme.accent} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
                  {/* Lotus petals */}
                  {[0,45,90,135,180,225,270,315].map((a, i) => {
                    const rad = (a * Math.PI) / 180;
                    const cx = 200 + 80 * Math.sin(rad);
                    const cy = 180 - 80 * Math.cos(rad);
                    return (
                      <ellipse key={i} cx={cx} cy={cy} rx="18" ry="32"
                        fill={`${theme.accent}18`} stroke={`${theme.accent}60`} strokeWidth="0.8"
                        transform={`rotate(${a} ${cx} ${cy})`} />
                    );
                  })}
                  {/* Inner petals */}
                  {[0,60,120,180,240,300].map((a, i) => {
                    const rad = (a * Math.PI) / 180;
                    const cx = 200 + 45 * Math.sin(rad);
                    const cy = 180 - 45 * Math.cos(rad);
                    return (
                      <ellipse key={i} cx={cx} cy={cy} rx="11" ry="20"
                        fill={`${theme.accent}28`} stroke={`${theme.accent}80`} strokeWidth="0.6"
                        transform={`rotate(${a} ${cx} ${cy})`} />
                    );
                  })}
                  {/* Center */}
                  <circle cx="200" cy="180" r="22" fill={`${theme.accent}40`} stroke={theme.accent} strokeWidth="1.5" />
                  <circle cx="200" cy="180" r="10" fill={theme.accent} opacity="0.9" />
                  <circle cx="200" cy="180" r="4" fill="white" opacity="0.8" />
                </svg>
              </div>

              {/* Floating text badges over visual */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 bg-white/95 rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Shield size={14} style={{ color: theme.to }} />
                  <span className="font-raleway font-600 text-forest text-xs">AYUSH Certified</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 right-6 bg-white/95 rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Star size={12} className="fill-accent text-accent" />
                  <Star size={12} className="fill-accent text-accent" />
                  <Star size={12} className="fill-accent text-accent" />
                  <Star size={12} className="fill-accent text-accent" />
                  <Star size={12} className="fill-accent text-accent" />
                  <span className="font-raleway text-xs font-600 text-forest ml-1">4.9/5</span>
                </div>
                <p className="font-raleway text-xs text-forest-muted mt-1">Based on 500+ reviews</p>
              </motion.div>

              <motion.div
                animate={{ y: [-4, 8, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/95 rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="font-cormorant font-700 text-forest text-lg leading-none">15+</p>
                <p className="font-raleway text-xs text-forest-muted">Years experience</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS — Animated timeline ───────────────────────────────── */}
      <section id="process" className="section-padding" style={{ background: theme.light }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider"
              style={{ background: `${theme.to}15`, color: theme.to }}
            >
              <Activity size={12} /> Step by Step
            </div>
            <h2 className="font-cormorant font-600 text-forest mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              The Healing Journey
            </h2>
            <p className="font-raleway text-forest-muted max-w-lg mx-auto text-sm leading-relaxed">
              Each step is physician-designed and monitored. No two programmes are identical — yours is tailored to your Prakriti.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {treatment.process.map((step, i) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                title={step.title}
                desc={step.desc}
                accent={theme.accent === "#C9A84C" ? "#2D6A4F" : theme.to}
                isLast={i === treatment.process.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS — Bento grid ────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider"
              style={{ background: `${theme.to}12`, color: theme.to }}
            >
              <Sparkles size={12} /> What You Gain
            </div>
            <h2 className="font-cormorant font-600 text-forest" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Key Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {treatment.benefits.map((b, i) => (
              <BenefitCard key={b} benefit={b} index={i} accent={theme.to} />
            ))}
          </div>

          {/* Who is it for + Avoid if — side by side */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {/* Suitable for */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-7 border"
              style={{ background: `${theme.to}06`, borderColor: `${theme.to}20` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${theme.to}18` }}>
                  <CheckCircle size={18} style={{ color: theme.to }} />
                </div>
                <h3 className="font-cormorant font-600 text-forest text-xl">Suitable For</h3>
              </div>
              <div className="space-y-3">
                {treatment.suitableFor.map((s) => (
                  <div key={s} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: theme.to }} />
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Avoid if */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl p-7 border border-red-100 bg-red-50/40"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle size={18} className="text-red-500" />
                </div>
                <h3 className="font-cormorant font-600 text-forest text-xl">Avoid If</h3>
              </div>
              <div className="space-y-3">
                {treatment.avoidIf.map((a) => (
                  <div key={a} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-red-400" />
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRICING — Premium card ───────────────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${theme.from} 0%, ${theme.to} 100%)` }}
      >
        {/* BG decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 rounded-full border"
            style={{ width: 500, height: 500, borderColor: `${theme.accent}10` }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="font-cormorant font-600 text-white text-4xl md:text-5xl mb-3">
                Duration & Pricing
              </h2>
              <p className="font-raleway text-white/60 text-sm">
                Transparent pricing. Free consultations. No hidden charges.
              </p>
            </div>

            {/* Pricing card */}
            <div
              className="rounded-3xl p-8 md:p-10 border backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.15)" }}
            >
              <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/15">
                <div className="text-center">
                  <Clock size={22} className="mx-auto mb-3" style={{ color: theme.accent }} />
                  <p className="font-raleway text-white/50 text-xs uppercase tracking-wider mb-2">Duration</p>
                  <p className="font-cormorant font-700 text-white text-3xl">{treatment.duration}</p>
                </div>
                <div className="text-center">
                  <IndianRupee size={22} className="mx-auto mb-3" style={{ color: theme.accent }} />
                  <p className="font-raleway text-white/50 text-xs uppercase tracking-wider mb-2">Price Range</p>
                  <p className="font-cormorant font-700 text-3xl" style={{ color: theme.accent }}>
                    {treatment.priceRange}
                  </p>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-3 mb-8">
                {[
                  "Free initial Prakriti assessment",
                  "Physician-supervised throughout",
                  "Authentic classical protocols",
                  "Post-treatment dietary guidance",
                  "Follow-up consultation included",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: theme.accent, flexShrink: 0 }} />
                    <span className="font-raleway text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <p className="font-raleway text-white/40 text-xs text-center mb-6">
                Final pricing depends on your specific protocol, session count, and physician assessment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-raleway font-700 text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: theme.accent, color: "#1B4332", boxShadow: `0 8px 24px ${theme.accent}40` }}
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919876543210"
                  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-raleway font-500 text-sm border border-white/25 text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Phone size={15} /> +91 98765 43210
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ───────────────────────────────────────────── */}
      <section className="py-16 bg-cream-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { name: "Nitin Rana", city: "Sonipat", text: "Life-changing results after just 2 weeks. The physician truly understood my condition.", rating: 5 },
              { name: "Priya Sharma", city: "Delhi", text: "Finally found authentic treatment. Dr. Sharma's expertise is unmatched in the region.", rating: 5 },
              { name: "Rohit Kumar", city: "Gurgaon", text: "Avoided surgery thanks to this treatment. Highly recommend to anyone suffering.", rating: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-cream-section shadow-card"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-lora italic text-forest-muted text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700 font-cormorant flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-raleway font-600 text-forest text-sm">{t.name}</p>
                    <p className="font-raleway text-forest-muted/60 text-xs">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RELATED TREATMENTS ───────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-cormorant font-600 text-forest text-4xl mb-2">Related Treatments</h2>
            <p className="font-raleway text-forest-muted text-sm">Explore other healing protocols that may complement your journey.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((t, i) => {
              const rTheme = TREATMENT_THEMES[t.slug] || TREATMENT_THEMES["panchakarma"];
              const RIcon = ICON_MAP[t.icon] || Leaf;
              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/treatments/${t.slug}`} className="group block h-full">
                    <div className="h-full bg-white rounded-2xl border border-cream-section overflow-hidden hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col">
                      {/* Coloured header */}
                      <div
                        className="h-24 flex items-center justify-center relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${rTheme.from}, ${rTheme.to})` }}
                      >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-full border border-white/10 scale-150" />
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <RIcon size={22} style={{ color: rTheme.accent }} />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-cormorant font-600 text-forest text-xl mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                        <p className="font-raleway text-xs font-500 mb-3" style={{ color: rTheme.to }}>{t.tagline}</p>
                        <p className="font-raleway text-forest-muted text-sm line-clamp-2 flex-1 mb-4">{t.shortDesc}</p>
                        <div className="flex items-center justify-between text-xs font-raleway">
                          <span className="text-forest-muted/60">{t.priceRange}</span>
                          <span className="flex items-center gap-1 font-500" style={{ color: rTheme.to }}>
                            Learn more <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-cream-section">
        <div className="container-custom max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              <Icon size={24} className="text-white" />
            </div>
            <h2 className="font-cormorant font-600 text-forest text-4xl mb-3">
              Ready to Begin Healing?
            </h2>
            <p className="font-raleway text-forest-muted text-base leading-relaxed mb-7">
              Book a free consultation with Dr. Rajesh Sharma. He will assess your Prakriti and design your precise healing protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-raleway font-700 text-sm text-white transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, boxShadow: `0 8px 24px ${theme.to}40` }}
              >
                Book Free Consultation <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-raleway font-500 text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Phone size={15} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}