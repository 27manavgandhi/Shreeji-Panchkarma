import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Ayurvedic Health Blog | Panchakarma Wisdom — Shreeji Panchkarma",
  description:
    "Ayurvedic health articles, Panchakarma guides, and wellness wisdom from Dr. Rajesh Sharma at Shreeji Panchkarma, Sonipat. SEO-optimized content on Ayurveda for Haryana and Delhi NCR.",
  keywords: [
    "ayurvedic health blog",
    "panchkarma guide haryana",
    "ayurveda tips sonipat",
    "ayurvedic wellness delhi ncr",
  ],
  path: "/blog",
});

const POSTS = [
  {
    slug: "panchkarma-benefits-haryana",
    category: "Panchakarma",
    categoryColor: "bg-primary/10 text-primary",
    title: "7 Life-Changing Benefits of Panchakarma Treatment in Haryana",
    excerpt:
      "Discover why thousands in Sonipat, Delhi and Haryana are choosing authentic Panchakarma to transform their health — and what to expect from your first treatment at Shreeji Panchkarma.",
    readTime: "6 min read",
    publishedAt: "2024-10-12",
    author: "Dr. Rajesh Sharma",
  },
  {
    slug: "ayurvedic-treatment-sonipat",
    category: "Ayurveda",
    categoryColor: "bg-accent/10 text-accent-dark",
    title: "Why Sonipat is Becoming Haryana's Ayurvedic Wellness Capital",
    excerpt:
      "Sonipat is quietly emerging as the most important centre for authentic Ayurvedic treatment in Haryana. Here's the story behind the shift — and why patients are choosing it over Delhi.",
    readTime: "5 min read",
    publishedAt: "2024-09-28",
    author: "Dr. Rajesh Sharma",
  },
  {
    slug: "best-panchkarma-center-delhi-ncr",
    category: "Guide",
    categoryColor: "bg-secondary/20 text-primary-dark",
    title: "How to Choose the Best Panchakarma Center in Delhi NCR",
    excerpt:
      "A comprehensive buyer's guide to finding an authentic Panchakarma clinic in Delhi NCR — what to look for, what red flags to avoid, and the right questions to ask before booking.",
    readTime: "7 min read",
    publishedAt: "2024-09-10",
    author: "Dr. Rajesh Sharma",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[45vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-end pt-24 relative overflow-hidden">
        <div className="container-custom pb-14 relative z-10">
          <AnimatedSection>
            <p className="text-accent font-raleway text-xs tracking-widest uppercase mb-4">
              Ayurvedic Knowledge
            </p>
            <h1
              className="font-cormorant font-700 text-white mb-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
            >
              Ayurvedic Wisdom<br />for Modern Times
            </h1>
            <p className="font-raleway text-white/70 max-w-xl leading-relaxed">
              Evidence-based Ayurvedic insights from Dr. Rajesh Sharma — guiding patients across Haryana and Delhi NCR toward authentic healing since 2009.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="font-cormorant font-600 text-forest mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
            >
              Latest Articles
            </h2>
            <SanskritDivider color="#C9A84C" className="my-4" />
          </AnimatedSection>

          <StaggerContainer
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            staggerDelay={0.1}
          >
            {POSTS.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Placeholder image */}
                    <div className="h-48 bg-gradient-to-br from-cream-section via-cream-warm to-secondary/20 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-40 h-40" fill="#2D6A4F">
                          <path d="M100 20 Q160 60 150 120 Q140 180 80 190 Q20 200 20 130 Q20 60 100 20Z" />
                        </svg>
                      </div>
                      <span
                        className={`absolute top-4 left-4 text-xs font-600 font-raleway px-3 py-1 rounded-full ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col p-6">
                      <h2 className="font-cormorant font-600 text-forest text-xl leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="font-raleway text-sm text-forest-muted leading-relaxed flex-1 line-clamp-3 mb-5">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-cream-section">
                        <div>
                          <p className="font-raleway text-xs font-500 text-forest">{post.author}</p>
                          <div className="flex items-center gap-1.5 text-xs text-forest-muted/60 font-raleway mt-0.5">
                            <Clock size={11} />
                            {post.readTime}
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-primary text-xs font-500 font-raleway group-hover:gap-2 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-cream-section">
        <div className="container-custom max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="font-cormorant font-600 text-forest text-4xl mb-3">
              Ayurvedic Wisdom in Your Inbox
            </h2>
            <p className="font-raleway text-forest-muted mb-7 text-base leading-relaxed">
              Monthly Ayurvedic health tips, seasonal protocols, and exclusive insights from Dr. Sharma — sent to patients across Haryana and Delhi NCR.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest placeholder-forest-muted/40 focus:outline-none focus:border-primary/50 transition-colors bg-white"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs font-raleway text-forest-muted/50 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
