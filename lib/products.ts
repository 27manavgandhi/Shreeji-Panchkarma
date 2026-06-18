export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  mrp: number;
  unit: string;
  badge: string;
  badgeColor: string;
  category: "supplements" | "skincare" | "soaps";
  rating: number;
  reviewCount: number;
  description: string;
  shortDesc: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  gradient: string;
  gradientClass: string;
  accentColor: string;
  iconBg: string;
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "himalayan-shilajeet-resin",
    slug: "himalayan-shilajeet-resin",
    name: "Himalayan Shilajeet Resin",
    shortName: "Shilajeet Resin",
    tagline: "Grade-A Altitude Extract",
    price: 1499,
    mrp: 1999,
    unit: "20g jar",
    badge: "★ Bestseller",
    badgeColor: "bg-amber-600",
    category: "supplements",
    rating: 4.8,
    reviewCount: 247,
    description:
      "Sourced from 16,000ft Himalayan altitude, our Grade-A Shilajeet resin is 100% pure with 85+ trace minerals and high fulvic acid content. Collected by traditional methods, lab-tested for purity. Zero fillers, zero additives, zero compromise.",
    shortDesc:
      "Pure Grade-A Himalayan resin. 85+ minerals, high fulvic acid. Stamina, immunity & cognitive boost.",
    benefits: [
      "Boosts stamina and physical endurance",
      "Enhances cognitive function and memory retention",
      "Strengthens immune system naturally",
      "Rich in fulvic acid and 85+ trace minerals",
      "Supports healthy testosterone and male vitality",
      "Powerful anti-inflammatory and antioxidant",
    ],
    ingredients:
      "100% Pure Himalayan Shilajeet Resin. No additives, no fillers, no artificial preservatives. Lab tested for heavy metals and purity.",
    howToUse:
      "Take a rice-grain size portion (250–500mg). Dissolve in warm milk or water. Consume once daily on empty stomach in the morning. Do not exceed recommended dose. Consult physician if pregnant or on medication.",
    gradient:
      "radial-gradient(ellipse at top, #78350F 0%, #451A03 50%, #1C0A00 100%)",
    gradientClass: "from-amber-900 via-amber-950 to-stone-950",
    accentColor: "#92400E",
    iconBg: "rgba(146, 64, 14, 0.3)",
    inStock: true,
    featured: true,
  },
  {
    id: "neem-turmeric-ayurvedic-soap",
    slug: "neem-turmeric-ayurvedic-soap",
    name: "Neem & Turmeric Ayurvedic Soap",
    shortName: "Herbal Soap",
    tagline: "Cold-Pressed Herbal Cleanse",
    price: 349,
    mrp: 449,
    unit: "100g bar",
    badge: "100% Natural",
    badgeColor: "bg-green-700",
    category: "soaps",
    rating: 4.7,
    reviewCount: 189,
    description:
      "Triple-milled cold-pressed soap bar with fresh neem leaf extract, raw turmeric powder, and pure sandalwood. Made in small batches at our Sonipat facility using traditional Ayurvedic formulation. No SLS, no parabens, no synthetic fragrance.",
    shortDesc:
      "Cold-pressed with neem, turmeric & sandalwood. Fights acne, brightens skin. Zero chemicals.",
    benefits: [
      "Fights acne, pimples and bacterial skin infections",
      "Naturally brightens and evens skin tone",
      "Deep cleanses without stripping natural moisture",
      "Neem leaf extract — powerful antibacterial",
      "Raw turmeric — anti-inflammatory and brightening",
      "Suitable for all skin types including sensitive",
    ],
    ingredients:
      "Neem Leaf Extract (5%), Raw Turmeric Powder (3%), Sandalwood Powder, Cold-Pressed Coconut Oil, Shea Butter, Glycerin, Castor Oil. Completely free from SLS, SLES, Parabens, Synthetic Dyes.",
    howToUse:
      "Wet skin thoroughly. Lather soap between palms. Apply gently to face and body using circular motions. Leave for 30 seconds to allow herbs to work. Rinse thoroughly with water. Use twice daily for best results.",
    gradient:
      "radial-gradient(ellipse at top, #065F46 0%, #064E3B 50%, #022C22 100%)",
    gradientClass: "from-emerald-900 via-green-950 to-emerald-950",
    accentColor: "#065F46",
    iconBg: "rgba(6, 95, 70, 0.3)",
    inStock: true,
    featured: true,
  },
  {
    id: "panchakarma-skin-revival-cream",
    slug: "panchakarma-skin-revival-cream",
    name: "Panchakarma Skin Revival Cream",
    shortName: "Revival Cream",
    tagline: "Saffron & Ashwagandha Night Cream",
    price: 899,
    mrp: 1199,
    unit: "50ml",
    badge: "✦ New Launch",
    badgeColor: "bg-primary-dark",
    category: "skincare",
    rating: 4.9,
    reviewCount: 93,
    description:
      "Formulated by our in-house Ayurvedic physicians with over 20 years of clinical experience. Kashmiri saffron, ashwagandha root extract and pure aloe vera gel work synergistically overnight to deeply hydrate, reduce pigmentation and restore your skin's natural Ayurvedic glow.",
    shortDesc:
      "Kashmiri saffron + ashwagandha + aloe vera. Deep overnight hydration. Fades pigmentation.",
    benefits: [
      "Deep overnight hydration for supple, plump skin",
      "Visibly reduces dark spots and pigmentation",
      "Brightens and evens skin tone naturally",
      "Kashmiri saffron for golden radiance",
      "Ashwagandha root for powerful anti-aging",
      "Non-greasy formula, absorbs within minutes",
    ],
    ingredients:
      "Kashmiri Saffron Extract (Crocus sativus), Ashwagandha Root Extract (Withania somnifera), Pure Aloe Vera Gel (99%), Rose Hip Oil, Sandalwood Extract, Vitamin E (Tocopherol). Paraben-free, Sulfate-free, Mineral Oil-free.",
    howToUse:
      "Apply a small amount (pea-sized) to clean, dry face and neck after evening cleanse. Massage gently in upward circular motions until absorbed. Use every night before sleep for best results. Avoid direct contact with eyes.",
    gradient:
      "radial-gradient(ellipse at top, #92400E 0%, #78350F 50%, #451A03 100%)",
    gradientClass: "from-orange-900 via-amber-900 to-stone-900",
    accentColor: "#B45309",
    iconBg: "rgba(180, 83, 9, 0.3)",
    inStock: true,
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(
  currentSlug: string,
  limit = 2
): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
