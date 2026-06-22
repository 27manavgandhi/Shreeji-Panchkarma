export interface TimelineEntry {
  year: string;
  title: string;
  chapter: string;
  desc: string;
  highlight: string;
  color: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2009",
    title: "A clinic born from purpose",
    chapter: "Chapter I",
    color: "#1B4332",
    desc: "Dr. Rajesh Sharma returned from Banaras Hindu University with his MD in Panchakarma and one mission — to end the Ayurvedic desert in Haryana. He began in a modest clinic in Model Town, Sonipat.",
    highlight: "First patient treated on opening day",
  },
  {
    year: "2012",
    title: "1,000 lives changed",
    chapter: "Chapter II",
    color: "#2D6A4F",
    desc: "By 2012, Shreeji Panchkarma had treated its 1,000th patient. Every one arrived by word of mouth — not a single rupee was spent on advertising.",
    highlight: "Zero advertising, 100% word of mouth",
  },
  {
    year: "2015",
    title: "Expanding the sanctuary",
    chapter: "Chapter III",
    color: "#40916C",
    desc: "Demand outgrew our walls. We expanded to 8 dedicated treatment rooms and built an in-house herbal pharmacy preparing fresh Kashayams daily.",
    highlight: "8 treatment rooms, in-house pharmacy",
  },
  {
    year: "2018",
    title: "The government takes notice",
    chapter: "Chapter IV",
    color: "#C9A84C",
    desc: "The Ministry of AYUSH, Government of India, granted full certification to Shreeji Panchkarma — official recognition that classical Ayurveda was being practiced here.",
    highlight: "AYUSH Ministry certified",
  },
  {
    year: "2022",
    title: "Delhi NCR discovers Sonipat",
    chapter: "Chapter V",
    color: "#2D6A4F",
    desc: "Patients began making the journey from Delhi, Gurgaon, Noida and Faridabad — bypassing clinics closer to home to reach us. We extended hours, never shortcuts.",
    highlight: "Patients from 8+ cities",
  },
  {
    year: "2024",
    title: "Healing reaches every home",
    chapter: "Chapter VI",
    color: "#1B4332",
    desc: "Our physician-formulated Ayurvedic products — the same herbs used in treatment — are now available online, extending the clinic's reach beyond Sonipat.",
    highlight: "Online store, pan-India delivery",
  },
];

export interface PhilosophyItem {
  title: string;
  desc: string;
  color: string;
  iconKey: "stethoscope" | "book" | "flask" | "leaf";
}

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    iconKey: "stethoscope",
    title: "Physician-led, always",
    desc: "No treatment is administered without direct physician assessment and continuous monitoring. We are a medical clinic, not a spa.",
    color: "#1B4332",
  },
  {
    iconKey: "book",
    title: "Classical texts only",
    desc: "Our protocols follow the Charaka Samhita and Sushruta Samhita without dilution, modification, or shortcuts taken for convenience.",
    color: "#2D6A4F",
  },
  {
    iconKey: "flask",
    title: "Ingredient integrity",
    desc: "Every herb is sourced from certified organic farms. Our in-house pharmacy prepares fresh Kashayams, Ghritams and Taila daily.",
    color: "#40916C",
  },
  {
    iconKey: "leaf",
    title: "Prakriti-first approach",
    desc: "Every healing journey begins with your unique body constitution. Your treatment plan is as individual as your fingerprint.",
    color: "#C9A84C",
  },
];

export const STATS = [
  { value: "10,000+", label: "Patients healed", sub: "Since 2009" },
  { value: "15+", label: "Years of practice", sub: "Unbroken expertise" },
  { value: "50+", label: "Herbal formulations", sub: "In-house pharmacy" },
  { value: "98%", label: "Patient satisfaction", sub: "Word-of-mouth growth" },
];

export const CERTIFICATIONS = [
  { name: "Ministry of AYUSH — Government of India", iconKey: "shield" as const },
  { name: "Central Council of Indian Medicine (CCIM)", iconKey: "award" as const },
  { name: "Indian Medical Association — Ayurvedic Division", iconKey: "check" as const },
  { name: "National Medicinal Plants Board", iconKey: "leaf" as const },
  { name: "FSSAI Certified Food Products", iconKey: "check" as const },
  { name: "ISO 9001:2015 Quality Management", iconKey: "award" as const },
];

export const TESTIMONIALS = [
  {
    name: "Sumit Kaushik",
    city: "Delhi",
    condition: "Psoriasis, 8 years",
    quote:
      "I had tried everything — steroids, immunosuppressants, every dermatologist in Delhi. Three weeks of Panchakarma at Shreeji transformed my skin. The herbs they use are genuinely authentic.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    city: "Gurgaon",
    condition: "Chronic anxiety & insomnia",
    quote:
      "Shirodhara changed my relationship with sleep and stress. After 7 sessions, the anxiety I had carried for years simply dissolved. I wish I had found this place sooner.",
    rating: 5,
  },
  {
    name: "Nitesh Kumar",
    city: "Panipat",
    condition: "Knee arthritis",
    quote:
      "My orthopedic surgeon had suggested knee replacement. After 14 sessions of Janu Basti, I walk without pain. Dr. Sharma is a genuine healer — Sonipat is lucky to have this clinic.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "Is Shreeji Panchkarma AYUSH certified?",
    a: "Yes. We hold full certification from the Ministry of AYUSH, Government of India, alongside credentials from the Central Council of Indian Medicine and ISO 9001:2015 quality management certification.",
  },
  {
    q: "Who treats patients at the clinic?",
    a: "Dr. Rajesh Sharma, our chief physician, holds a BAMS and an MD in Panchakarma from Banaras Hindu University. He personally assesses every treatment plan, supported by a team of AYUSH-registered physicians.",
  },
  {
    q: "Do you see patients from outside Sonipat?",
    a: "Yes — patients regularly travel from Delhi, Gurgaon, Noida, Faridabad, Panipat and Rohtak. We extend consultation hours to accommodate the journey, without compromising on protocol.",
  },
  {
    q: "What makes your approach different?",
    a: "Every treatment follows classical texts without dilution, is physician-led from start to finish, and uses herbs prepared fresh in our in-house pharmacy rather than pre-packaged formulations.",
  },
];

export const DOCTOR_CREDENTIALS = [
  "BAMS (Bachelor of Ayurvedic Medicine & Surgery) — BHU",
  "MD Panchakarma — Banaras Hindu University, Varanasi",
  "20+ years of clinical practice in Panchakarma",
  "AYUSH Ministry registered physician (Reg. No. CCIM/HAR/2009)",
  "Former consultant — AIIMS Ayurveda Integration Programme",
  "Published researcher on classical Panchakarma protocol efficacy",
];

export const QUICK_FACTS = [
  { label: "Established", value: "2009", sub: "Sonipat, Haryana", color: "#1B4332" },
  { label: "Treatments", value: "6+", sub: "AYUSH protocols", color: "#2D6A4F" },
  { label: "Products", value: "50+", sub: "In-house pharmacy", color: "#C9A84C" },
  { label: "Cities served", value: "8+", sub: "Delhi NCR & Haryana", color: "#40916C" },
];