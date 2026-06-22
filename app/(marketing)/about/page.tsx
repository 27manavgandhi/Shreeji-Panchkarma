import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us — Our Story & Legacy Since 2009 | Shreeji Panchkarma Sonipat",
  description:
    "Discover the 15-year story of Shreeji Panchkarma — Haryana's most trusted AYUSH-certified Ayurvedic clinic. Meet Dr. Rajesh Sharma, explore our classical healing philosophy, and see why 10,000+ patients from Delhi NCR trust us.",
  keywords: [
    "about shreeji panchkarma",
    "ayurvedic doctor sonipat",
    "dr rajesh sharma panchkarma",
    "ayush certified clinic haryana",
    "panchakarma center sonipat history",
    "best ayurvedic clinic delhi ncr",
    "classical ayurveda haryana",
  ],
  path: "/about",
});

const PHYSICIAN_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Rajesh Sharma",
  jobTitle: "Chief Ayurvedic Physician",
  description:
    "AYUSH-registered Ayurvedic physician with an MD in Panchakarma from Banaras Hindu University and 20+ years of clinical practice.",
  worksFor: {
    "@type": "MedicalClinic",
    name: "Shreeji Panchkarma",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Banaras Hindu University",
  },
};

const MEDICAL_ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Shreeji Panchkarma",
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    name: "Dr. Rajesh Sharma",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Railway Station, Model Town",
    addressLocality: "Sonipat",
    addressRegion: "Haryana",
    postalCode: "131001",
    addressCountry: "IN",
  },
  areaServed: ["Sonipat", "Delhi", "Gurgaon", "Noida", "Panipat", "Rohtak", "Faridabad"],
  medicalSpecialty: "Ayurveda",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Shreeji Panchkarma AYUSH certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Shreeji Panchkarma is fully certified by the Ministry of AYUSH, Government of India, along with credentials from the Central Council of Indian Medicine and ISO 9001:2015 quality certification.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the chief physician at Shreeji Panchkarma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dr. Rajesh Sharma, who holds a BAMS and an MD in Panchakarma from Banaras Hindu University, has led the clinic since founding it in 2009 and has over 20 years of clinical experience.",
      },
    },
    {
      "@type": "Question",
      name: "Do patients from Delhi NCR travel to Sonipat for treatment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Since 2022, patients regularly travel from Delhi, Gurgaon, Noida, Faridabad, Panipat and Rohtak for treatment at the Sonipat clinic, drawn by its classical, physician-led protocols.",
      },
    },
    {
      "@type": "Question",
      name: "What makes Shreeji Panchkarma different from other Ayurvedic centers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every treatment is physician-led and follows protocols from the Charaka Samhita and Sushruta Samhita without dilution. The in-house herbal pharmacy prepares fresh formulations daily from certified organic herbs rather than using pre-packaged products.",
      },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(MEDICAL_ORG_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PHYSICIAN_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <AboutPageClient />
    </>
  );
}