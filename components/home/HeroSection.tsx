"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; opd: number;
  phase: number; color: string;
}

// ── Static data ────────────────────────────────────────────────────────────
const TICKER_TEXT = "आयुर्वेद · पञ्चकर्म · धन्वन्तरि · स्वास्थ्य · योग · प्राणायाम · ध्यान · शान्ति \u00A0\u00A0✦\u00A0\u00A0";
const PARTICLE_COLORS = [
  "rgba(201,168,76,", "rgba(244,217,140,", "rgba(116,198,157,", "rgba(255,255,255,",
];
const STAT_DATA = [
  { id: 0, val: "15+",  label: "Years of Practice" },
  { id: 1, val: "10K+", label: "Patients Healed" },
  { id: 2, val: "98%",  label: "Satisfaction Rate" },
];
const TRUST_ITEMS = [
  {
    bg: "rgba(201,168,76,.12)", iconStroke: "#C9A84C",
    iconPath: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
    val: "AYUSH", desc: "Govt. Certified",
  },
  {
    bg: "rgba(64,145,108,.14)", iconStroke: "#74C69D",
    iconPath: <><path d="M12 22V12M12 12C12 7 8 4 3 3M12 12C12 7 16 4 21 3M12 12c0-3-1-6-3-8M12 12c0-3 1-6 3-8"/></>,
    val: "25+", desc: "Therapies",
  },
  {
    bg: "rgba(116,198,157,.11)", iconStroke: "#40916C",
    iconPath: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    val: "In-house", desc: "Pharmacy",
  },
];
const HERB_CARDS = [
  {
    style: { top: "8%", left: "2%" },
    anim: "float0 4s ease-in-out infinite",
    border: "1px solid rgba(201,168,76,.22)",
    dotBg: "#C9A84C", dotShadow: "0 0 8px rgba(201,168,76,.6)",
    sanskrit: "अश्वगंधा", sanskritColor: "#C9A84C",
    name: "Ashwagandha", benefit: "Stress & Vitality",
  },
  {
    style: { top: "42%", right: "0%" },
    anim: "float1 4.7s ease-in-out infinite",
    border: "1px solid rgba(64,145,108,.28)",
    dotBg: "#40916C", dotShadow: "0 0 8px rgba(64,145,108,.5)",
    sanskrit: "तुलसी", sanskritColor: "#74C69D",
    name: "Tulsi", benefit: "Immunity & Clarity",
  },
  {
    style: { bottom: "6%", right: "1%" },
    anim: "float1 5.4s ease-in-out .4s infinite",
    border: "1px solid rgba(116,198,157,.25)",
    dotBg: "#74C69D", dotShadow: "0 0 8px rgba(116,198,157,.5)",
    sanskrit: "ब्राह्मी", sanskritColor: "#74C69D",
    name: "Brahmi", benefit: "Mind & Memory",
  },
];
const DOSHA_DATA = [
  { name: "Vata",  color: "#3B7DD8", pct: 62, grad: "linear-gradient(90deg,#7EB5F0,#3B7DD8)" },
  { name: "Pitta", color: "#D44A1A", pct: 81, grad: "linear-gradient(90deg,#F4906A,#D44A1A)" },
  { name: "Kapha", color: "#2D8B55", pct: 47, grad: "linear-gradient(90deg,#74C69D,#2D8B55)" },
];

