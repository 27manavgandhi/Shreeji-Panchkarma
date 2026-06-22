"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle,
  Leaf,
  Heart,
  Shield,
  Star,
  Clock,
  Phone,
  Quote,
  ChevronDown,
  BookOpen,
  FlaskConical,
  Stethoscope,
  MapPin,
  Plus,
} from "lucide-react";
import SanskritDivider from "@/components/shared/SanskritDivider";
import HealingSeal from "@/components/about/HealingSeal";
import {
  TIMELINE,
  PHILOSOPHY,
  STATS,
  CERTIFICATIONS,
  TESTIMONIALS,
  FAQS,
  DOCTOR_CREDENTIALS,
  QUICK_FACTS,
  type TimelineEntry,
  type PhilosophyItem,
} from "@/components/about/about-data";

const PHILOSOPHY_ICONS = {
  stethoscope: Stethoscope,
  book: BookOpen,
  flask: FlaskConical,
  leaf: Leaf,
} as const;

const CERT_ICONS = {
  shield: Shield,
  award: Award,
  check: CheckCircle,
  leaf: Leaf,
} as const;

/* ── Easing ──────────────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ── Subcomponents ───────────────────────────────────────────────────── */

function StatCard({
  value,
  label,
  sub,
  index,
}: {
  value: string;
  label: string;
  sub: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
        className="font-cormorant font-700 text-white mb-2"
        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
      >
        {value}
      </motion.div>
      <p className="font-raleway font-600 text-white/90 text-sm md:text-base mb-1">
        {label}
      </p>
      <p className="font-raleway text-white/45 text-xs uppercase tracking-wider">
        {sub}
      </p>
    </div>
  );
}

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const isEven = index % 2 === 0;
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`md:w-[45%] ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, x: isEven ? -24 : 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <span
            className="inline-block font-raleway text-xs font-600 tracking-widest uppercase px-3 py-1 rounded-full mb-3"
            style={{ background: `${item.color}15`, color: item.color }}
          >
            {item.chapter}
          </span>
          <p className="font-cormorant font-700 text-3xl mb-1" style={{ color: item.color }}>
            {item.year}
          </p>
          <h3 className="font-cormorant font-600 text-forest text-xl mb-3">{item.title}</h3>
          <p className="font-raleway text-forest-muted text-sm leading-relaxed mb-4">
            {item.desc}
          </p>
          <div
            className="rounded-xl px-4 py-2.5 text-xs font-raleway font-600"
            style={{ background: `${item.color}10`, color: item.color }}
          >
            {item.highlight}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex md:w-[10%] flex-col items-center">
        <motion.div
          initial={reduceMotion ? undefined : { scale: 0.85, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT }}
          className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 relative"
          style={{ background: item.color }}
        >
          <div className="w-3 h-3 rounded-full bg-white" />
        </motion.div>
      </div>

      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
}

function PhilosophyCard({ item, index }: { item: PhilosophyItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const Icon = PHILOSOPHY_ICONS[item.iconKey];

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
      className="bg-white rounded-2xl p-7 border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-110"
        style={{ background: item.color }}
        aria-hidden="true"
      />
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${item.color}15` }}
      >
        <Icon size={22} style={{ color: item.color }} aria-hidden="true" />
      </div>
      <h3 className="font-cormorant font-600 text-forest text-xl mb-3 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="font-raleway text-forest-muted text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border border-cream-section rounded-2xl bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-cormorant font-600 text-forest text-lg">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="flex-shrink-0 text-primary"
        >
          <Plus size={20} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
            style={{ overflow: "hidden" }}
          >
            <p className="font-raleway text-forest-muted text-sm leading-relaxed px-6 pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────── */

