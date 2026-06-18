import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, IndianRupee, ArrowRight, Leaf } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { getTreatmentBySlug, treatments } from "@/lib/treatments";
import { generatePageMetadata, treatmentSchema, breadcrumbSchema } from "@/lib/seo";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) return {};
  return generatePageMetadata({
    title: `${treatment.name} in Sonipat, Haryana — ${treatment.tagline}`,
    description: `${treatment.name} at Shreeji Panchkarma, Sonipat. ${treatment.shortDesc} AYUSH certified. Duration: ${treatment.duration}. Starting ${treatment.priceRange}. Book today.`,
    keywords: [
      `${treatment.name.toLowerCase()} sonipat`,
      `${treatment.name.toLowerCase()} haryana`,
      `${treatment.name.toLowerCase()} treatment delhi ncr`,
      `authentic ${treatment.name.toLowerCase()}`,
    ],
    path: `/treatments/${params.slug}`,
  });
}

export default function TreatmentPage({ params }: Props) {
  const treatment = getTreatmentBySlug(params.slug);
  if (!treatment) notFound();

  const related = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3);
  const schema = treatmentSchema(treatment);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treatments", url: "/treatments" },
    { name: treatment.name, url: `/treatments/${treatment.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="min-h-[55vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-end pt-28 relative overflow-hidden">
        <div className="container-custom pb-16 relative z-10">
          <AnimatedSection>
            <Link href="/treatments" className="inline-flex items-center gap-1.5 text-accent/80 hover:text-accent text-sm font-raleway mb-6 transition-colors">
              ← All Treatments
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-raleway font-500 tracking-widest uppercase text-white/50">
                {treatment.duration} · {treatment.priceRange}
              </span>
            </div>
            <h1 className="font-cormorant font-700 text-white mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              {treatment.name}
            </h1>
            <p className="font-lora italic text-accent text-xl mb-6">{treatment.tagline}</p>
            <p className="font-raleway text-white/70 text-base max-w-2xl leading-relaxed">
              {treatment.shortDesc}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What is it */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="font-cormorant font-600 text-forest text-4xl mb-6">
                What is {treatment.name}?
              </h2>
              <p className="font-raleway text-forest-muted text-base leading-relaxed mb-8">
                {treatment.fullDesc}
              </p>
              <SanskritDivider color="#C9A84C" size="sm" className="my-8" />
            </AnimatedSection>

            {/* Process */}
            <AnimatedSection delay={0.1}>
              <h2 className="font-cormorant font-600 text-forest text-3xl mb-8">
                The Treatment Process
              </h2>
              <div className="space-y-6">
                {treatment.process.map((step, i) => (
                  <div key={step.step} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-cormorant font-700 text-primary text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-cormorant font-600 text-forest text-xl mb-1">{step.title}</h3>
                      <p className="font-raleway text-forest-muted text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits + Conditions */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefits */}
            <AnimatedSection direction="left">
              <h2 className="font-cormorant font-600 text-forest text-3xl mb-6">
                Key Benefits
              </h2>
              <div className="space-y-3">
                {treatment.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Conditions Treated */}
            <AnimatedSection direction="right">
              <h2 className="font-cormorant font-600 text-forest text-3xl mb-6">
                Conditions Treated
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {treatment.conditions.map((c) => (
                  <span key={c} className="bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-raleway">
                    {c}
                  </span>
                ))}
              </div>

              {/* Suitable For */}
              <h3 className="font-cormorant font-600 text-forest text-2xl mb-4">Suitable For</h3>
              <div className="space-y-2 mb-6">
                {treatment.suitableFor.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="font-raleway text-forest-muted text-sm">{s}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-cormorant font-600 text-forest text-2xl mb-4">Avoid If</h3>
              <div className="space-y-2">
                {treatment.avoidIf.map((a) => (
                  <div key={a} className="flex items-start gap-2">
                    <XCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="font-raleway text-forest-muted text-sm">{a}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-chapter-1">
        <div className="container-custom max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="font-cormorant font-600 text-white text-4xl mb-6">Duration & Pricing</h2>
            <div className="bg-white/10 rounded-2xl border border-white/20 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock size={18} className="text-accent" />
                  </div>
                  <p className="font-raleway text-white/60 text-xs uppercase tracking-wider mb-1">Duration</p>
                  <p className="font-cormorant font-600 text-white text-3xl">{treatment.duration}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <IndianRupee size={18} className="text-accent" />
                  </div>
                  <p className="font-raleway text-white/60 text-xs uppercase tracking-wider mb-1">Price Range</p>
                  <p className="font-cormorant font-600 text-accent text-3xl">{treatment.priceRange}</p>
                </div>
              </div>
              <p className="font-raleway text-white/50 text-sm mb-6">
                Final pricing depends on your specific protocol, session count, and physician assessment. All consultations are free.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-forest px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-accent-soft transition-colors cursor-pointer"
              >
                Book Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-cormorant font-600 text-forest text-4xl">Related Treatments</h2>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {related.map((t) => (
              <StaggerItem key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-cream-section p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                    <h3 className="font-cormorant font-600 text-forest text-xl mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="font-raleway text-accent text-xs font-500 mb-3">{t.tagline}</p>
                    <p className="font-raleway text-forest-muted text-sm line-clamp-2 mb-4">{t.shortDesc}</p>
                    <span className="text-primary text-sm font-500 font-raleway flex items-center gap-1">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