// ── Dharmachakra SVG (wheel + spokes built in JSX) ─────────────────────────
function Dharmachakra({ svgRef }: { svgRef: React.RefObject<SVGSVGElement> }) {
  // 24 teeth
  const teeth: JSX.Element[] = [];
  for (let i = 0; i < 24; i++) {
    const a = ((i * 15 - 90) * Math.PI) / 180;
    const r1 = 166, r2 = 175;
    const x1 = 200 + r1 * Math.cos(a), y1 = 200 + r1 * Math.sin(a);
    const x2 = 200 + r2 * Math.cos(a), y2 = 200 + r2 * Math.sin(a);
    teeth.push(
      <line key={`t${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(201,168,76,.55)" strokeWidth="1.2" strokeLinecap="round" />
    );
    if (i % 3 === 0) {
      const dx = 200 + (r2 + 6) * Math.cos(a), dy = 200 + (r2 + 6) * Math.sin(a);
      const perp = a + Math.PI / 2;
      const pts = [
        `${dx + Math.cos(a) * 4},${dy + Math.sin(a) * 4}`,
        `${dx + Math.cos(perp) * 3},${dy + Math.sin(perp) * 3}`,
        `${dx - Math.cos(a) * 4},${dy - Math.sin(a) * 4}`,
        `${dx - Math.cos(perp) * 3},${dy - Math.sin(perp) * 3}`,
      ].join(" ");
      teeth.push(<polygon key={`d${i}`} points={pts} fill="rgba(201,168,76,.5)" />);
    }
  }
  // 8 primary spokes
  const spokes8: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    spokes8.push(
      <line key={`sp${i}`}
        x1={200 + 54 * Math.cos(a)} y1={200 + 54 * Math.sin(a)}
        x2={200 + 150 * Math.cos(a)} y2={200 + 150 * Math.sin(a)} />,
      <circle key={`sc${i}`}
        cx={200 + 102 * Math.cos(a)} cy={200 + 102 * Math.sin(a)} r="5"
        fill="rgba(201,168,76,.35)" stroke="rgba(201,168,76,.65)" strokeWidth="1" />
    );
  }
  // 8 secondary spokes
  const spokes8b: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const a = ((i * 45 - 90 + 22.5) * Math.PI) / 180;
    spokes8b.push(
      <line key={`sb${i}`}
        x1={200 + 60 * Math.cos(a)} y1={200 + 60 * Math.sin(a)}
        x2={200 + 140 * Math.cos(a)} y2={200 + 140 * Math.sin(a)} />
    );
  }

  return (
    <svg
      ref={svgRef}
      id="chakra-svg"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%"
      aria-label="Dharmachakra — the wheel of Ayurveda"
      role="img"
      style={{ transition: "transform .9s cubic-bezier(.25,.46,.45,.94)" }}
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4D98C" stopOpacity="1" />
          <stop offset="55%" stopColor="#C9A84C" stopOpacity=".85" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity=".4" />
        </radialGradient>
      </defs>
      {/* oval removed */}

      {/* Outer rim — spins forward */}
      <g style={{ transformOrigin: "200px 200px", animation: "wheelSpin 18s linear infinite" }}>
        <circle cx="200" cy="200" r="175" stroke="rgba(201,168,76,.45)" strokeWidth="1.2" fill="none" />
        <circle cx="200" cy="200" r="168" stroke="rgba(201,168,76,.15)" strokeWidth=".5" fill="none" />
        {teeth}
      </g>

      {/* Wheel body — spins reverse */}
      <g style={{ transformOrigin: "200px 200px", animation: "wheelSpinR 28s linear infinite" }}>
        <circle cx="200" cy="200" r="162" stroke="rgba(201,168,76,.6)" strokeWidth="2" fill="rgba(201,168,76,.04)" />
        <circle cx="200" cy="200" r="152" stroke="rgba(255,255,255,.1)" strokeWidth=".5" fill="none" />
        <g stroke="rgba(201,168,76,.8)" strokeWidth="1.8" strokeLinecap="round">{spokes8}</g>
        <circle cx="200" cy="200" r="52" stroke="rgba(201,168,76,.55)" strokeWidth="1.2" fill="rgba(201,168,76,.04)" />
        <circle cx="200" cy="200" r="44" stroke="rgba(255,255,255,.12)" strokeWidth=".6" fill="none" />
        <g stroke="rgba(201,168,76,.3)" strokeWidth=".8" strokeLinecap="round">{spokes8b}</g>
      </g>

      {/* Hub — stationary */}
      <circle cx="200" cy="200" r="36" fill="rgba(13,43,30,.9)" stroke="rgba(201,168,76,.7)" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="26" fill="url(#hubGlow)" opacity=".9" />
      <circle cx="200" cy="200" r="16" fill="rgba(13,43,30,.95)" stroke="rgba(244,217,140,.6)" strokeWidth=".8" />
      <circle cx="200" cy="200" r="7" fill="#C9A84C" />
      <circle cx="200" cy="200" r="3.5" fill="rgba(13,43,30,.9)" />
      <circle cx="200" cy="200" r="1.5" fill="#F4D98C" />

      {/* Cardinal labels */}
      <text x="200" y="20" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="rgba(201,168,76,.55)" letterSpacing="2">आयुर्वेद</text>
      <text x="200" y="388" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="rgba(201,168,76,.45)" letterSpacing="2">धन्वन्तरि</text>
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const [activeStatIdx, setActiveStatIdx] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);

  // Canvas multi-color particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const pts: Particle[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * (canvas.width || 700),
      y: Math.random() * (canvas.height || 640),
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.38 + 0.07),
      size: Math.random() * 1.7 + 0.4,
      opacity: Math.random() * 0.38 + 0.06,
      opd: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    let tick = 0;
    const animP = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;
      pts.forEach((p) => {
        p.x += p.vx + Math.sin(tick * 0.006 + p.phase) * 0.14;
        p.y += p.vy;
        p.opacity += p.opd * 0.0013;
        if (p.opacity > 0.52 || p.opacity < 0.05) p.opd *= -1;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(animP);
    };
    animP();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  // Stat cycler
  useEffect(() => {
    const t = setInterval(() => setActiveStatIdx((i) => (i + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);

  // Mouse parallax on the wheel SVG
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const svg = svgRef.current;
    if (!svg || window.innerWidth < 1024) return;
    const hero = document.getElementById("hero");
    if (!hero) return;
    const cx = hero.offsetWidth / 2, cy = hero.offsetHeight / 2;
    const nx = (e.clientX - cx) / cx, ny = (e.clientY - cy) / cy;
    svg.style.transform = `translate(${nx * 8}px,${ny * 8}px)`;
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    hero.addEventListener("mousemove", handleMouseMove as EventListener, { passive: true });
    return () => hero.removeEventListener("mousemove", handleMouseMove as EventListener);
  }, [handleMouseMove]);

  return (
    <>
      {/* Keyframe styles injected once */}
      <section
        id="hero"
        className="relative w-full overflow-hidden flex flex-col"
        style={{ minHeight: "100svh", background: "linear-gradient(155deg,#0D2B1E 0%,#1B4332 35%,#2D6A4F 70%,#1B4332 100%)" }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        {/* Radial bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background: "radial-gradient(ellipse 35% 35% at 15% 85%,rgba(201,168,76,.06) 0%,transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* OM watermark */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            left: "-4%", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(200px,28vw,380px)",
            fontWeight: 300, fontStyle: "italic",
            color: "rgba(255,255,255,.022)", lineHeight: 1, zIndex: 0,
          }}
          aria-hidden="true"
        >ॐ</div>



        {/* ── Main content ── */}
        <div
          className="hero-main relative"
          style={{ zIndex: 10, padding: "110px 0 60px", flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: 0, maxWidth: "100%", overflow: "visible" }}
        >
          {/* ── LEFT ── */}
          <div className="hero-left" style={{ paddingLeft: "clamp(20px,4vw,48px)", paddingRight: 24, maxWidth: 620 }}>

            {/* Provenance pill */}
            <div className="provenance-row" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
              <div style={{ height: 1, width: 28, background: "rgba(201,168,76,.5)", flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(201,168,76,.09)", border: "1px solid rgba(201,168,76,.22)", borderRadius: 100, padding: "5px 14px" }}>
                <div className="prov-dot-anim" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, letterSpacing: ".22em", color: "#C9A84C", fontWeight: 500, textTransform: "uppercase" }}>
                  Est. 2009 · Sonipat, Haryana
                </span>
              </div>
              <div style={{ height: 1, width: 28, background: "rgba(201,168,76,.5)", flexShrink: 0 }} />
            </div>

            {/* H1 */}
            <h1
              className="h1-words"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(2.6rem,5vw,4.8rem)",
                fontWeight: 600, lineHeight: 1.04, letterSpacing: "-.01em",
                color: "white", marginBottom: 20,
              }}
            >
              <span style={{ display: "block" }}>
                <span className="w0" style={{ display: "inline-block", willChange: "transform" }}>Where&nbsp;</span>
                <span className="w1" style={{ display: "inline-block", willChange: "transform" }}>Ancient</span>
              </span>
              <span style={{ display: "block" }}>
                <span className="w2 word-gold" style={{ display: "inline-block", willChange: "transform" }}>Ayurveda&nbsp;</span>
                <span className="w3" style={{ display: "inline-block", willChange: "transform" }}>Meets</span>
              </span>
              <span style={{ display: "block" }}>
                <span className="w4" style={{ display: "inline-block", willChange: "transform" }}>Your Modern Life</span>
              </span>
            </h1>

            {/* Divider */}
            <div className="divider-row" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ height: 1, width: 50, background: "rgba(255,255,255,.13)" }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A84C", opacity: .7, flexShrink: 0 }} />
              <div style={{ height: 1, width: 180, background: "linear-gradient(90deg,rgba(201,168,76,.3),rgba(201,168,76,0))" }} />
            </div>

            {/* Subheading */}
            <p
              className="sub-text"
              style={{
                fontFamily: "'Raleway',sans-serif", color: "rgba(255,255,255,.62)",
                fontSize: "clamp(.9rem,1.5vw,1.05rem)", lineHeight: 1.78,
                marginBottom: 34, maxWidth: 500,
              }}
            >
              Authentic Panchkarma treatments and Ayurvedic wellness products,
              trusted by{" "}
              <span style={{ color: "rgba(244,217,140,.9)", fontWeight: 600 }}>10,000+ patients</span>
              {" "}across Delhi NCR and Haryana for over 15 years.
            </p>

            {/* CTAs */}
            <div className="ctas-row" style={{ marginBottom: 36 }}>
              <div className="ctas-inner" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" className="cta-primary-btn">
                  <span className="pulse-ring-anim" style={{
                    position: "absolute", inset: 0, borderRadius: 100,
                    border: "1.5px solid rgba(201,168,76,.5)", pointerEvents: "none",
                  }} />
                  Book a Consultation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={btnHovered ? "white" : "#1B4332"} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    style={{ flexShrink: 0, transition: "stroke .25s ease" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/treatments" className="cta-secondary-btn">
                  Explore Treatments
                  <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Stats row */}
            <div className="stats-row-anim" style={{ marginBottom: 28 }}>
              <div className="stats-row-inner" style={{ display: "flex" }}>
                {STAT_DATA.map((s, i) => (
                  <div
                    key={s.id}
                    className="stat-item"
                    style={{
                      paddingLeft: i === 0 ? 0 : 18,
                      paddingRight: 18,
                      borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,.1)",
                      opacity: activeStatIdx === i ? 1 : 0.45,
                      transition: "opacity .4s ease",
                    }}
                  >
                    <div style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "clamp(1.4rem,2.5vw,2rem)",
                      fontWeight: 700, lineHeight: 1,
                      color: activeStatIdx === i ? "#F4D98C" : "rgba(255,255,255,.7)",
                      transition: "color .4s ease",
                    }}>{s.val}</div>
                    <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".08em", marginTop: 3, textTransform: "uppercase" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust row */}
            <div className="trust-row-anim">
              <div
                className="trust-row-inner"
                style={{
                  display: "flex", alignItems: "stretch",
                  border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, overflow: "hidden",
                  background: "rgba(255,255,255,.04)", backdropFilter: "blur(10px)",
                  maxWidth: 480,
                }}
              >
                {TRUST_ITEMS.map((t, i) => (
                  <div
                    key={i}
                    className="trust-item-hover"
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "13px 18px", flex: 1,
                      borderRight: i < TRUST_ITEMS.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none",
                      transition: "background .25s ease", cursor: "default",
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke={t.iconStroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {t.iconPath}
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,.92)", lineHeight: 1.1 }}>{t.val}</div>
                      <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, color: "rgba(255,255,255,.38)", letterSpacing: ".05em", marginTop: 1, textTransform: "uppercase" }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Dharmachakra ── */}
          <div
            className="right-vis"
            style={{ position: "relative", height: 540, display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 80, paddingLeft: 0, marginLeft: "-40px" }}
          >
            {/* Ambient rings */}
            <div className="ambient-r1" style={{ position: "absolute", width: "100%", height: "100%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%", border: "1px solid rgba(201,168,76,.08)", pointerEvents: "none" }} />
            <div className="ambient-r2" style={{ position: "absolute", width: "93%", height: "93%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%", border: "1px solid rgba(201,168,76,.06)", pointerEvents: "none" }} />

            {/* Orb */}
            <div
              className="orb-container"
              style={{
                position: "absolute", width: "88%", height: "88%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%",
                background: "transparent",
                border: "1px solid rgba(255,255,255,.1)", overflow: "hidden",
              }}
            >
              {/* Shimmer */}
              <div
                className="shimmer-sweep"
                style={{
                  position: "absolute", top: 0, width: "40%", height: "100%",
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)",
                  transform: "skewX(-20deg)", pointerEvents: "none", zIndex: 2,
                }}
              />
              <Dharmachakra svgRef={svgRef} />
            </div>

            {/* Herb cards */}
            {HERB_CARDS.map((h, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...h.style,
                  backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                  background: "rgba(13,42,28,.78)", borderRadius: 14,
                  padding: "11px 15px", minWidth: 148,
                  border: h.border,
                  animation: h.anim,
                  zIndex: 5,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: h.dotBg, boxShadow: h.dotShadow, marginBottom: 7 }} />
                <div style={{ fontFamily: "'Lora',serif", fontSize: 10, color: h.sanskritColor, marginBottom: 4, letterSpacing: ".07em" }}>{h.sanskrit}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", color: "white", fontSize: 15, fontWeight: 600, lineHeight: 1.1, marginBottom: 3 }}>{h.name}</div>
                <div style={{ fontFamily: "'Raleway',sans-serif", color: "rgba(255,255,255,.42)", fontSize: 10, letterSpacing: ".04em" }}>{h.benefit}</div>
              </div>
            ))}

            {/* Dosha balance card */}
            <div
              className="float-card"
              style={{
                position: "absolute", bottom: "2%", left: "2%",
                animation: "float2 4.5s ease-in-out infinite",
                background: "rgba(255,255,255,.97)",
                borderRadius: 14, padding: "14px 18px", minWidth: 196,
                boxShadow: "0 12px 40px rgba(0,0,0,.22)", zIndex: 6,
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 700, color: "#1B4332", marginBottom: 10, letterSpacing: ".02em" }}>Dosha Balance</div>
              {DOSHA_DATA.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, fontWeight: 600, color: d.color, width: 34, flexShrink: 0 }}>{d.name}</div>
                  <div style={{ flex: 1, height: 5, borderRadius: 3, background: "rgba(0,0,0,.08)", overflow: "hidden" }}>
                    <div style={{ height: 5, borderRadius: 3, width: `${d.pct}%`, background: d.grad }} />
                  </div>
                  <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, color: "#4A5E4A", width: 26, textAlign: "right", flexShrink: 0 }}>{d.pct}%</div>
                </div>
              ))}
              <div style={{ marginTop: 8, paddingTop: 7, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 9.5, color: "#4A5E4A", letterSpacing: ".04em" }}>Personalised assessment available</p>
              </div>
            </div>

            {/* Review card */}
            <div
              style={{
                position: "absolute", top: "2%", right: "1%",
                animation: "float0 5s ease-in-out infinite",
                background: "rgba(255,255,255,.97)",
                borderRadius: 14, padding: "11px 15px", maxWidth: 155,
                boxShadow: "0 12px 40px rgba(0,0,0,.22)", zIndex: 6,
              }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 5 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#C9A84C" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 11, fontStyle: "italic", color: "#1A2E1A", lineHeight: 1.5, marginBottom: 6 }}>"Changed my life completely."</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, color: "#4A5E4A", fontWeight: 600 }}>— Priya S., Delhi</div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <button
          className="scroll-ind"
          style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            cursor: "pointer", background: "none", border: "none", zIndex: 20,
          }}
          onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to next section"
        >
          <span style={{ fontFamily: "'Raleway',sans-serif", color: "rgba(255,255,255,.32)", fontSize: 9, letterSpacing: ".35em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
            {[1, 2, 3].map((n) => (
              <svg key={n} className={`chev-${n}`} viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", width: 14, height: 7, opacity: 0 }} aria-hidden="true">
                <path d="M1 1L7 6L13 1" stroke="rgba(255,255,255,.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </button>
        {/* ── Sanskrit ticker — BOTTOM ── */}
        <div
          aria-hidden="true"
          style={{
            position: "relative", zIndex: 20, overflow: "hidden",
            borderTop: "1px solid rgba(201,168,76,.12)",
            background: "rgba(27,67,50,.5)", backdropFilter: "blur(8px)",
            height: 38, flexShrink: 0,
          }}
        >
          <div className="ticker-track" style={{ padding: "11px 0" }}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "rgba(201,168,76,.55)", letterSpacing: ".22em", paddingRight: "3rem" }}>
                {TICKER_TEXT}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
