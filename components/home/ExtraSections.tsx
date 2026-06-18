"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle, ArrowRight, Phone, MapPin, Mail, Clock } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";

// ─── Testimonials ────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  { name: "Nitin Rana", initials: "NR", condition: "Chronic Back Pain", city: "Sonipat", rating: 5, quote: "After years of dependency on painkillers for my lumbar spondylosis, just 14 days of Kati Basti at Shreeji Panchkarma gave me relief I never thought possible. Dr. Sharma's protocol was precise and the results were life-changing." },
  { name: "Sumit Kaushik", initials: "SK", condition: "Psoriasis Treatment", city: "Delhi", rating: 5, quote: "I had been suffering from psoriasis for 8 years and tried everything. Three weeks of Panchakarma at Shreeji completely transformed my skin. The herbs they use are genuinely authentic — not the diluted versions most clinics use." },
  { name: "Rajesh Kumar", initials: "RK", condition: "Anxiety & Insomnia", city: "Gurgaon", rating: 5, quote: "Shirodhara completely changed my relationship with sleep and stress. After 7 sessions, my cortisol levels normalized, my sleep improved dramatically, and the chronic anxiety I had carried for years simply dissolved." },
  { name: "Pardeep Kumar", initials: "PK", condition: "Weight Management", city: "Faridabad", rating: 5, quote: "Lost 18kg over 3 months with Shreeji's Ayurvedic weight management protocol. My thyroid levels improved, energy went up, and I have maintained the weight for over a year now." },
  { name: "Nitesh Kumar", initials: "NK", condition: "Knee Arthritis", city: "Panipat", rating: 5, quote: "My orthopedic surgeon suggested knee replacement surgery. After 14 sessions of Janu Basti at Shreeji Panchkarma, I can walk without pain and have avoided surgery entirely." },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="section-padding bg-cream relative overflow-hidden">
      {/* Lotus watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="w-[460px] h-[460px]" fill="#2D6A4F">
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <ellipse key={i} cx="200" cy="130" rx="30" ry="80" transform={`rotate(${a} 200 200)`} />
          ))}
          <circle cx="200" cy="200" r="40" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">Patient Stories</p>
          <h2 className="font-cormorant font-600 text-forest mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            Stories of Healing
          </h2>
          <SanskritDivider color="#C9A84C" className="my-4" />
        </AnimatedSection>

        <div className="max-w-3xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 md:p-10 shadow-card border border-cream-section"
            >
              <Quote size={28} className="text-accent/30 mb-4" />
              <p className="font-lora italic text-forest text-base md:text-xl leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <span className="font-cormorant font-700 text-white text-lg md:text-xl">{t.initials}</span>
                </div>
                <div>
                  <p className="font-cormorant font-700 text-forest text-lg md:text-xl">{t.name}</p>
                  <p className="font-raleway text-sm text-forest-muted">{t.condition} · {t.city}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); }}
                aria-label={`Testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${i === current ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-primary/25 hover:bg-primary/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Doctor Section ──────────────────────────────────────────────────────────

const CREDENTIALS = [
  "BAMS (Bachelor of Ayurvedic Medicine & Surgery)",
  "MD Panchakarma — Banaras Hindu University",
  "20+ Years Clinical Practice",
  "AYUSH Ministry Registered Physician",
  "Former Consultant — AIIMS Ayurveda Wing",
  "Published research on Panchakarma efficacy",
];

export function DoctorSection() {
  return (
    <section className="section-padding bg-cream-section">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">Our Physicians</p>
          <h2 className="font-cormorant font-600 text-forest mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            Meet Your Healers
          </h2>
          <SanskritDivider color="#C9A84C" className="my-4" />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-cream-section">
            <div className="grid md:grid-cols-5">
              {/* Photo */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center py-10 px-8 text-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 flex items-center justify-center mb-5 border-2 border-white/30">
                  <span className="font-cormorant font-700 text-white text-3xl md:text-4xl">RS</span>
                </div>
                <h3 className="font-cormorant font-700 text-white text-xl md:text-2xl mb-1">Dr. Rajesh Sharma</h3>
                <p className="font-raleway text-white/70 text-sm mb-4">Chief Ayurvedic Physician</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  <span className="text-xs bg-white/15 text-white px-3 py-1 rounded-full font-raleway">BAMS, MD</span>
                  <span className="text-xs bg-accent/30 text-accent-soft px-3 py-1 rounded-full font-raleway">20+ Years</span>
                </div>
              </div>
              {/* Info */}
              <div className="md:col-span-3 p-6 md:p-8">
                <blockquote className="font-lora italic text-forest text-base md:text-lg leading-relaxed mb-6 border-l-2 border-accent/40 pl-4">
                  "My mission has always been simple: to make authentic Ayurvedic healing accessible to every person in Haryana and Delhi NCR."
                </blockquote>
                <ul className="space-y-2.5">
                  {CREDENTIALS.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <CheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-raleway text-sm text-forest-muted">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer">
                    Book with Dr. Sharma <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────

const BLOG_PREVIEWS = [
  {
    slug: "panchkarma-benefits-haryana",
    category: "Panchakarma",
    title: "7 Life-Changing Benefits of Panchakarma Treatment in Haryana",
    excerpt: "Discover why thousands in Sonipat, Delhi and Haryana are choosing authentic Panchakarma to transform their health.",
    readTime: "6 min read",
    categoryColor: "bg-primary/10 text-primary",
  },
  {
    slug: "ayurvedic-treatment-sonipat",
    category: "Ayurveda",
    title: "Why Sonipat is Becoming Haryana's Ayurvedic Wellness Capital",
    excerpt: "Sonipat is quietly emerging as the most important centre for authentic Ayurvedic treatment in Haryana.",
    readTime: "5 min read",
    categoryColor: "bg-accent/10 text-accent-dark",
  },
  {
    slug: "best-panchkarma-center-delhi-ncr",
    category: "Guide",
    title: "How to Choose the Best Panchakarma Center in Delhi NCR",
    excerpt: "A comprehensive buyer's guide to finding an authentic Panchakarma clinic in Delhi NCR.",
    readTime: "7 min read",
    categoryColor: "bg-secondary/20 text-primary-dark",
  },
];

export function BlogPreview() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">Ayurvedic Wisdom</p>
          <h2 className="font-cormorant font-600 text-forest mb-4" style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            Ayurvedic Wisdom for Modern Times
          </h2>
          <SanskritDivider color="#C9A84C" className="my-4" />
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.1}>
          {BLOG_PREVIEWS.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 h-full flex flex-col cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-cream-section via-cream-warm to-secondary/20 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-32 h-32" fill="#2D6A4F">
                        <path d="M100 20 Q160 60 150 120 Q140 180 80 190 Q20 200 20 130 Q20 60 100 20Z" />
                      </svg>
                    </div>
                    <span className={`absolute top-4 left-4 text-xs font-600 font-raleway px-3 py-1 rounded-full ${post.categoryColor}`}>{post.category}</span>
                  </div>
                  <div className="flex-1 p-5 flex flex-col">
                    <h3 className="font-cormorant font-600 text-forest text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="font-raleway text-sm text-forest-muted leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-cream-section">
                      <span className="text-xs text-forest-muted/60 font-raleway flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      <span className="text-xs text-primary font-500 font-raleway flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight size={11} /></span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-raleway font-600 text-sm transition-all duration-300 cursor-pointer">
            View All Articles <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

export function CTASection() {
  return (
    <section id="contact-strip" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <AnimatedSection direction="left">
            <p className="text-accent font-raleway font-500 text-xs tracking-widest uppercase mb-4">Begin Your Journey</p>
            <h2 className="font-cormorant font-600 text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Your Healing Starts<br />With One Conversation
            </h2>
            <p className="font-raleway text-white/65 text-sm md:text-base leading-relaxed mb-8">
              Every patient at Shreeji Panchkarma begins with a detailed consultation — no charge, no obligation. Dr. Sharma will assess your constitution and tell you exactly what your body needs.
            </p>
            <div className="space-y-4">
              {[
                { Icon: Phone, label: "Call or WhatsApp", value: "+91 98765 43210", href: "tel:+919876543210" },
                { Icon: MapPin, label: "Visit Us", value: "Near Railway Station, Model Town, Sonipat — 131001", href: undefined },
                { Icon: Mail, label: "Email", value: "info@shreejipanchkarma.com", href: "mailto:info@shreejipanchkarma.com" },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-raleway text-white/45 text-xs">{label}</p>
                    {href ? (
                      <a href={href} className="font-raleway font-500 text-white text-sm hover:text-accent transition-colors">{value}</a>
                    ) : (
                      <p className="font-raleway font-500 text-white text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right form */}
          <AnimatedSection direction="right" delay={0.15}>
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <h3 className="font-cormorant font-600 text-white text-2xl mb-5">Request Free Consultation</h3>
              <div className="space-y-4">
                {[
                  { label: "Your Name", type: "text", placeholder: "e.g. Rajesh Kumar" },
                  { label: "Phone / WhatsApp", type: "tel", placeholder: "+91 98765 43210" },
                  { label: "Email Address", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block font-raleway text-xs text-white/50 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/25 font-raleway text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-raleway text-xs text-white/50 mb-1.5">Treatment of Interest</label>
                  <select className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white font-raleway text-sm focus:outline-none focus:border-accent/50 transition-colors cursor-pointer">
                    <option value="" className="text-forest bg-white">Select treatment...</option>
                    {["Panchakarma","Weight Management","Shirodhara","Skin Therapy","Janu Basti","Kati Basti","General Consultation"].map(t => (
                      <option key={t} className="text-forest bg-white">{t}</option>
                    ))}
                  </select>
                </div>
                <Link href="/contact" className="block w-full text-center bg-accent hover:bg-accent-soft text-forest py-4 rounded-xl font-raleway font-600 text-sm transition-all duration-300 cursor-pointer mt-2">
                  Book Free Consultation →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
