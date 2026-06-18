import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D6A4F",
          dark: "#1B4332",
          light: "#40916C",
        },
        secondary: "#74C69D",
        accent: {
          DEFAULT: "#C9A84C",
          soft: "#F4D98C",
          dark: "#92400E",
        },
        cream: {
          DEFAULT: "#FDFAF4",
          section: "#F0EBE1",
          warm: "#F5F0E1",
        },
        forest: {
          DEFAULT: "#1A2E1A",
          muted: "#4A5E4A",
        },
        chapter: {
          1: "#1B4332",
          2: "#2D6A4F",
          3: "#40916C",
          4: "#C9A84C",
        },
        amber: {
          ayurvedic: "#92400E",
        },
        earth: {
          terracotta: "#C67B5C",
          sand: "#D4C4A8",
          clay: "#B5651D",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        raleway: ["var(--font-raleway)", "system-ui", "sans-serif"],
        lora: ["var(--font-lora)", "Georgia", "serif"],
      },
      fontSize: {
        "hero": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15" }],
        "title": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2" }],
        "subtitle": ["clamp(1rem, 2vw, 1.375rem)", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      borderRadius: {
        "organic": "24px",
        "organic-sm": "16px",
        "organic-lg": "32px",
      },
      boxShadow: {
        "ayurvedic": "0 8px 32px rgba(201, 168, 76, 0.15), 0 2px 8px rgba(0,0,0,0.06)",
        "ayurvedic-lg": "0 24px 60px rgba(201, 168, 76, 0.2), 0 8px 24px rgba(0,0,0,0.1)",
        "green-glow": "0 0 40px rgba(45, 106, 79, 0.3)",
        "gold-glow": "0 0 30px rgba(201, 168, 76, 0.35)",
        "card": "0 4px 24px rgba(26, 46, 26, 0.08)",
        "card-hover": "0 20px 60px rgba(26, 46, 26, 0.16)",
        "float": "0 8px 40px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        "gradient-ayurvedic": "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)",
        "gradient-gold": "linear-gradient(135deg, #92400E 0%, #C9A84C 100%)",
        "gradient-cream": "linear-gradient(180deg, #FDFAF4 0%, #F0EBE1 100%)",
        "gradient-shilajeet": "radial-gradient(ellipse at top, #78350F 0%, #451A03 50%, #1C0A00 100%)",
        "gradient-soap": "radial-gradient(ellipse at top, #065F46 0%, #064E3B 50%, #022C22 100%)",
        "gradient-cream-product": "radial-gradient(ellipse at top, #92400E 0%, #78350F 50%, #451A03 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.4" },
          "33%": { transform: "translateY(-30px) translateX(10px)", opacity: "0.8" },
          "66%": { transform: "translateY(-15px) translateX(-8px)", opacity: "0.6" },
        },
        "shimmer-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "badge-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(201, 168, 76, 0)" },
        },
        "counter-glow": {
          "0%, 100%": { textShadow: "0 0 20px rgba(201, 168, 76, 0.3)" },
          "50%": { textShadow: "0 0 40px rgba(201, 168, 76, 0.6)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-60px)", opacity: "0" },
        },
        "bounce-badge": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.6)" },
        },
        "orb-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 40px rgba(201, 168, 76, 0.6)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fadeInUp": {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "stock-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "particle-float": "particle-float 6s ease-in-out infinite",
        "shimmer-sweep": "shimmer-sweep 2s ease infinite",
        "badge-pulse": "badge-pulse 2s ease infinite",
        "counter-glow": "counter-glow 2s ease infinite",
        "float-up": "float-up 0.8s ease forwards",
        "bounce-badge": "bounce-badge 0.4s ease",
        "orb-pulse": "orb-pulse 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "fadeInUp": "fadeInUp 0.6s ease forwards",
        "stock-pulse": "stock-pulse 2s ease infinite",
        "gradient-shift": "gradient-shift 20s ease infinite",
      },
      transitionTimingFunction: {
        "organic": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
