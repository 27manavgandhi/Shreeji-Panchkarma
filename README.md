# Shreeji Panchkarma — Complete Next.js Website

Premium Ayurvedic wellness center website with storytelling design, e-commerce, and full SEO optimization for Sonipat, Delhi NCR, and Haryana.

---

## ✅ What's Built

### Pages (9 total)
| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | 11-section storytelling journey |
| About | `/about` | Origin story, timeline, philosophy |
| Treatments | `/treatments` | All 6 treatments listing + FAQ |
| Treatment Detail | `/treatments/[slug]` | Full page for each treatment |
| City SEO Pages | `/treatments/[city]` | Programmatic pages for 8 cities |
| Shop | `/shop` | Product listing with filter |
| Product Detail | `/product/[slug]` | Full product page with cart |
| Cart | `/cart` | Cart management |
| Checkout | `/checkout` | Checkout form |
| Blog | `/blog` | Article listing |
| Blog Post | `/blog/[slug]` | Full post with FAQ schema |
| Contact | `/contact` | Form + info |

### Components (20+)
- `HeroSection` — Canvas particles, word-by-word headline, magnetic CTAs, 3D tilt
- `StorySection` — Brand origin narrative + timeline
- `PhilosophySection` — Sanskrit quote, Tri-Dosha bento grid
- `TreatmentsPreview` — 6-card stagger grid
- `StatsSection` — Animated counters on scroll
- `ProductsTeaser` — 3D tilt product cards, ripple add-to-cart, +1 float animation
- `TestimonialsSection` — Auto-playing carousel
- `DoctorSection` — Physician credentials
- `BlogPreview` — 3 article cards
- `CTASection` — Split contact + form strip
- `Navbar` — Floating glass morphism, mobile sheet
- `Footer` — 4-column with WhatsApp float
- `CartDrawer` — Slide-in panel with full cart management
- `ScrollProgress` — Chapter progress dots + top bar
- `AnimatedSection` / `StaggerContainer` / `StaggerItem` — Scroll reveal
- `ParallaxLayer` — Spring-physics parallax
- `SanskritDivider` — SVG lotus mandala divider
- `MarqueeBar` — Infinite marquee trust signals

### SEO
- 7 JSON-LD schema types (LocalBusiness, MedicalBusiness, Product, FAQ, BreadcrumbList, BlogPosting, MedicalProcedure)
- Programmatic city pages for: Sonipat, Delhi, Gurgaon, Noida, Faridabad, Panipat, Rohtak, Bahadurgarh
- Dynamic sitemap via `app/sitemap.ts`
- `next-sitemap` for robots.txt + XML sitemap generation
- Full Open Graph + Twitter card on every page
- Keyword-optimized titles, descriptions, headings on all pages
- 3 full blog posts (1,000–1,200 words each) with FAQ schema

### Design System
- **Fonts:** Cormorant Garamond (headings) + Raleway (body) + Lora (accents/quotes)
- **Palette:** Forest green / warm gold / cream / amber
- **Animations:** Framer Motion scroll reveals, parallax, page transitions
- **Pattern:** Scroll-Triggered Storytelling (UI/UX Pro Max)

---

## 🚀 Setup — Run These Commands in Order

