import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Scale, Brain, Sparkles, PersonStanding, Activity, ArrowRight, Clock, IndianRupee } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { treatments } from "@/lib/treatments";
import { generatePageMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Ayurvedic Panchakarma Treatments in Sonipat, Haryana | Shreeji",
  description:
    "Authentic Panchakarma treatments in Sonipat — Shirodhara, Kati Basti, Janu Basti, Ayurvedic Weight Loss, Skin Therapy & more. AYUSH certified. Serving Sonipat, Delhi NCR, Haryana.",
  keywords: [
    "panchkarma treatments sonipat",
    "shirodhara sonipat haryana",
    "kati basti back pain sonipat",
    "janu basti knee pain haryana",
    "ayurvedic skin treatment delhi ncr",
    "ayurvedic weight loss sonipat",
  ],
  path: "/treatments",
});

const ICON_MAP: Record<string, React.ElementType> = {
  Leaf, Scale, Brain, Sparkles, PersonStanding, Activity,
};

const FAQS = [
  {
    question: "What is the difference between Panchakarma and a regular Ayurvedic massage?",
    answer:
      "A regular Ayurvedic massage (Abhyanga) is a preparatory procedure — it is only one part of Panchakarma. Panchakarma (five actions) includes Vamana (therapeutic emesis), Virechana (therapeutic purgation), Basti (medicated enema), Nasya (nasal administration), and Raktamokshana (bloodletting). These are medical procedures designed to eliminate toxins from specific channels of the body. At Shreeji Panchkarma, every procedure is performed by our physician.",
  },
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "This is exactly what our initial consultation is for. Dr. Rajesh Sharma assesses your Prakriti (body constitution), current dosha imbalance, health history, and specific complaints. Based on this, a personalised protocol is designed. We never apply generic treatment packages.",
  },
  {
    question: "Is Panchakarma safe? Are there any side effects?",
    answer:
      "Panchakarma performed by a qualified AYUSH-certified physician using authentic protocols is safe. However, it is a powerful medical intervention — not a spa treatment. Some patients experience fatigue or mild detox symptoms during treatment, which is normal and expected. This is why physician supervision is mandatory throughout. We do not advise self-administered Panchakarma.",
  },
  {
    question: "Can I get Panchakarma treatment if I have diabetes or hypertension?",
    answer:
      "Yes, many of our patients have diabetes or hypertension. In fact, Ayurvedic treatment can be highly effective for managing these conditions. However, the protocol must be carefully customised by our physician to account for your medications and current health status. Please bring all medical records to your first consultation.",
  },
  {
    question: "Do you offer outpatient treatments or only residential programmes?",
    answer:
      "We offer both. Most of our patients opt for daily outpatient sessions — arriving in the morning, receiving treatment, and returning home. For intensive programmes (full Panchakarma, 14-21 days), we can refer you to nearby accommodation. We currently do not have in-house residential facilities.",
  },
];

export default function TreatmentsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treatments", url: "/treatments" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      {/* Hero */}
      <section className="min-h-[50vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-end pt-28 relative overflow-hidden">
        <div className="container-custom pb-16 relative z-10">
          <AnimatedSection>
            <p className="text-accent font-raleway text-xs tracking-widest uppercase mb-4">AYUSH Certified</p>
            <h1 className="font-cormorant font-700 text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Authentic Panchakarma<br />Treatments in Sonipat
            </h1>
            <p className="font-raleway text-white/70 text-lg max-w-2xl leading-relaxed">
              Six physician-designed healing protocols based on classical Ayurvedic texts. Each treatment is customised to your Prakriti — never generic, never rushed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-cormorant font-600 text-forest mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Our Treatment Specialities
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" staggerDelay={0.08}>
            {treatments.map((t) => {
              const Icon = ICON_MAP[t.icon] || Leaf;
              return (
                <StaggerItem key={t.slug}>
                  <Link href={`/treatments/${t.slug}`} className="group block h-full">
                    <div className="h-full bg-white rounded-2xl border border-cream-section p-7 hover:border-primary/30 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 flex flex-col cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                        <Icon size={26} className="text-primary" />
                      </div>
                      <h2 className="font-cormorant font-600 text-forest text-2xl mb-1 group-hover:text-primary transition-colors">
                        {t.name}
                      </h2>
                      <p className="font-raleway text-accent text-xs font-500 mb-3">{t.tagline}</p>
                      <p className="font-raleway text-forest-muted text-sm leading-relaxed mb-5 flex-1">
                        {t.shortDesc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {t.conditions.slice(0, 3).map((c) => (
                          <span key={c} className="text-xs bg-primary/8 text-primary px-3 py-1 rounded-full font-raleway">
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-cream-section flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-xs text-forest-muted font-raleway">
                            <Clock size={11} /> {t.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-600 text-primary font-raleway">
                            <IndianRupee size={13} /> {t.priceRange.replace("₹", "")}
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-primary text-sm font-500 font-raleway group-hover:gap-2 transition-all">
                          Book Now <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-cormorant font-600 text-forest text-4xl mb-3">Frequently Asked Questions</h2>
            <SanskritDivider color="#C9A84C" />
          </AnimatedSection>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-6 border border-cream-section">
                  <h3 className="font-cormorant font-600 text-forest text-xl mb-3">{faq.question}</h3>
                  <p className="font-raleway text-forest-muted text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-custom max-w-xl">
          <AnimatedSection>
            <h2 className="font-cormorant font-600 text-white text-4xl mb-4">Ready to Begin?</h2>
            <p className="font-raleway text-white/70 mb-8">
              Book a free consultation with Dr. Rajesh Sharma. He will assess your Prakriti and design the precise healing protocol your body needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-forest px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-accent-soft transition-colors cursor-pointer"
            >
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
