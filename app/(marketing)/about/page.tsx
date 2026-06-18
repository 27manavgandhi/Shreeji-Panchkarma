import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Award, Users, Clock, ArrowRight } from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us — Our Story & Legacy | Shreeji Panchkarma Sonipat",
  description:
    "Learn about Shreeji Panchkarma — Haryana's most trusted Ayurvedic center since 2009. Meet Dr. Rajesh Sharma, our AYUSH-certified physicians, and our philosophy of authentic healing.",
  keywords: [
    "about shreeji panchkarma",
    "ayurvedic doctor sonipat",
    "dr rajesh sharma panchkarma",
    "ayush certified clinic haryana",
  ],
  path: "/about",
});

const TIMELINE = [
  {
    year: "2009",
    title: "Founded in Sonipat",
    desc: "Dr. Rajesh Sharma opened Shreeji Panchkarma in Model Town, Sonipat with a mission to provide authentic, undiluted Ayurvedic healing to Haryana.",
  },
  {
    year: "2012",
    title: "First 1,000 Patients",
    desc: "Word spread across Sonipat and neighbouring districts. Our authentic protocols and genuine results built a reputation that no advertising could buy.",
  },
  {
    year: "2015",
    title: "Expanded Facility",
    desc: "Growing demand necessitated a full facility expansion — 8 dedicated treatment rooms, a herbal pharmacy, and a dedicated consultation wing.",
  },
  {
    year: "2018",
    title: "AYUSH Ministry Certification",
    desc: "Shreeji Panchkarma received full certification from the Ministry of AYUSH, Government of India — validating our protocols and standards.",
  },
  {
    year: "2022",
    title: "Delhi NCR Reach",
    desc: "Patients from Delhi, Gurgaon, Noida and Faridabad began travelling to Sonipat specifically for our treatments. We expanded consultation hours to accommodate them.",
  },
  {
    year: "2024",
    title: "Online Store & Digital",
    desc: "Our handcrafted Ayurvedic products are now available online, extending our healing beyond the clinic walls to homes across India.",
  },
];

const CERTIFICATIONS = [
  "Ministry of AYUSH — Government of India",
  "Central Council of Indian Medicine (CCIM)",
  "Indian Medical Association — Ayurvedic Division",
  "National Medicinal Plants Board",
  "FSSAI Certified Food Products",
  "ISO 9001:2015 Quality Management",
];

const PHILOSOPHY = [
  {
    title: "Prakriti-First Approach",
    desc: "Every treatment begins with a detailed Prakriti (body constitution) assessment. We never apply generic protocols — your healing plan is as unique as your fingerprint.",
    icon: "🌱",
  },
  {
    title: "Classical Texts Only",
    desc: "Our protocols follow the Charaka Samhita and Sushruta Samhita — the original Ayurvedic texts. We do not dilute, modify, or commercialise ancient wisdom for convenience.",
    icon: "📜",
  },
  {
    title: "Ingredient Integrity",
    desc: "Every herb we use is sourced directly from certified organic farms. Our in-house herbal pharmacy prepares fresh Kashayams, Ghritams and Taila daily — no pre-packaged shortcuts.",
    icon: "🌿",
  },
  {
    title: "Physician-Led Always",
    desc: "No treatment at Shreeji Panchkarma is administered without direct physician assessment and monitoring. We are a medical clinic, not a spa.",
    icon: "⚕️",
  },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="min-h-[55vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary-light flex items-end pb-0 pt-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg viewBox="0 0 600 600" className="w-full h-full" fill="white">
            <circle cx="300" cy="300" r="280" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>
        <div className="container-custom relative z-10 pb-16">
          <AnimatedSection>
            <p className="text-accent font-raleway text-xs tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-cormorant font-700 text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              A Legacy of Healing<br />Born in Haryana
            </h1>
            <p className="font-raleway text-white/70 text-lg max-w-2xl leading-relaxed">
              Since 2009, Shreeji Panchkarma has been the most trusted name in authentic Ayurvedic treatment in Sonipat, Haryana — serving 10,000+ patients with unwavering commitment to classical protocols.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story + Timeline */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <h2 className="font-cormorant font-600 text-forest text-4xl mb-6">
                The Story Behind the Clinic
              </h2>
              <div className="space-y-4 font-raleway text-forest-muted text-base leading-relaxed">
                <p>
                  In 2009, Dr. Rajesh Sharma returned from Banaras Hindu University with his MD in Panchakarma and a singular mission: to make genuine, classical Ayurvedic healing available to the people of Haryana — particularly those in Sonipat, who previously had to travel to Delhi or Rishikesh for authentic treatment.
                </p>
                <p>
                  What he found on returning home was a landscape of diluted Ayurveda — clinics that called themselves "Panchakarma centers" but administered oil massages and called it Abhyanga. He set out to change that.
                </p>
                <p>
                  Shreeji Panchkarma was built on three principles that remain unchanged today: authentic classical protocols, physician-led treatment, and absolute ingredient integrity. The name "Shreeji" — derived from the Sanskrit "Shree" meaning auspicious — reflects the intention behind every treatment we offer.
                </p>
                <p>
                  Today, patients travel from Delhi, Gurgaon, Noida, Rohtak, Panipat and across India to receive treatment at our Sonipat center. Our protocols are taught in Ayurvedic colleges as case studies. And our herbal formulations are trusted in thousands of homes.
                </p>
              </div>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="relative pl-8 border-l-2 border-accent/30 space-y-8">
                {TIMELINE.map((item) => (
                  <div key={item.year} className="relative">
                    <div className="absolute -left-[2.65rem] w-5 h-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <p className="font-cormorant font-700 text-accent text-2xl leading-none mb-1">
                      {item.year}
                    </p>
                    <p className="font-raleway font-600 text-forest text-base mb-1">{item.title}</p>
                    <p className="font-raleway text-sm text-forest-muted leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-14">
            <h2 className="font-cormorant font-600 text-forest mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Our Healing Philosophy
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
            <p className="font-raleway text-forest-muted max-w-xl mx-auto text-base">
              Four principles that have guided every treatment at Shreeji Panchkarma since 2009.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {PHILOSOPHY.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white rounded-2xl p-7 border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-cormorant font-600 text-forest text-xl mb-3">{p.title}</h3>
                  <p className="font-raleway text-forest-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-chapter-1">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-cormorant font-600 text-white text-4xl mb-3">
              Certifications & Credentials
            </h2>
            <SanskritDivider color="rgba(201,168,76,0.5)" />
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {CERTIFICATIONS.map((cert) => (
              <StaggerItem key={cert}>
                <div className="flex items-center gap-3 bg-white/8 rounded-2xl px-5 py-4 border border-white/10">
                  <Award size={18} className="text-accent flex-shrink-0" />
                  <p className="font-raleway text-sm text-white/80">{cert}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream text-center">
        <div className="container-custom max-w-2xl">
          <AnimatedSection>
            <h2 className="font-cormorant font-600 text-forest text-4xl mb-4">
              Experience Authentic Healing
            </h2>
            <p className="font-raleway text-forest-muted mb-8 leading-relaxed">
              15 years of healing. 10,000+ patients. One commitment: the most authentic Ayurvedic Panchakarma treatment in Haryana and Delhi NCR.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer"
              >
                Book a Consultation <ArrowRight size={16} />
              </Link>
              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Explore Treatments
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
