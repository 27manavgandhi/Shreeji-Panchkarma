import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import {
  StorySection,
  PhilosophySection,
  StatsSection,
  TreatmentsPreview,
} from "@/components/home/Sections";
import ProductsTeaser from "@/components/home/ProductsTeaser";
import {
  TestimonialsSection,
  DoctorSection,
  BlogPreview,
  CTASection,
} from "@/components/home/ExtraSections";
import { faqSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Shreeji Panchkarma | Authentic Panchakarma Treatment Center Sonipat, Haryana",
  description:
    "Shreeji Panchkarma — Haryana's most trusted AYUSH-certified Ayurvedic center. Authentic Panchakarma treatments, Shirodhara, Kati Basti & Ayurvedic products. Serving Sonipat, Delhi NCR since 2009. Book free consultation.",
  keywords:
    "panchkarma center sonipat, ayurvedic treatment sonipat haryana, best panchkarma clinic delhi ncr, ayurvedic doctor sonipat, panchakarma treatment near me haryana, authentic panchkarma haryana",
  openGraph: {
    title: "Shreeji Panchkarma | Authentic Panchakarma Treatment — Sonipat",
    description:
      "Haryana's most trusted AYUSH-certified Panchakarma center. 10,000+ patients healed since 2009.",
    url: "https://shreejipanchkarma.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://shreejipanchkarma.com" },
};

const homeFaqs = [
  {
    question: "What is Panchakarma treatment?",
    answer:
      "Panchakarma is Ayurveda's most comprehensive detoxification and rejuvenation programme. It consists of five therapeutic procedures (Vamana, Virechana, Basti, Nasya, Raktamokshana) that cleanse the body at a cellular level, eliminate accumulated toxins (ama), and restore doshic balance. At Shreeji Panchkarma in Sonipat, each programme is individually designed.",
  },
  {
    question:
      "How long does Panchakarma treatment take at Shreeji Panchkarma?",
    answer:
      "Treatment duration depends on your condition and constitution. A basic Panchakarma programme at our Sonipat center takes 7–21 days. The preparation phase (Purvakarma) takes 3–7 days, the main procedures 3–7 days, and recovery (Paschatkarma) 3–7 days. Our physician will give you a personalised timeline after consultation.",
  },
  {
    question:
      "Is Shreeji Panchkarma clinic in Sonipat AYUSH certified?",
    answer:
      "Yes. Shreeji Panchkarma is fully certified by the Ministry of AYUSH, Government of India. Our chief physician Dr. Rajesh Sharma holds BAMS and MD (Panchakarma) from Banaras Hindu University and is a registered Ayurvedic practitioner.",
  },
  {
    question:
      "Do you serve patients from Delhi, Gurgaon, and Delhi NCR?",
    answer:
      "Yes. We regularly treat patients from Delhi, Gurgaon, Noida, Faridabad, Panipat, Rohtak, and across Delhi NCR. Many patients travel from these cities specifically for our authentic Panchakarma protocols, which are difficult to find in urban clinics.",
  },
  {
    question: "What is the cost of Panchakarma treatment in Sonipat?",
    answer:
      "The cost varies by treatment type and duration. A single Shirodhara session starts at ₹2,500. A full Panchakarma programme ranges from ₹5,000 to ₹45,000 depending on duration and procedures included. We offer transparent pricing with no hidden costs. Call us for a personalised quote.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <TreatmentsPreview />
      <StatsSection />
      <ProductsTeaser />
      <DoctorSection />
      <TestimonialsSection />
      <BlogPreview />
      <CTASection />
    </>
  );
}
