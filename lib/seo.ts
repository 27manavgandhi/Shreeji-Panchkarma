import type { Metadata } from "next";
import type { Product } from "./products";
import type { Treatment } from "./treatments";

const SITE_URL = "https://shreejipanchkarma.com";
const SITE_NAME = "Shreeji Panchkarma";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const BUSINESS_INFO = {
  name: "Shreeji Panchkarma",
  address: {
    street: "Near Railway Station, Model Town",
    city: "Sonipat",
    state: "Haryana",
    postalCode: "131001",
    country: "IN",
  },
  phone: "+91-98765-43210",
  email: "info@shreejipanchkarma.com",
  geo: {
    latitude: "28.9931",
    longitude: "77.0151",
  },
  openingHours: [
    "Mo-Sa 09:00-19:00",
    "Su 10:00-14:00",
  ],
  priceRange: "₹₹",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  sameAs: [
    "https://www.facebook.com/shreejipanchkarma",
    "https://www.instagram.com/shreejipanchkarma",
    "https://www.youtube.com/@shreejipanchkarma",
  ],
};

// ─── Metadata Generator ────────────────────────────────────────────────────

export function generatePageMetadata(page: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${page.path}`;
  const image = page.image || DEFAULT_OG_IMAGE;

  return {
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    keywords: page.keywords?.join(", "),
    authors: [{ name: SITE_NAME }],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// ─── JSON-LD Schemas ───────────────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card, Net Banking",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: BUSINESS_INFO.sameAs,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "529",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Shreeji Panchkarma is Haryana's most trusted AYUSH-certified Ayurvedic Panchakarma treatment center, serving Sonipat, Delhi NCR, and surrounding regions since 2009.",
    areaServed: ["Sonipat", "Delhi", "Delhi NCR", "Gurgaon", "Noida", "Faridabad", "Panipat", "Rohtak", "Haryana"],
    hasMap: `https://maps.google.com/?q=Shreeji+Panchkarma+Sonipat+Haryana`,
    foundingDate: "2009",
  };
}

export function medicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: BUSINESS_INFO.name,
    medicalSpecialty: "Ayurvedic Medicine",
    availableService: [
      "Panchakarma",
      "Shirodhara",
      "Ayurvedic Weight Management",
      "Janu Basti",
      "Kati Basti",
      "Ayurvedic Skin Therapy",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      addressCountry: BUSINESS_INFO.address.country,
    },
    telephone: BUSINESS_INFO.phone,
    url: BUSINESS_INFO.url,
    isAcceptingNewPatients: true,
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Shreeji Panchkarma",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/product/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    category: "Ayurvedic Products",
    countryOfOrigin: "IN",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function blogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "Dr. Rajesh Sharma",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: BUSINESS_INFO.logo },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function treatmentSchema(treatment: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.fullDesc,
    url: `${SITE_URL}/treatments/${treatment.slug}`,
    procedureType: "Ayurvedic Treatment",
    indication: treatment.conditions.map((c) => ({
      "@type": "MedicalIndication",
      name: c,
    })),
    followUp: treatment.process[treatment.process.length - 1]?.desc || "",
    preparation: treatment.process[0]?.desc || "",
    howPerformed: treatment.process[1]?.desc || "",
  };
}