export default function AboutPageClient() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, #0D2B1E 0%, #1B4332 40%, #2D6A4F 75%, #1B4332 100%)",
        }}
      >
        <motion.div
          style={reduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-cormorant italic font-300 text-white/[0.035] select-none"
              style={{ fontSize: "clamp(60px,14vw,180px)", whiteSpace: "nowrap" }}
            >
              शरीरमाद्यं खलु धर्मसाधनम्
            </p>
          </div>
        </motion.div>

        <div className="container-custom relative z-10 pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7"
                style={{ background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.3)" }}
              >
                <span
                  className="font-raleway text-accent text-xs font-600 tracking-widest uppercase"
                >
                  Our story · Est. 2009
                </span>
              </motion.div>

              <motion.h1
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
                className="font-cormorant font-700 text-white mb-6 leading-[1.04]"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)" }}
              >
                A legacy of
                <br />
                <span style={{ color: "#F4D98C", fontStyle: "italic" }}>healing</span>
                <br />
                born in Haryana
              </motion.h1>

              <motion.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.5, ease: EASE_OUT }}
                className="font-raleway text-white/65 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Since 2009, Shreeji Panchkarma has been the most trusted name in
                authentic Ayurvedic treatment in Sonipat, Haryana — serving
                10,000+ patients with unwavering commitment to classical protocols.
              </motion.p>

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: EASE_OUT }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-raleway font-700 text-sm cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "#C9A84C",
                    color: "#1B4332",
                    boxShadow: "0 8px 24px rgba(201,168,76,.35)",
                  }}
                >
                  Book a consultation <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <a
                  href="#story"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-raleway font-500 text-sm border border-white/25 text-white/85 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                >
                  Read our story <ChevronDown size={15} aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            {/* Right — Healing Seal */}
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE_OUT }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="relative" style={{ width: 380, height: 380 }}>
                <HealingSeal size={380} />

                <div
                  className="absolute -top-2 -right-4 bg-white/95 rounded-2xl px-4 py-3 shadow-lg"
                  style={{ maxWidth: 180 }}
                >
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-raleway font-600 text-forest text-xs">
                      AYUSH certified
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-6 bg-white/95 rounded-2xl px-4 py-3 shadow-lg">
                  <p className="font-cormorant font-700 text-primary text-xl leading-none">
                    10,000+
                  </p>
                  <p className="font-raleway text-forest-muted text-xs mt-0.5">
                    Patients healed
                  </p>
                </div>

                <div className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white/95 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex gap-0.5 mb-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-raleway text-xs text-forest-muted font-600">
                    4.9 / 5.0 patient rating
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200"
          aria-label="Scroll to our story"
        >
          <ChevronDown size={22} aria-hidden="true" />
        </a>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-chapter-1 via-chapter-2 to-primary border-y border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} sub={s.sub} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ─────────────────────────────────────────────── */}
      <section id="story" className="section-padding bg-cream relative overflow-hidden">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-cormorant font-700 italic text-primary/[0.03] select-none pointer-events-none leading-none hidden md:block"
          style={{ fontSize: "clamp(100px,20vw,280px)" }}
          aria-hidden="true"
        >
          2009
        </div>

        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 text-xs font-raleway font-600 uppercase tracking-wider bg-primary/8 text-primary">
                <Leaf size={12} aria-hidden="true" /> The beginning
              </div>
              <h2
                className="font-cormorant font-600 text-forest mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                The story behind
                <br />
                the clinic
              </h2>
              <div className="space-y-4 font-raleway text-forest-muted text-base leading-relaxed">
                <p>
                  In 2009, Dr. Rajesh Sharma returned from Banaras Hindu University
                  with his MD in Panchakarma and a singular mission: to end the
                  Ayurvedic desert in Haryana. He had seen too many patients
                  travelling to Delhi or Rishikesh for authentic treatment that
                  should have been available at home.
                </p>
                <p>
                  What he found on returning was a landscape of diluted Ayurveda —
                  clinics offering oil massages and calling it Panchakarma, selling
                  pre-packaged medicines and calling them formulations. He set out
                  to build something entirely different.
                </p>
                <p>
                  Shreeji Panchkarma was founded on three principles that remain
                  unchanged today: <strong className="text-forest">authentic
                  classical protocols</strong>, <strong className="text-forest">
                  physician-led treatment</strong>, and <strong className="text-forest">
                  absolute ingredient integrity</strong>. The name &ldquo;Shreeji&rdquo;
                  — from the Sanskrit &ldquo;Shree&rdquo; meaning auspicious —
                  reflects the intention behind every treatment we offer.
                </p>
              </div>

              <div className="mt-8 pl-6 border-l-2 border-accent/50">
                <Quote size={20} className="text-accent/40 mb-2" aria-hidden="true" />
                <p className="font-lora italic text-forest text-lg leading-relaxed">
                  &ldquo;I did not come back to Sonipat to run a business. I came
                  back to heal my people.&rdquo;
                </p>
                <p className="font-raleway text-sm text-forest-muted mt-2">
                  — Dr. Rajesh Sharma, Founder
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="grid grid-cols-2 gap-4"
            >
              {QUICK_FACTS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_OUT }}
                  className="rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)` }}
                >
                  <p className="font-raleway text-white/60 text-xs uppercase tracking-wider mb-2">
                    {card.label}
                  </p>
                  <p className="font-cormorant font-700 text-4xl text-white mb-1">
                    {card.value}
                  </p>
                  <p className="font-raleway text-white/60 text-xs">{card.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-section relative">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider bg-accent/10 text-accent-dark">
              <Clock size={12} aria-hidden="true" /> 15 years of growth
            </div>
            <h2
              className="font-cormorant font-600 text-forest mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Our journey through the years
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
            <p className="font-raleway text-forest-muted max-w-lg mx-auto text-sm leading-relaxed">
              Every milestone earned through results, not marketing. Every year a
              new chapter in the same uncompromising story.
            </p>
          </motion.div>

          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent -translate-x-1/2"
              aria-hidden="true"
            />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCTOR SECTION ───────────────────────────────────────────── */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider bg-primary/8 text-primary">
              <Stethoscope size={12} aria-hidden="true" /> The physician
            </div>
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Meet Dr. Rajesh Sharma
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className="bg-white rounded-3xl overflow-hidden border border-cream-section shadow-card-hover"
            >
              <div className="grid md:grid-cols-5">
                <div
                  className="md:col-span-2 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(155deg, #1B4332, #2D6A4F, #40916C)",
                    minHeight: 380,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <div className="w-28 h-28 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center mb-5">
                      <span className="font-cormorant font-700 text-white text-4xl">
                        RS
                      </span>
                    </div>
                    <h3 className="font-cormorant font-700 text-white text-2xl mb-1">
                      Dr. Rajesh Sharma
                    </h3>
                    <p className="font-raleway text-white/70 text-sm mb-4">
                      Chief Ayurvedic Physician
                    </p>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <span className="text-xs bg-white/15 text-white px-3 py-1 rounded-full font-raleway">
                        BAMS
                      </span>
                      <span className="text-xs bg-white/15 text-white px-3 py-1 rounded-full font-raleway">
                        MD Panchakarma
                      </span>
                      <span className="text-xs bg-accent/30 text-accent-soft px-3 py-1 rounded-full font-raleway">
                        20+ years
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-8 md:p-10">
                  <blockquote className="font-lora italic text-forest text-xl leading-relaxed mb-7 border-l-2 border-accent/40 pl-5">
                    &ldquo;Ayurveda is not alternative medicine. It is the
                    original medicine. Our job is not to modernise it — our job
                    is to practice it correctly.&rdquo;
                  </blockquote>

                  <div className="space-y-3 mb-7">
                    {DOCTOR_CREDENTIALS.map((c) => (
                      <div key={c} className="flex items-start gap-3">
                        <CheckCircle
                          size={15}
                          className="text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-raleway text-sm text-forest-muted">
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
                    >
                      Book with Dr. Sharma <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <a
                      href="tel:+919876543210"
                      className="inline-flex items-center gap-2 border border-primary/30 text-primary px-6 py-3 rounded-full font-raleway font-500 text-sm hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
                    >
                      <Phone size={14} aria-hidden="true" /> +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider bg-accent/10 text-accent-dark">
              <Heart size={12} aria-hidden="true" /> Our core beliefs
            </div>
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Our healing philosophy
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
            <p className="font-raleway text-forest-muted max-w-xl mx-auto text-sm leading-relaxed">
              Four non-negotiable principles that have guided every treatment
              since 2009. They are not marketing copy — they are the operating
              system of this clinic.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY.map((item, i) => (
              <PhilosophyCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #1B4332 0%, #2D6A4F 60%, #1B4332 100%)" }}
      >
        <div className="container-custom relative z-10">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider"
              style={{ background: "rgba(201,168,76,.15)", color: "#C9A84C" }}
            >
              <Award size={12} aria-hidden="true" /> Verified & certified
            </div>
            <h2
              className="font-cormorant font-600 text-white mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Certifications & credentials
            </h2>
            <SanskritDivider color="rgba(201,168,76,0.4)" />
            <p className="font-raleway text-white/55 max-w-lg mx-auto text-sm mt-4 leading-relaxed">
              Every certification represents years of clinical excellence and
              adherence to the highest standards of Ayurvedic practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => {
              const CIcon = CERT_ICONS[cert.iconKey];
              return (
                <motion.div
                  key={cert.name}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: EASE_OUT }}
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 border border-white/10 transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,.06)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <CIcon size={18} className="text-accent" aria-hidden="true" />
                  </div>
                  <p className="font-raleway text-sm text-white/80">{cert.name}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider bg-primary/8 text-primary">
              <Star size={12} aria-hidden="true" /> Patient stories
            </div>
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              What our patients say
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE_OUT }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-cream-section shadow-card-hover mb-6"
              >
                <Quote size={36} className="text-accent/25 mb-5" aria-hidden="true" />
                <p className="font-lora italic text-forest text-lg md:text-xl leading-relaxed mb-8">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="font-cormorant font-700 text-white text-xl">
                      {TESTIMONIALS[activeTestimonial].name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-cormorant font-700 text-forest text-xl">
                      {TESTIMONIALS[activeTestimonial].name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <div className="flex gap-0.5" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-forest-muted text-xs font-raleway">·</span>
                      <span className="font-raleway text-sm text-forest-muted">
                        {TESTIMONIALS[activeTestimonial].condition}
                      </span>
                      <span className="text-forest-muted text-xs font-raleway">·</span>
                      <span className="font-raleway text-sm text-forest-muted flex items-center gap-1">
                        <MapPin size={11} aria-hidden="true" /> {TESTIMONIALS[activeTestimonial].city}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2" role="tablist" aria-label="Patient testimonials">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  role="tab"
                  aria-selected={i === activeTestimonial}
                  aria-label={`Testimonial from ${t.name}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeTestimonial
                      ? "w-7 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-primary/25 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 text-xs font-raleway font-600 uppercase tracking-wider bg-accent/10 text-accent-dark">
              <MapPin size={12} aria-hidden="true" /> Find us
            </div>
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Visit our clinic
            </h2>
            <p className="font-raleway text-forest-muted text-sm">
              Serving patients from Sonipat, Delhi, Gurgaon, Noida, Panipat,
              Rohtak and across Haryana.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: MapPin,
                title: "Address",
                lines: ["Near Railway Station, Model Town", "Sonipat, Haryana – 131001"],
              },
              {
                icon: Clock,
                title: "Hours",
                lines: ["Mon–Sat: 9:00 AM – 7:00 PM", "Sunday: 10:00 AM – 2:00 PM"],
              },
              {
                icon: Phone,
                title: "Contact",
                lines: ["+91 98765 43210", "info@shreejipanchkarma.com"],
              },
            ].map((item, i) => {
              const IIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_OUT }}
                  className="bg-white rounded-2xl p-7 border border-cream-section shadow-card text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                    <IIcon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-cormorant font-600 text-forest text-xl mb-3">
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p
                      key={line}
                      className="font-raleway text-forest-muted text-sm leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ (SEO) ────────────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center mb-12"
          >
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Frequently asked questions
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #0D2B1E 0%, #1B4332 50%, #2D6A4F 100%)" }}
      >
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <p className="font-lora italic text-accent text-xl mb-4 leading-relaxed">
              &ldquo;शरीरमाद्यं खलु धर्मसाधनम्&rdquo;
            </p>
            <p className="font-raleway text-white/45 text-sm mb-8">
              &ldquo;The body is indeed the primary instrument of all virtuous
              acts.&rdquo; — Charaka Samhita
            </p>
            <h2
              className="font-cormorant font-700 text-white mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Your healing journey
              <br />
              begins with one call
            </h2>
            <p className="font-raleway text-white/60 text-base leading-relaxed mb-10">
              15 years. 10,000+ patients. One commitment: the most authentic
              Panchakarma treatment in Haryana and Delhi NCR. Book your free
              consultation with Dr. Sharma today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-raleway font-700 text-sm transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "#C9A84C",
                  color: "#1B4332",
                  boxShadow: "0 12px 32px rgba(201,168,76,.35)",
                }}
              >
                Book free consultation <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-raleway font-500 text-sm border border-white/25 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                Explore treatments
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {["AYUSH certified", "15+ years", "Free consultation", "10,000+ patients"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-raleway font-500"
                    style={{
                      background: "rgba(255,255,255,.08)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "rgba(255,255,255,.7)",
                    }}
                  >
                    <CheckCircle size={11} className="text-accent" aria-hidden="true" />
                    {badge}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}