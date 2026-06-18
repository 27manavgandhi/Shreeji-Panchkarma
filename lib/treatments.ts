export interface Treatment {
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  priceRange: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  conditions: string[];
  benefits: string[];
  process: { step: number; title: string; desc: string }[];
  suitableFor: string[];
  avoidIf: string[];
  featured: boolean;
}

export const treatments: Treatment[] = [
  {
    slug: "panchakarma",
    name: "Panchakarma",
    tagline: "The Complete Detox Protocol",
    duration: "7–21 days",
    priceRange: "₹5,000 – ₹45,000",
    icon: "Leaf",
    shortDesc:
      "The ancient five-action detoxification that resets your entire system — body, mind and spirit.",
    fullDesc:
      "Panchakarma is Ayurveda's most comprehensive detoxification and rejuvenation programme. The word 'Panchakarma' means 'five actions' in Sanskrit — five therapeutic procedures that cleanse your body at the cellular level, eliminating accumulated toxins (ama) and restoring your natural doshic balance. At Shreeji Panchkarma, our AYUSH-certified physicians design each programme individually based on your Prakriti (body constitution) and current health status.",
    conditions: [
      "Chronic fatigue and low energy",
      "Digestive disorders and IBS",
      "Arthritis and joint inflammation",
      "Skin diseases and eczema",
      "Chronic stress and anxiety",
      "Obesity and metabolic disorders",
      "Respiratory conditions",
      "Hormonal imbalances",
    ],
    benefits: [
      "Complete cellular-level detoxification",
      "Restored digestive fire (Agni)",
      "Deep tissue nourishment and rejuvenation",
      "Improved sleep quality and mental clarity",
      "Enhanced immunity and disease resistance",
      "Slowed biological aging process",
    ],
    process: [
      {
        step: 1,
        title: "Purvakarma — Preparation",
        desc: "3–7 days of internal oleation (Snehapana) with medicated ghee and external oil massage to loosen toxins from deep tissues.",
      },
      {
        step: 2,
        title: "Pradhanakarma — Main Therapy",
        desc: "The five core procedures performed by our physicians: Vamana, Virechana, Basti, Nasya, and Raktamokshana as indicated.",
      },
      {
        step: 3,
        title: "Paschatkarma — Recovery",
        desc: "3–7 days of dietary restoration (Samsarjana Krama), herbal medicines, and lifestyle guidance to stabilise results.",
      },
    ],
    suitableFor: [
      "Adults seeking deep detoxification",
      "Chronic disease management",
      "Preventive health maintenance",
      "Post-illness recovery",
      "Seasonal body resets",
    ],
    avoidIf: [
      "Pregnancy",
      "Active fever or infection",
      "Extreme weakness or emaciation",
      "Recent surgery (within 3 months)",
      "Children under 12",
    ],
    featured: true,
  },
  {
    slug: "weight-loss",
    name: "Ayurvedic Weight Management",
    tagline: "Sustainable, Natural Weight Loss",
    duration: "21–90 days",
    priceRange: "₹3,000 – ₹25,000",
    icon: "TrendingDown",
    shortDesc:
      "Medovahastrotas therapy combined with dietary protocols to address the root cause of weight gain.",
    fullDesc:
      "Unlike crash diets or exercise-only approaches, Ayurvedic weight management addresses the root cause of excess weight — impaired Medodhatu (fat tissue) metabolism and blocked Medovaha Srotas (fat channels). Our programme combines therapeutic Udwartana (herbal powder massage), specialised Basti treatments, Agni-kindling herbs, and personalised dietary protocols designed to your Prakriti.",
    conditions: [
      "Obesity (BMI > 27)",
      "PCOD/PCOS",
      "Hypothyroidism-related weight gain",
      "Type 2 diabetes management",
      "Metabolic syndrome",
      "Post-pregnancy weight",
    ],
    benefits: [
      "Sustainable weight loss without yo-yo effect",
      "Improved metabolic rate naturally",
      "Hormonal balance restoration",
      "Reduced cholesterol and triglycerides",
      "Enhanced energy and vitality",
      "Improved skin texture during weight loss",
    ],
    process: [
      {
        step: 1,
        title: "Prakriti Assessment",
        desc: "Detailed body constitution analysis, current dosha imbalance identification, and root cause diagnosis.",
      },
      {
        step: 2,
        title: "Therapeutic Treatments",
        desc: "Udwartana (dry herbal massage), Swedana (steam therapy), targeted Basti, and Agni-stimulating procedures.",
      },
      {
        step: 3,
        title: "Dietary & Lifestyle Protocol",
        desc: "Personalised Ayurvedic diet plan, daily routine (Dinacharya), herbal supplements, and yoga guidance.",
      },
    ],
    suitableFor: [
      "Adults with obesity or overweight",
      "Hormonal weight management",
      "Metabolic disorder management",
      "Healthy adults seeking sustainable results",
    ],
    avoidIf: [
      "Pregnancy or breastfeeding",
      "Severe cardiac conditions",
      "Active eating disorders",
      "BMI below 18.5",
    ],
    featured: true,
  },
  {
    slug: "stress-relief",
    name: "Shirodhara Stress Therapy",
    tagline: "The Ultimate Nervous System Reset",
    duration: "1–7 days",
    priceRange: "₹2,500 – ₹15,000",
    icon: "Brain",
    shortDesc:
      "Warm medicated oil poured in a continuous stream on the forehead, calming the nervous system and eliminating anxiety.",
    fullDesc:
      "Shirodhara is one of Ayurveda's most profound therapies for the mind. A continuous, gentle stream of warm medicated oil — tailored to your dosha — flows rhythmically over the Ajna chakra (third eye) on the forehead. This creates a deep meditative state, synchronises brain waves, calms the hypothalamus, and breaks the cycle of chronic stress. Our physicians at Shreeji Panchkarma select the precise oil formulation based on your condition.",
    conditions: [
      "Chronic anxiety and panic disorders",
      "Insomnia and sleep disorders",
      "Depression and mood disorders",
      "Chronic migraines and headaches",
      "PTSD and emotional trauma",
      "Professional burnout",
      "Hypertension",
    ],
    benefits: [
      "Immediate and deep nervous system calming",
      "Improved sleep quality within days",
      "Reduced cortisol and stress hormone levels",
      "Enhanced clarity and mental focus",
      "Relief from chronic headaches and migraines",
      "Feeling of profound peace and rejuvenation",
    ],
    process: [
      {
        step: 1,
        title: "Consultation & Oil Selection",
        desc: "Physician assesses your condition, selects the precise medicated oil (Brahmi, Ksheerabala, Chandanadi) for your needs.",
      },
      {
        step: 2,
        title: "Abhyanga & Preparation",
        desc: "Full body oil massage to relax the body, followed by a brief Swedana (steam) to prepare the system.",
      },
      {
        step: 3,
        title: "Shirodhara Session",
        desc: "45–60 minutes of continuous medicated oil flow over the forehead in a rhythmic pattern. Deeply meditative.",
      },
    ],
    suitableFor: [
      "Anyone experiencing stress or anxiety",
      "Insomnia sufferers",
      "Migraine patients",
      "High-pressure professionals",
      "Emotional recovery",
    ],
    avoidIf: [
      "Acute fever",
      "Scalp infections or wounds",
      "Severe cervical spondylosis",
      "Third trimester pregnancy",
    ],
    featured: true,
  },
  {
    slug: "skin-treatment",
    name: "Ayurvedic Skin Therapy",
    tagline: "Heal Skin from the Inside Out",
    duration: "14–28 days",
    priceRange: "₹4,000 – ₹20,000",
    icon: "Sparkles",
    shortDesc:
      "Treating psoriasis, eczema, acne and pigmentation through internal detox and external herbal applications.",
    fullDesc:
      "Ayurveda understands that skin diseases are primarily internal disorders manifesting on the skin. Our Ayurvedic Skin Therapy programme combines internal blood purification (Raktashodhana), targeted Virechana (purgation), external herbal lepa (paste) applications, and specialised Takradhara therapy to heal chronic skin conditions from their root cause.",
    conditions: [
      "Psoriasis",
      "Eczema and dermatitis",
      "Chronic acne",
      "Hyperpigmentation",
      "Urticaria and hives",
      "Rosacea",
      "Vitiligo (supportive care)",
    ],
    benefits: [
      "Blood purification at cellular level",
      "Reduction in skin inflammation",
      "Improved skin texture and clarity",
      "Reduced itching and discomfort",
      "Long-term remission in chronic conditions",
      "Natural skin radiance restoration",
    ],
    process: [
      {
        step: 1,
        title: "Skin Diagnosis",
        desc: "Detailed analysis of skin condition, dosha imbalance, dietary triggers, and treatment planning.",
      },
      {
        step: 2,
        title: "Internal Detox",
        desc: "Blood purifying herbs, Virechana if indicated, and Raktamokshana (leech therapy) for specific conditions.",
      },
      {
        step: 3,
        title: "External Applications",
        desc: "Daily herbal lepa, medicated bath, Takradhara, and phototherapy with Ayurvedic oils.",
      },
    ],
    suitableFor: [
      "Chronic skin condition sufferers",
      "Those who have tried conventional treatment without success",
      "Natural skincare seekers",
    ],
    avoidIf: [
      "Pregnancy",
      "Active open wounds",
      "Acute infection with fever",
    ],
    featured: false,
  },
  {
    slug: "janu-basti",
    name: "Janu Basti",
    tagline: "Knee & Joint Rejuvenation",
    duration: "7–14 days",
    priceRange: "₹3,500 – ₹18,000",
    icon: "PersonStanding",
    shortDesc:
      "Warm medicated oil retained in a dough ring over the knee joint. Relieves pain and restores mobility.",
    fullDesc:
      "Janu Basti is a highly effective Ayurvedic treatment for knee joint disorders. A specially prepared dough ring (made from black gram flour) is applied around the knee joint, filled with warm medicated oil, and maintained at a constant therapeutic temperature for 30–45 minutes. The lipid-soluble herbal compounds in the oil penetrate deep into the joint, lubricating cartilage, reducing inflammation, and promoting regeneration.",
    conditions: [
      "Knee osteoarthritis",
      "Chronic knee pain",
      "Sports injuries to the knee",
      "Ligament damage",
      "Runner's knee",
      "Post-surgical knee rehabilitation",
    ],
    benefits: [
      "Significant pain reduction",
      "Improved joint flexibility and range of motion",
      "Cartilage nourishment and protection",
      "Reduced joint stiffness, especially morning stiffness",
      "Strengthened supporting muscles and ligaments",
      "Delayed need for surgical intervention",
    ],
    process: [
      {
        step: 1,
        title: "Abhyanga",
        desc: "Warm oil massage to the entire leg to improve circulation and prepare the joint.",
      },
      {
        step: 2,
        title: "Basti Application",
        desc: "Dough ring applied around knee, filled with hot medicated oil (Mahanarayan, Balaswagandhadi). Maintained for 30–45 minutes.",
      },
      {
        step: 3,
        title: "Post-treatment Care",
        desc: "Gentle knee exercises, dietary guidance, and herbal supplements for continued benefit.",
      },
    ],
    suitableFor: [
      "Knee pain sufferers of all ages",
      "Arthritis patients",
      "Athletes with knee injuries",
      "Post-surgical rehabilitation",
    ],
    avoidIf: [
      "Active knee infection",
      "Open wounds on knee",
      "Severe skin conditions around knee",
    ],
    featured: false,
  },
  {
    slug: "kati-basti",
    name: "Kati Basti",
    tagline: "Lower Back Pain Specialist",
    duration: "7–14 days",
    priceRange: "₹3,500 – ₹18,000",
    icon: "Activity",
    shortDesc:
      "Warm oil held in a dough ring over the lumbar region. The most effective natural treatment for chronic back pain.",
    fullDesc:
      "Kati Basti is Ayurveda's gold standard treatment for lower back pain. 'Kati' means lower back and 'Basti' means to hold. A dough ring containing warm medicated oil is placed over the lumbar-sacral region, allowing the therapeutic oils to deeply penetrate the muscles, vertebrae, and intervertebral discs. This procedure relieves Vata vitiation — the primary cause of lower back pain in Ayurveda.",
    conditions: [
      "Chronic lower back pain",
      "Lumbar spondylosis",
      "Sciatica (referred leg pain)",
      "Slip disc (lumbar herniation)",
      "Muscle spasm and tightness",
      "Sacroiliac joint dysfunction",
      "Lordosis",
    ],
    benefits: [
      "Rapid and sustained pain relief",
      "Improved spinal flexibility",
      "Muscle spasm resolution",
      "Nerve compression relief",
      "Prevention of further disc degeneration",
      "Reduced dependence on pain medications",
    ],
    process: [
      {
        step: 1,
        title: "Spinal Assessment",
        desc: "Physician examines posture, range of motion, and reviews any available imaging before treatment.",
      },
      {
        step: 2,
        title: "Kati Basti Procedure",
        desc: "Dough ring placed on the lower back, filled with hot Mahanarayan or Ksheerabala oil. Maintained for 40–45 minutes.",
      },
      {
        step: 3,
        title: "Physiotherapy Integration",
        desc: "Ayurvedic physiotherapy exercises, Yoga asanas, and lifestyle modifications for long-term relief.",
      },
    ],
    suitableFor: [
      "Chronic back pain sufferers",
      "Office workers with sedentary lifestyle",
      "Sciatica patients",
      "Post-disc surgery rehabilitation",
    ],
    avoidIf: [
      "Active spine infection",
      "Recent spinal fracture",
      "Spinal cord compression requiring surgery",
    ],
    featured: false,
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getFeaturedTreatments(): Treatment[] {
  return treatments.filter((t) => t.featured);
}
