"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Leaf, Scale, Brain, Sparkles, PersonStanding, Activity, ArrowRight } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import ParallaxLayer from "@/components/shared/ParallaxLayer";
import { treatments } from "@/lib/treatments";

// ─── Story Section ──────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "2009", event: "Clinic Founded in Sonipat" },
  { year: "2012", event: "First 1,000 Patients Healed" },
  { year: "2018", event: "AYUSH Ministry Certified" },
  { year: "2022", event: "Expanded to Delhi NCR" },
  { year: "2024", event: "Online Store Launched" },
];

export function StorySection() {
  return (
    <section id="story" className="section-padding bg-cream-section relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.05] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 300 300" fill="#2D6A4F">
          <path d="M150 20 Q220 80 200 160 Q180 240 100 260 Q20 280 30 180 Q40 80 150 20Z" />
        </svg>
      </div>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Quote */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -top-4 -left-2 text-7xl font-cormorant text-primary/10 leading-none select-none" aria-hidden="true">"</div>
              <blockquote className="font-lora italic text-xl md:text-2xl text-forest leading-relaxed pl-5 border-l-2 border-accent/50">
                True healing does not merely remove disease — it restores the harmony of body, mind, and the eternal spirit.
              </blockquote>
              <p className="mt-4 pl-5 text-sm font-raleway text-forest-muted font-500">
                — Dr. Rajesh Sharma, Chief Physician, Shreeji Panchkarma
              </p>
            </div>
          </AnimatedSection>

          {/* Narrative + Timeline */}
          <AnimatedSection direction="right" delay={0.15}>
            <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">Our Origin Story</p>
            <h2 className="font-cormorant font-600 text-forest mb-5" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
              Born from the Wisdom<br />of Ancient Haryana
            </h2>
            <div className="space-y-3 text-forest-muted font-raleway text-sm md:text-base leading-relaxed mb-8">
              <p>In 2009, Dr. Rajesh Sharma returned from Banaras Hindu University with a single purpose: to bring authentic, undiluted Ayurvedic Panchakarma healing to the people of Sonipat and Haryana.</p>
              <p>What began as a modest clinic in Model Town has grown into Haryana's most trusted Ayurvedic wellness center, serving patients from Sonipat, Delhi, Gurgaon, Noida and across India.</p>
            </div>
            {/* Timeline */}
            <div className="flex flex-wrap gap-x-0 gap-y-3">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex items-start gap-0 flex-shrink-0">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent mt-1 flex-shrink-0" />
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-accent/20 min-h-[32px]" />}
                  </div>
                  <div className="mr-5 mb-1">
                    <p className="font-cormorant font-700 text-accent text-lg leading-none">{item.year}</p>
                    <p className="font-raleway text-xs text-forest-muted mt-0.5 leading-snug max-w-[90px]">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy Section ─────────────────────────────────────────────────────

const DOSHAS = [
  {
    name: "Vata",
    elements: "Air + Space",
    governs: "Movement, circulation, nervous system",
    treatments: ["Abhyanga", "Basti", "Shirodhara"],
    accentColor: "#74C69D",
    desc: "When Vata is imbalanced, you may experience anxiety, insomnia, joint pain, and irregular digestion.",
  },
  {
    name: "Pitta",
    elements: "Fire + Water",
    governs: "Digestion, metabolism, intellect",
    treatments: ["Virechana", "Takradhara", "Pinda Sweda"],
    accentColor: "#C9A84C",
    desc: "Excess Pitta manifests as inflammation, skin diseases, acidity, and emotional anger.",
  },
  {
    name: "Kapha",
    elements: "Earth + Water",
    governs: "Structure, stability, immunity",
    treatments: ["Udvartana", "Nasya", "Vamana"],
    accentColor: "#40916C",
    desc: "Kapha imbalance brings weight gain, sluggishness, respiratory issues, and depression.",
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}>
      {/* Faint lotus */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="w-[500px] h-[500px]" fill="white">
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <ellipse key={i} cx="200" cy="130" rx="30" ry="80" transform={`rotate(${a} 200 200)`} />
          ))}
          <circle cx="200" cy="200" r="50" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent/70 mb-4">Ayurvedic Wisdom</p>
          <ParallaxLayer speed={0.12} className="inline-block">
            <p className="devanagari text-3xl md:text-5xl text-white/90 mb-3 font-lora">
              शरीरमाद्यं खलु धर्मसाधनम्
            </p>
          </ParallaxLayer>
          <p className="font-lora italic text-white/60 text-base md:text-lg mb-1">
            "The body is indeed the primary instrument of all virtuous acts."
          </p>
          <p className="font-raleway text-white/35 text-sm">— Charaka Samhita</p>
          <SanskritDivider color="rgba(201,168,76,0.4)" className="mt-7" />
          <h2 className="font-cormorant font-600 text-white mt-6 mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            The Three Pillars of Ayurvedic Healing
          </h2>
          <p className="font-raleway text-white/55 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Every person has a unique constitution (Prakriti) determined by the balance of three biological forces — the Doshas. All disease arises from their imbalance.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-5" staggerDelay={0.1}>
          {DOSHAS.map((dosha) => (
            <StaggerItem key={dosha.name}>
              <div
                className="rounded-2xl p-6 h-full transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: `1px solid ${dosha.accentColor}30`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${dosha.accentColor}20`, border: `1px solid ${dosha.accentColor}40` }}
                  >
                    <Leaf size={18} style={{ color: dosha.accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-cormorant font-700 text-white text-2xl leading-none">{dosha.name}</h3>
                    <p className="font-raleway text-xs font-500 mt-0.5" style={{ color: dosha.accentColor }}>{dosha.elements}</p>
                  </div>
                </div>
                <p className="font-raleway text-white/45 text-xs uppercase tracking-wider mb-1.5">Governs</p>
                <p className="font-raleway text-white/75 text-sm mb-4 leading-relaxed">{dosha.governs}</p>
                <p className="font-raleway text-white/55 text-sm leading-relaxed mb-5">{dosha.desc}</p>
                <div>
                  <p className="font-raleway text-white/35 text-xs uppercase tracking-wider mb-2">Our Treatments</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dosha.treatments.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-raleway px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${dosha.accentColor}20`, color: dosha.accentColor }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Stats Section ───────────────────────────────────────────────────────────

const STATS = [
  { value: 10000, suffix: "+", label: "Patients Healed", sublabel: "Across Delhi NCR & Haryana" },
  { value: 15, suffix: "+", label: "Years of Excellence", sublabel: "Est. 2009 in Sonipat" },
  { value: 50, suffix: "+", label: "Ayurvedic Products", sublabel: "Handcrafted in-house" },
  { value: 6, suffix: "", label: "Specialties", sublabel: "AYUSH Certified treatments" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const step = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #92400E 0%, #B45309 100%)" }}>
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-cormorant font-600 text-cream text-3xl md:text-5xl">
            15 Years of Healing in Numbers
          </h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" staggerDelay={0.1}>
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center">
                <div className="font-cormorant font-700 text-cream mb-2" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-raleway font-600 text-cream/90 text-sm md:text-base mb-1">{stat.label}</p>
                <p className="font-raleway text-cream/50 text-xs">{stat.sublabel}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ─── Treatments Preview ──────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Leaf, Scale, Brain, Sparkles, PersonStanding, Activity,
};

export function TreatmentsPreview() {
  return (
    <section id="treatments" className="section-padding bg-cream relative">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">Our Specialities</p>
          <h2 className="font-cormorant font-600 text-forest mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            Healing Protocols Designed for You
          </h2>
          <SanskritDivider color="#C9A84C" className="my-4" />
          <p className="font-raleway text-forest-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Each protocol is individually designed after a detailed Prakriti assessment. No generic packages — only what your body truly needs.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.07}>
          {treatments.map((t, i) => {
            const Icon = ICON_MAP[t.icon] || Leaf;
            return (
              <StaggerItem key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="group block h-full">
                  <div className="h-full bg-white rounded-2xl border border-cream-section p-6 hover:border-primary/30 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-200 flex-shrink-0">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <span className="font-cormorant font-300 text-4xl text-primary/10 leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-cormorant font-600 text-forest text-xl mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="font-raleway text-accent text-xs font-500 mb-3">{t.tagline}</p>
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed mb-5 flex-1 line-clamp-3">{t.shortDesc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-cream-section mt-auto">
                      <div>
                        <p className="font-raleway text-xs text-forest-muted/60">{t.duration}</p>
                        <p className="font-raleway text-sm font-600 text-primary">{t.priceRange}</p>
                      </div>
                      <span className="flex items-center gap-1 text-primary text-sm font-500 font-raleway group-hover:gap-2 transition-all">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-10">
          <Link href="/treatments" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors duration-200 shadow-green-glow cursor-pointer">
            View All Treatments <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
