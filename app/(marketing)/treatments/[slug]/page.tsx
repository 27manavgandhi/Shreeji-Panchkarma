import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTreatmentBySlug, treatments } from "@/lib/treatments";
import { generatePageMetadata, treatmentSchema, breadcrumbSchema } from "@/lib/seo";
import TreatmentClient from "@/components/treatments/TreatmentClient";

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

  const schema = treatmentSchema(treatment);
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Treatments", url: "/treatments" },
    { name: treatment.name, url: `/treatments/${params.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TreatmentClient slug={params.slug} />
    </>
  );
}