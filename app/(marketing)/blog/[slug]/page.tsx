import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { generatePageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const POSTS: Record<string, {
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  keywords: string[];
  content: string;
  faqs: { question: string; answer: string }[];
}> = {
  "panchkarma-benefits-haryana": {
    title: "7 Life-Changing Benefits of Panchakarma Treatment in Haryana",
    description:
      "Discover why thousands in Sonipat, Delhi and Haryana are choosing authentic Panchakarma — and the 7 transformative benefits you can expect from a physician-supervised programme.",
    category: "Panchakarma",
    readTime: "6 min read",
    publishedAt: "2024-10-12",
    author: "Dr. Rajesh Sharma",
    keywords: [
      "panchkarma benefits haryana",
      "panchakarma treatment sonipat",
      "ayurvedic detox haryana",
    ],
    content: `
<h2>Why Panchakarma is Haryana's Most-Sought Ayurvedic Treatment</h2>
<p>Panchakarma treatment in Haryana has seen a remarkable rise in demand over the past decade. As patients across Sonipat, Delhi NCR, Panipat, and Rohtak increasingly look beyond conventional medicine for chronic conditions, authentic Panchakarma has emerged as the most trusted solution — not just for disease management, but for complete cellular rejuvenation.</p>
<p>At Shreeji Panchkarma in Sonipat, we have treated over 10,000 patients since 2009. What we observe consistently is that Panchakarma, when performed according to classical Ayurvedic protocols by AYUSH-certified physicians, delivers outcomes that no other system of medicine can match.</p>
<p>Here are the seven most life-changing benefits our patients in Haryana regularly report.</p>

<h2>1. Complete Cellular Detoxification</h2>
<p>Unlike juice cleanses or fasting protocols that work only at the digestive level, authentic Panchakarma removes toxins (ama) from the tissues themselves. The preparatory phase — Purvakarma — uses medicated ghee and daily Abhyanga to loosen lipid-soluble toxins from deep within muscles, joints, and organs. The main procedures then eliminate these mobilised toxins through the body's natural channels.</p>
<p>Patients from Sonipat and Delhi NCR who undergo this process consistently report a lightness and clarity that goes far beyond what any supplement or diet can produce. This is cellular-level healing.</p>

<h2>2. Restoration of Digestive Fire (Agni)</h2>
<p>In Ayurveda, almost all disease begins with impaired Agni — the digestive intelligence that governs not just food digestion, but cellular metabolism at every level. Panchakarma, particularly Virechana (therapeutic purgation), resets the liver and small intestine, restoring Agni to its optimal function.</p>
<p>Our patients in Haryana who complete a full Panchakarma programme report dramatically improved digestion, appetite, and energy levels — often within the first week.</p>

<h2>3. Reversal of Chronic Pain Conditions</h2>
<p>This is perhaps the most immediately visible benefit of Panchakarma treatment in Sonipat. Patients who arrive with years of back pain, knee pain, arthritis, and fibromyalgia — conditions where conventional medicine offers only pain management — experience genuine healing through Basti (medicated enema) treatments and targeted Bahi-Parimarjana procedures.</p>
<p>In our experience, 7–14 days of Kati Basti for lower back pain delivers results that months of physiotherapy and pain medication cannot. This is not because Ayurveda is "magic" — it is because we treat the root cause, not the symptom.</p>

<h2>4. Deep Psychological Reset</h2>
<p>Shirodhara — the continuous flow of warm medicated oil over the forehead — is the most visible face of Panchakarma for mental health. But it is only one aspect of how Panchakarma heals the mind. The entire protocol, including dietary guidelines, daily routine (Dinacharya), and herbal medicines, creates a profound shift in the nervous system.</p>
<p>Patients from high-pressure environments in Delhi NCR who come to our Sonipat clinic specifically for stress, anxiety, and insomnia treatment consistently report that nothing in their experience of modern medicine or therapy came close to what Shirodhara and Panchakarma achieved.</p>

<h2>5. Reversal of Skin Diseases</h2>
<p>Psoriasis, eczema, chronic acne, and pigmentation disorders are among the most distressing conditions our patients present with. Ayurveda understands these as primarily internal blood disorders (Raktadushti) manifesting on the skin. Our Panchakarma skin protocol — combining Virechana, Raktamokshana (leech therapy where indicated), and external herbal applications — treats the disease at its source.</p>
<p>Many of our patients have tried years of dermatological treatment with steroids and immunosuppressants before arriving at Shreeji Panchkarma. The improvement we achieve in 21–28 days of authentic Ayurvedic skin therapy routinely brings them to tears.</p>

<h2>6. Sustainable Weight Loss</h2>
<p>The Ayurvedic approach to weight loss is fundamentally different from calorie-restriction models. We address the impaired Medodhatu (fat tissue) metabolism that is the actual cause of obesity in Ayurvedic understanding. Our programmes combine Udwartana (herbal powder massage), specialised Basti, and Agni-correcting herbs with a Prakriti-appropriate dietary protocol.</p>
<p>Patients who have yo-yo dieted for years find that Ayurvedic weight management at our Sonipat center produces results that hold — because we have addressed the metabolic root, not just restricted calories.</p>

<h2>7. Slowing of Biological Aging</h2>
<p>The Rasayana (rejuvenation) aspect of Panchakarma is perhaps the most remarkable benefit — and the hardest to quantify. By clearing toxin accumulation, restoring tissue nutrition, and optimising the endocrine and nervous systems, authentic Panchakarma genuinely slows the aging process at a cellular level.</p>
<p>Patients who undergo annual Panchakarma programmes at Shreeji Panchkarma in Sonipat consistently report that they look and feel younger than their contemporaries who have not undergone this treatment. This is not marketing — it is the documented effect of Rasayana therapy described in the Charaka Samhita over 2,000 years ago.</p>

<h2>How to Access Authentic Panchakarma in Haryana</h2>
<p>The key word is "authentic." As demand for Panchakarma has grown across Haryana and Delhi NCR, so too has the number of clinics offering what they call Panchakarma — but which are, in practice, oil massage parlours using that name. True Panchakarma requires AYUSH-certified physicians, authentic classical protocols, physician-prepared medicines, and clinical-level monitoring.</p>
<p>At Shreeji Panchkarma in Sonipat, you will meet only AYUSH-registered physicians. Every treatment is administered under medical supervision. Every herb in our pharmacy is sourced from certified organic farms and batch-tested for purity. This is the standard that patients across Haryana deserve — and what we have delivered since 2009.</p>
    `,
    faqs: [
      {
        question: "How long does Panchakarma take to show results in Haryana?",
        answer:
          "Most patients at Shreeji Panchkarma begin noticing improvements within the first 3–5 days of the main treatment phase. However, the full benefits — particularly for chronic conditions — become apparent 2–4 weeks after completing the programme, as the body continues to heal and rebalance.",
      },
      {
        question: "Is Panchakarma safe for all age groups in Haryana?",
        answer:
          "Panchakarma is suitable for most adults. We do not administer the main procedures (Pradhanakarma) to children under 12, those who are pregnant, or those in acute illness. For elderly patients and those with specific medical conditions, our physician designs a modified protocol appropriate to their condition.",
      },
      {
        question: "What is the cost of Panchakarma treatment in Sonipat?",
        answer:
          "At Shreeji Panchkarma, Sonipat, our programmes range from ₹5,000 for a basic 7-day protocol to ₹45,000 for a comprehensive 21-day residential-equivalent programme. The initial consultation is completely free. Contact us for a personalised quote.",
      },
    ],
  },
  "ayurvedic-treatment-sonipat": {
    title: "Why Sonipat is Becoming Haryana's Ayurvedic Wellness Capital",
    description:
      "Sonipat is emerging as the destination for authentic Ayurvedic treatment in Haryana. Discover why patients from Delhi NCR, Gurgaon, and Rohtak are choosing Sonipat over urban clinics.",
    category: "Ayurveda",
    readTime: "5 min read",
    publishedAt: "2024-09-28",
    author: "Dr. Rajesh Sharma",
    keywords: [
      "ayurvedic treatment sonipat",
      "best ayurveda clinic sonipat haryana",
      "panchkarma sonipat",
    ],
    content: `
<h2>Sonipat: An Unlikely Ayurvedic Destination</h2>
<p>Ten years ago, if you asked a resident of Delhi, Gurgaon, or Noida where to find authentic Ayurvedic Panchakarma treatment, Sonipat would not have featured in the answer. Today, it is increasingly the first name that comes up — and with good reason.</p>
<p>Shreeji Panchkarma in Sonipat has been central to this transformation. Since 2009, our clinic has treated over 10,000 patients, many of whom travel from Delhi NCR, Faridabad, Panipat, and even further afield specifically for our authentic Ayurvedic protocols.</p>

<h2>What Makes Sonipat Different from Delhi's Ayurvedic Clinics</h2>
<p>Delhi has hundreds of clinics that offer Ayurvedic treatment. But authenticity is rare. The economics of running a clinic in South Delhi or Gurgaon — with their enormous overheads — push practitioners toward shortcuts: pre-packaged medicines instead of freshly prepared Kashayams, masseurs instead of physicians administering Basti, standardised packages instead of individualised protocols.</p>
<p>In Sonipat, the economic pressures are different. Our clinic was built on reputation, not footfall. Every patient who visits Shreeji Panchkarma comes because another patient recommended us. This creates an incentive structure that is completely aligned with clinical outcomes — not throughput.</p>

<h2>The Classical Protocols Advantage</h2>
<p>At Shreeji Panchkarma, we follow the Charaka Samhita and Sushruta Samhita protocols without modification. This means our Virechana is performed with properly dosed Trivrit Lehyam, not a generic laxative. Our Basti is administered with physician-prepared Anuvasana and Niruha Basti formulations, not bottled oils. Our Shirodhara uses specific oils selected for each patient's condition — not a single generic "relaxation oil."</p>
<p>This level of authenticity is rare in any metro city. In Sonipat, it is what we have built our entire practice on.</p>

<h2>Patient Stories from Across Haryana and Delhi NCR</h2>
<p>Nitin Rana from Delhi had suffered from lumbar spondylosis for seven years before his family physician referred him to Shreeji Panchkarma. "I was on three different painkillers and had been told I needed spinal surgery," he says. "Fourteen sessions of Kati Basti completely changed that picture. I avoided surgery and have been pain-free for two years."</p>
<p>Sumit Kaushik from Gurgaon made the journey to Sonipat for psoriasis treatment after eight years of dermatological treatment. "The drive from Gurgaon seemed long at first. After the third week of treatment, I would have driven from anywhere."</p>

<h2>The Future of Ayurvedic Wellness in Haryana</h2>
<p>The shift toward authentic Ayurvedic treatment we are seeing in Haryana reflects a broader awakening across India. Patients are increasingly educated — they research, they ask the right questions, and they recognise the difference between authentic Panchakarma and an oil massage with an Ayurvedic label.</p>
<p>Sonipat is well-positioned to be the hub of this authentic Ayurvedic movement in northern India. We are honoured to be part of its story.</p>
    `,
    faqs: [
      {
        question: "How far is Shreeji Panchkarma from Delhi?",
        answer:
          "Shreeji Panchkarma is located in Model Town, Sonipat — approximately 50km from Delhi and easily accessible via NH-44. From Delhi, the drive typically takes 60–90 minutes depending on traffic. Many of our patients from Delhi, Gurgaon and Noida commute daily for their treatment sessions.",
      },
      {
        question: "Do I need to stay in Sonipat for Panchakarma treatment?",
        answer:
          "Not necessarily. Most of our patients choose outpatient treatment — arriving in the morning, completing their session, and returning home. For intensive programmes requiring twice-daily treatments, we can recommend nearby accommodation in Sonipat. Our clinic does not currently have in-house residential facilities.",
      },
    ],
  },
  "best-panchkarma-center-delhi-ncr": {
    title: "How to Choose the Best Panchakarma Center in Delhi NCR",
    description:
      "A buyer's guide to finding an authentic Panchakarma clinic in Delhi NCR and Haryana — what to look for, what red flags to avoid, and the questions to ask before booking.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2024-09-10",
    author: "Dr. Rajesh Sharma",
    keywords: [
      "best panchkarma center delhi ncr",
      "authentic panchakarma delhi",
      "how to choose ayurvedic clinic haryana",
    ],
    content: `
<h2>The Problem: Panchakarma Clinics Are Not Created Equal</h2>
<p>As Ayurveda has grown in popularity across Delhi NCR and Haryana, so has the number of establishments calling themselves "Panchakarma centres." From luxury spas in South Delhi to small clinics in Noida, everyone seems to offer Panchakarma. But genuine Panchakarma — the kind described in the Charaka Samhita, administered by qualified physicians using authentic protocols — is far rarer than the marketing suggests.</p>
<p>This guide will help you ask the right questions and make the right choice for your health.</p>

<h2>1. Check AYUSH Certification First</h2>
<p>The Ministry of AYUSH, Government of India, certifies Ayurvedic practitioners and clinics. Any clinic offering Panchakarma should have their AYUSH registration clearly displayed. Ask to see it. A genuine clinic will be proud to show you. A clinic that hesitates or deflects this question has answered your question for you.</p>
<p>All practitioners at Shreeji Panchkarma, Sonipat are AYUSH registered. Our chief physician Dr. Rajesh Sharma holds BAMS and MD (Panchakarma) from Banaras Hindu University.</p>

<h2>2. Distinguish Physicians from Therapists</h2>
<p>This is the single most important distinction. Authentic Panchakarma must be administered under physician supervision at every step. The preparatory assessment (Prakriti examination), the dosing of preparatory medicines (Snehapana), the timing and administration of main procedures (Pradhanakarma), and the recovery dietary protocol (Paschatkarma) — all require physician knowledge and oversight.</p>
<p>Many establishments in Delhi NCR employ trained massage therapists who administer oils while a physician makes a brief weekly appearance. This is not Panchakarma. Ask specifically: "Will a physician be present during my treatment?" The answer should be yes, always.</p>

<h2>3. Ask About Medicine Preparation</h2>
<p>Classical Panchakarma uses freshly prepared medicines — Kashayams (herbal decoctions), Ghritams (medicated ghee), Tailas (medicated oils), and Churnas (herbal powders) — prepared according to precise classical formulations. Ask any prospective clinic: "Do you prepare your own medicines, or do you use commercial preparations?"</p>
<p>At Shreeji Panchkarma, we prepare fresh Kashayams daily in our in-house herbal pharmacy. Our Basti formulations are physician-prepared for each patient. This is what Panchakarma requires.</p>

<h2>4. Demand an Individualised Protocol</h2>
<p>If a clinic can tell you your treatment plan before examining you — or offers packages that don't change based on your assessment — walk away. Authentic Panchakarma begins with a detailed Prakriti examination, Nadi Pareeksha (pulse diagnosis), and health history. The protocol emerges from this examination, not from a price list.</p>

<h2>5. Understand What the Price Includes</h2>
<p>Price transparency is a marker of a genuine clinic. Ask for a detailed breakdown: physician consultation fees, treatment procedure costs, medicine costs, follow-up visit fees. Hidden costs after the initial booking are a red flag. A genuine clinic will give you a clear estimate after examination.</p>

<h2>6. Ask About the Paschatkarma (Recovery) Protocol</h2>
<p>Most discussions of Panchakarma focus on the main procedures. But the recovery phase — Paschatkarma — is equally important and is where many clinics cut corners. Ask specifically about the dietary restoration protocol (Samsarjana Krama) and the follow-up schedule. If a clinic dismisses this question, they are not offering authentic Panchakarma.</p>

<h2>Why Many Delhi NCR Patients Choose Shreeji Panchkarma, Sonipat</h2>
<p>Sonipat is 50–90 minutes from most Delhi NCR locations. Patients who make this journey tell us consistently that the authenticity and clinical outcomes they receive at Shreeji Panchkarma are unavailable in their home cities, regardless of budget. Our commitment to classical protocols, physician-led treatment, and ingredient integrity has built a reputation that extends far beyond Haryana.</p>
<p>If you are searching for the best Panchakarma centre in Delhi NCR, we invite you to begin with a free consultation — by phone or at our Sonipat clinic. Dr. Sharma will assess your condition honestly and tell you whether Panchakarma is appropriate for you, what the treatment would involve, and what outcomes you can realistically expect.</p>
    `,
    faqs: [
      {
        question: "What is the difference between an authentic Panchakarma clinic and a spa offering Panchakarma?",
        answer:
          "An authentic Panchakarma clinic is staffed by AYUSH-certified physicians who conduct full Prakriti examinations, prepare individualised treatment protocols, administer or supervise all procedures, and use freshly prepared Ayurvedic medicines. A spa offering Panchakarma typically employs trained massage therapists, uses pre-packaged commercial oils, and offers standardised packages without individualised assessment.",
      },
      {
        question: "How do I know if a Panchakarma clinic's medicines are authentic?",
        answer:
          "Ask whether the clinic has an in-house herbal pharmacy that prepares fresh Kashayams and Basti formulations. Ask to see the source documentation for their herbs. A genuine clinic will have GMP-certified herb suppliers and will be transparent about their formulation process. At Shreeji Panchkarma, Sonipat, we source all herbs from certified organic farms and can show you our supply documentation.",
      },
      {
        question: "Is it worth travelling from Delhi or Gurgaon to Sonipat for Panchakarma?",
        answer:
          "This is a question many of our patients asked themselves before their first visit — and consistently answer 'yes' after treatment. The clinical outcomes of authentic Panchakarma under physician supervision are simply not comparable to what most Delhi NCR clinics offer. For a treatment protocol of 7–21 days, the additional commute time is a minor consideration relative to the quality of care and results.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS[params.slug];
  if (!post) return {};
  return generatePageMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    path: `/blog/${params.slug}`,
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${params.slug}` },
  ]);
  const faqJsonLd = faqSchema(post.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary pt-28 pb-14 relative overflow-hidden">
        <div className="container-custom max-w-4xl relative z-10">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-accent/80 hover:text-accent text-sm font-raleway mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span className="inline-block bg-accent/20 text-accent-soft text-xs font-600 font-raleway px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1
              className="font-cormorant font-700 text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm font-raleway">
              <div className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div
                className="prose-ayurvedic font-raleway text-forest-muted leading-relaxed"
                style={{
                  ["--tw-prose-headings" as string]: "#1A2E1A",
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </AnimatedSection>

            {/* FAQs */}
            <AnimatedSection delay={0.1} className="mt-14">
              <SanskritDivider color="#C9A84C" className="mb-10" />
              <h2 className="font-cormorant font-600 text-forest text-3xl mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="bg-cream-section rounded-2xl p-6 border border-cream-section">
                    <h3 className="font-cormorant font-600 text-forest text-xl mb-3">
                      {faq.question}
                    </h3>
                    <p className="font-raleway text-forest-muted text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.15} className="mt-12">
              <div className="bg-gradient-to-br from-chapter-1 to-chapter-2 rounded-2xl p-8 text-center">
                <h3 className="font-cormorant font-600 text-white text-2xl mb-3">
                  Ready to Begin Your Healing?
                </h3>
                <p className="font-raleway text-white/70 text-sm mb-6">
                  Book a free consultation with Dr. Rajesh Sharma at Shreeji Panchkarma, Sonipat.
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
        </div>
      </section>
    </>
  );
}
