"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, ShoppingBag, Check, ChevronDown, ChevronUp,
  ArrowLeft, Truck, Shield, RefreshCw,
} from "lucide-react";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { formatPrice, getDiscount, cn } from "@/lib/utils";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream-section">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      >
        <span className="font-cormorant font-600 text-forest text-xl">{title}</span>
        {open ? <ChevronUp size={18} className="text-forest-muted" /> : <ChevronDown size={18} className="text-forest-muted" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 2);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const discount = getDiscount(product.price, product.mrp);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setTimeout(() => openCart(), 400);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-cream-section border-b border-cream-section">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-xs font-raleway text-forest-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-forest">{product.shortName}</span>
          </div>
        </div>
      </div>

      {/* Main product */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Visuals */}
            <AnimatedSection direction="left">
              <div className="space-y-4">
                {/* Main visual */}
                <div className={`h-96 rounded-2xl bg-gradient-to-br ${product.gradientClass} flex items-center justify-center relative overflow-hidden`}>
                  <div className="product-orb" style={{ width: 130, height: 130 }}>
                    <span className="text-7xl">
                      {product.id.includes("shilajeet") ? "🪨" : product.id.includes("soap") ? "🌿" : "✨"}
                    </span>
                  </div>
                  {product.badge && (
                    <span className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-white text-xs font-600 font-raleway ${product.badgeColor} -rotate-2`}>
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-600 font-raleway">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  {["Ingredients", "Usage", "Packaging"].map((label) => (
                    <div key={label} className={`h-24 rounded-xl bg-gradient-to-br ${product.gradientClass} opacity-70 flex items-center justify-center cursor-pointer hover:opacity-100 transition-opacity`}>
                      <span className="text-white/60 text-xs font-raleway">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Info */}
            <AnimatedSection direction="right">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-forest-muted font-raleway">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <h1 className="font-cormorant font-700 text-forest mb-2" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
                {product.name}
              </h1>
              <p className="font-lora italic text-accent text-lg mb-5">{product.tagline}</p>
              <p className="font-raleway text-forest-muted text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-cormorant font-700 text-4xl text-forest">{formatPrice(product.price)}</span>
                <span className="text-lg text-forest-muted/50 line-through font-raleway">{formatPrice(product.mrp)}</span>
                <span className="text-sm text-forest-muted/70 font-raleway">/ {product.unit}</span>
                {discount > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs font-600 font-raleway px-2 py-0.5 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-cream-section rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-forest-muted hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-cormorant font-600 text-forest text-xl">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-forest-muted hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={cn(
                    "flex-1 py-4 rounded-xl font-raleway font-600 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                    added ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary-dark"
                  )}
                >
                  {added ? <><Check size={16} /> Added to Cart!</> : <><ShoppingBag size={16} /> Add to Cart</>}
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 py-5 border-y border-cream-section">
                {[
                  { icon: Truck, label: "Free above ₹999" },
                  { icon: Shield, label: "100% Authentic" },
                  { icon: RefreshCw, label: "7-day returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={18} className="text-primary mx-auto mb-1" />
                    <p className="font-raleway text-xs text-forest-muted">{label}</p>
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div className="mt-5">
                <AccordionItem title="Benefits">
                  <ul className="space-y-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="font-raleway text-sm text-forest-muted">{b}</p>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem title="Ingredients">
                  <p className="font-raleway text-sm text-forest-muted leading-relaxed">{product.ingredients}</p>
                </AccordionItem>
                <AccordionItem title="How to Use">
                  <p className="font-raleway text-sm text-forest-muted leading-relaxed">{product.howToUse}</p>
                </AccordionItem>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section-padding bg-cream-section">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-10">
              <h2 className="font-cormorant font-600 text-forest text-4xl">You May Also Like</h2>
            </AnimatedSection>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto" staggerDelay={0.1}>
              {related.map((p) => (
                <StaggerItem key={p.id}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                      <div className={`h-40 bg-gradient-to-br ${p.gradientClass} flex items-center justify-center`}>
                        <span className="text-4xl">
                          {p.id.includes("shilajeet") ? "🪨" : p.id.includes("soap") ? "🌿" : "✨"}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-cormorant font-600 text-forest text-lg mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="font-cormorant font-700 text-xl text-forest">{formatPrice(p.price)}</span>
                          <span className="text-xs text-forest-muted/50 line-through font-raleway">{formatPrice(p.mrp)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
