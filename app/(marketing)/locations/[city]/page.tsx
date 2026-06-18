import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { generatePageMetadata, localBusinessSchema } from "@/lib/seo";
import { treatments } from "@/lib/treatments";
import { notFound } from "next/navigation";

interface Props {
  params: { city: string };
}

const CITIES: Record<
  string,
  {
    name: string;
    state: string;
    distanceFromSonipat: string;
    region: string;
    localKeywords: string[];
    intro: string;
    travelNote: string;
  }
> = {
  sonipat: {
    name: "Sonipat",
    state: "Haryana",
    distanceFromSonipat: "0 km (our home city)",
    region: "Haryana",
    localKeywords: [
      "panchkarma sonipat",
      "ayurvedic doctor sonipat",
      "panchakarma center sonipat haryana",
    ],
    intro:
      "Shreeji Panchkarma has been Sonipat's most trusted Ayurvedic healing center since 2009. Located in Model Town near the Railway Station, we are the only AYUSH-certified Panchakarma clinic in Sonipat offering authentic classical protocols under physician supervision.",
    travelNote:
      "Our clinic is in the heart of Sonipat — easily reachable from all parts of the city within minutes.",
  },
  delhi: {
    name: "Delhi",
    state: "Delhi",
    distanceFromSonipat: "~50 km via NH-44",
    region: "Delhi NCR",
    localKeywords: [
      "panchkarma clinic near delhi",
      "ayurvedic treatment delhi ncr",
      "best panchkarma delhi",
    ],
    intro:
      "Patients from Delhi choose Shreeji Panchkarma, Sonipat over Delhi's own Ayurvedic clinics for one reason: authenticity. Our classical protocols, AYUSH-certified physicians, and freshly-prepared medicines are simply unavailable in most Delhi clinics at any price point.",
    travelNote:
      "From Delhi, our Sonipat clinic is a 60–90 minute drive via NH-44. Many Delhi patients commute daily for their treatment sessions.",
  },
  gurgaon: {
    name: "Gurgaon",
    state: "Haryana",
    distanceFromSonipat: "~75 km via Delhi-Sonipat highway",
    region: "Delhi NCR",
    localKeywords: [
      "panchkarma gurgaon",
      "ayurvedic treatment gurgaon",
      "panchakarma clinic near gurgaon",
    ],
    intro:
      "Professionals from Gurgaon increasingly seek authentic Panchakarma treatment at Shreeji Panchkarma, Sonipat — for stress, burnout, lifestyle disorders, and conditions where conventional medicine has not delivered results.",
    travelNote:
      "Gurgaon to our Sonipat clinic is approximately 75 km via Delhi, typically 90 minutes to 2 hours.",
  },
  noida: {
    name: "Noida",
    state: "Uttar Pradesh",
    distanceFromSonipat: "~80 km via NH-44",
    region: "Delhi NCR",
    localKeywords: [
      "panchkarma noida",
      "ayurvedic treatment noida",
      "panchakarma clinic near noida",
    ],
    intro:
      "Patients from Noida and Greater Noida travel to Shreeji Panchkarma in Sonipat for authentic Panchakarma treatment that their local clinics cannot provide.",
    travelNote:
      "Noida to Sonipat is approximately 80 km via NH-44, typically 90 minutes to 2 hours.",
  },
  faridabad: {
    name: "Faridabad",
    state: "Haryana",
    distanceFromSonipat: "~65 km via Delhi",
    region: "Haryana",
    localKeywords: [
      "panchkarma faridabad",
      "ayurvedic doctor faridabad",
      "panchakarma haryana near faridabad",
    ],
    intro:
      "Shreeji Panchkarma is Haryana's most trusted Ayurvedic center, serving patients from Faridabad seeking authentic Panchakarma, Shirodhara, Kati Basti, and Ayurvedic wellness treatments.",
    travelNote:
      "Faridabad to Sonipat is approximately 65 km, typically 60–90 minutes.",
  },
  panipat: {
    name: "Panipat",
    state: "Haryana",
    distanceFromSonipat: "~50 km via NH-44",
    region: "Haryana",
    localKeywords: [
      "panchkarma panipat",
      "ayurvedic treatment panipat haryana",
      "panchakarma clinic panipat",
    ],
    intro:
      "Panipat patients have been visiting Shreeji Panchkarma in Sonipat since our founding in 2009. We are the most accessible AYUSH-certified Panchakarma center for Panipat residents.",
    travelNote:
      "Panipat to Sonipat is approximately 50 km via NH-44 — a comfortable 45–60 minute drive.",
  },
  rohtak: {
    name: "Rohtak",
    state: "Haryana",
    distanceFromSonipat: "~60 km via Sonipat-Rohtak road",
    region: "Haryana",
    localKeywords: [
      "panchkarma rohtak",
      "ayurvedic doctor rohtak haryana",
      "panchakarma treatment rohtak",
    ],
    intro:
      "Patients from Rohtak seeking authentic Panchakarma treatment choose Shreeji Panchkarma, Sonipat — Haryana's most trusted AYUSH-certified Ayurvedic center, with 15 years of clinical excellence.",
    travelNote:
      "Rohtak to Sonipat is approximately 60 km, a comfortable 60–75 minute drive.",
  },
  bahadurgarh: {
    name: "Bahadurgarh",
    state: "Haryana",
    distanceFromSonipat: "~50 km via Bahadurgarh-Sonipat road",
    region: "Haryana",
    localKeywords: [
      "panchkarma bahadurgarh",
      "ayurvedic treatment bahadurgarh haryana",
      "ayurvedic clinic near bahadurgarh",
    ],
    intro:
      "Bahadurgarh residents seeking authentic Ayurvedic Panchakarma treatment have a trusted destination nearby: Shreeji Panchkarma in Sonipat, Haryana.",
    travelNote:
      "Bahadurgarh to Sonipat is approximately 50 km, a 60–75 minute drive.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = CITIES[params.city];
  if (!city) return {};
  return generatePageMetadata({
    title: `Panchakarma Treatment for ${city.name} Patients | Shreeji Panchkarma`,
    description: `Authentic Panchakarma treatment for patients from ${city.name}. Shreeji Panchkarma, Sonipat — AYUSH certified, 15+ years, 10,000+ patients. ${city.distanceFromSonipat} from ${city.name}. Book free consultation.`,
    keywords: city.localKeywords,
    path: `/locations/${params.city}`,
  });
}

export default function CityPage({ params }: Props) {
  const city = CITIES[params.city];
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />

      {/* Hero */}
      <section className="min-h-[50vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-end pt-28 relative overflow-hidden">
        <div className="container-custom pb-16 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-accent" />
              <span className="text-accent font-raleway text-xs tracking-widest uppercase">
                {city.region}
              </span>
            </div>
            <h1
              className="font-cormorant font-700 text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Panchakarma Treatment
              <br />
              for Patients from {city.name}
            </h1>
            <p className="font-raleway text-white/70 text-base max-w-2xl leading-relaxed mb-6">
              {city.intro}
            </p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <MapPin size={13} className="text-accent" />
              <span className="font-raleway text-white/80 text-sm">
                {city.distanceFromSonipat} from {city.name}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2
                className="font-cormorant font-600 text-forest mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                Why {city.name} Patients Choose
                <br />
                Shreeji Panchkarma
              </h2>
              <div className="space-y-4">
                {[
                  `AYUSH-certified physicians — gold standard for authentic Ayurvedic treatment in ${city.region}`,
                  "Freshly prepared medicines — Kashayams, Ghritams, and Bastis made in our in-house pharmacy",
                  "Individualised protocols based on your Prakriti — never generic packages",
                  "15+ years of clinical experience, 10,000+ patients healed",
                  city.travelNote,
                  "Free initial consultation — Dr. Sharma will assess your condition honestly",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-cream-section rounded-2xl p-7 border border-cream-section">
                <h3 className="font-cormorant font-600 text-forest text-2xl mb-5">
                  Getting Here from {city.name}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin
                      size={16}
                      className="text-accent mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-raleway font-600 text-forest text-sm mb-0.5">
                        Our Address
                      </p>
                      <p className="font-raleway text-forest-muted text-sm">
                        Near Railway Station, Model Town,
                        <br />
                        Sonipat, Haryana – 131001
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent mt-0.5 flex-shrink-0">🚗</span>
                    <div>
                      <p className="font-raleway font-600 text-forest text-sm mb-0.5">
                        By Road
                      </p>
                      <p className="font-raleway text-forest-muted text-sm">
                        {city.travelNote}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent mt-0.5 flex-shrink-0">🚂</span>
                    <div>
                      <p className="font-raleway font-600 text-forest text-sm mb-0.5">
                        By Train
                      </p>
                      <p className="font-raleway text-forest-muted text-sm">
                        Sonipat Railway Station is 500m from our clinic. Regular
                        trains from Delhi, Panipat, and across Haryana.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-cream-section space-y-3">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-primary text-white py-3.5 rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    Book Free Consultation →
                  </Link>
                  <a
                    href="https://maps.google.com/?q=Shreeji+Panchkarma+Sonipat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-primary text-sm font-500 font-raleway hover:underline cursor-pointer"
                  >
                    Get Directions on Google Maps →
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
            >
              Treatments Available for {city.name} Patients
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </AnimatedSection>

          <StaggerContainer
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.07}
          >
            {treatments.map((t) => (
              <StaggerItem key={t.slug}>
                <Link href={`/treatments/${t.slug}`} className="group block">
                  <div className="bg-white rounded-2xl p-6 border border-cream-section hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                    <h3 className="font-cormorant font-600 text-forest text-xl mb-1 group-hover:text-primary transition-colors">
                      {t.name}
                    </h3>
                    <p className="font-raleway text-accent text-xs font-500 mb-2">
                      {t.tagline}
                    </p>
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed mb-3 line-clamp-2">
                      {t.shortDesc}
                    </p>
                    <div className="flex items-center justify-between text-xs font-raleway">
                      <span className="text-forest-muted">{t.priceRange}</span>
                      <span className="text-primary font-500 flex items-center gap-1">
                        Learn more <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Local content + CTA */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <h2
              className="font-cormorant font-600 text-forest mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
            >
              Authentic Panchakarma for {city.name} — What to Expect
            </h2>
            <div className="space-y-4 font-raleway text-forest-muted text-base leading-relaxed">
              <p>
                Panchakarma treatment for patients from {city.name} follows the
                same physician-designed protocol that has healed over 10,000
                patients from across {city.region} and India. At Shreeji
                Panchkarma in Sonipat, we never compromise on authenticity.
              </p>
              <p>
                Your treatment begins with a detailed Prakriti examination by
                Dr. Rajesh Sharma — our AYUSH-certified chief physician with
                BAMS and MD (Panchakarma) from Banaras Hindu University. Based
                on this assessment, a personalised protocol is designed
                specifically for your constitution and health condition.
              </p>
              <p>
                Most {city.name} patients opt for outpatient treatment,
                commuting to our Sonipat clinic for daily sessions. The distance
                ({city.distanceFromSonipat}) is a small price to pay for
                treatment that genuinely heals. Hundreds of {city.name} patients
                have made this journey and consistently tell us: "I should have
                come sooner."
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer"
              >
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Call +91 98765 43210
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
