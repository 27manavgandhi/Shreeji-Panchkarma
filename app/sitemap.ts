import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { treatments } from "@/lib/treatments";

const BASE_URL = "https://shreejipanchkarma.com";

const CITIES = [
  "sonipat","delhi","gurgaon","noida",
  "faridabad","panipat","rohtak","bahadurgarh",
];

const BLOG_SLUGS = [
  "panchkarma-benefits-haryana",
  "ayurvedic-treatment-sonipat",
  "best-panchkarma-center-delhi-ncr",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/treatments`,    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/shop`,          lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE_URL}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const treatmentPages: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${BASE_URL}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...treatmentPages,
    ...productPages,
    ...blogPages,
    ...cityPages,
  ];
}