```bash
# 1. Create the Next.js project
npx create-next-app@latest shreeji-panchkarma \
  --typescript --tailwind --eslint --app \
  --src-dir=false --import-alias="@/*"

cd shreeji-panchkarma

# 2. Copy all project files into this directory
# (Replace the auto-generated files with the ones from this project)

# 3. Install dependencies
npm install framer-motion lucide-react zustand \
  react-hook-form @hookform/resolvers zod \
  next-sitemap @next/mdx @mdx-js/loader @mdx-js/react \
  gray-matter reading-time clsx tailwind-merge \
  class-variance-authority \
  @radix-ui/react-dialog @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-toast \
  @radix-ui/react-accordion @radix-ui/react-slot

# 4. Install shadcn/ui
npx shadcn@latest init
# Select: Default style | Slate base color | CSS variables: Yes

# 5. Add shadcn components
npx shadcn@latest add button input label textarea \
  dialog sheet toast badge separator card form select

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
shreeji-panchkarma/
├── app/
│   ├── (marketing)/          # Public website pages
│   │   ├── page.tsx          # ← Homepage (START HERE)
│   │   ├── about/
│   │   ├── treatments/
│   │   │   ├── [slug]/       # Dynamic treatment pages
│   │   │   └── [city]/       # Programmatic SEO city pages
│   │   ├── blog/
│   │   └── contact/
│   ├── (shop)/               # E-commerce pages
│   │   ├── shop/
│   │   ├── product/[slug]/
│   │   ├── cart/
│   │   └── checkout/
│   ├── api/contact/          # Contact form API
│   ├── globals.css
│   ├── layout.tsx
│   ├── sitemap.ts
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── home/                 # Homepage section components
│   ├── layout/               # Navbar, Footer, CartDrawer
│   └── shared/               # AnimatedSection, ParallaxLayer, etc.
├── lib/
│   ├── products.ts           # Product data + helpers
│   ├── treatments.ts         # Treatment data + helpers
│   ├── store.ts              # Zustand cart store
│   ├── seo.ts                # SEO helpers + JSON-LD generators
│   └── utils.ts              # cn(), formatPrice(), etc.
└── styles/
    └── animations.css        # Blog prose + animation overrides
```

---

## 🎨 Design Tokens

```css
/* Colors */
--color-primary:      #2D6A4F   /* Deep forest green */
--color-accent:       #C9A84C   /* Warm gold */
--color-bg:           #FDFAF4   /* Warm cream */
--color-text:         #1A2E1A   /* Deep forest */

/* Fonts */
--font-cormorant      /* Headings — editorial serif */
--font-raleway        /* Body — clean sans */
--font-lora           /* Quotes, Sanskrit — warm serif */
```

---

## 🔧 Customization

### Update Business Info
Edit `lib/seo.ts` → `BUSINESS_INFO` object:
- Phone number
- Address
- Google Maps coordinates
- Social media URLs

### Add Products
Edit `lib/products.ts` — add to the `products` array following the `Product` interface.

### Add Blog Posts
Add to the `POSTS` object in `app/(marketing)/blog/[slug]/page.tsx`.

### Add Treatment Pages
Add to `lib/treatments.ts` and the dynamic `[slug]` route handles everything automatically.

### Email Integration
In `app/api/contact/route.ts`, uncomment and configure your email provider (Resend, SendGrid, Nodemailer).

---

## 🌐 Deployment (Vercel)

```bash
# Build locally first to check for errors
npm run build

# Deploy to Vercel
npx vercel --prod
```

Set these environment variables in Vercel:
```
NEXT_PUBLIC_SITE_URL=https://shreejipanchkarma.com
```

---

## 📊 SEO Target Keywords

| Keyword | Target Page |
|---------|-------------|
| panchkarma center sonipat | Homepage, /treatments |
| ayurvedic treatment sonipat haryana | Homepage, /about |
| best panchkarma clinic delhi ncr | /treatments/delhi |
| shirodhara sonipat | /treatments/stress-relief |
| kati basti back pain haryana | /treatments/kati-basti |
| buy pure shilajeet online india | /product/himalayan-shilajeet-resin |
| ayurvedic weight loss treatment delhi | /treatments/weight-loss |

---

## ⚡ Performance Notes

- All images use `next/image` with WebP/AVIF conversion
- Fonts loaded via `next/font` (zero layout shift)
- Animations respect `prefers-reduced-motion`
- Cart state in Zustand (no SSR hydration issues — use `"use client"`)
- `will-change: transform` applied to animated elements

---

Built with ❤️ for Shreeji Panchkarma, Sonipat — Ancient Wisdom. Modern Wellness.
