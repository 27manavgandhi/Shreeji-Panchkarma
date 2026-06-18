"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Check, Filter } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { formatPrice, getDiscount } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "supplements", label: "Supplements" },
  { id: "skincare", label: "Skincare" },
  { id: "soaps", label: "Soaps" },
];

function ShopProductCard({ product }: { product: typeof products[0] }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const discount = getDiscount(product.price, product.mrp);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setTimeout(() => openCart(), 300);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group flex flex-col">
      {/* Image zone */}
      <Link href={`/product/${product.slug}`}>
        <div className={`relative h-60 bg-gradient-to-br ${product.gradientClass} flex items-center justify-center cursor-pointer`}>
          {product.badge && (
            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-600 font-raleway ${product.badgeColor} -rotate-2`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 left-4 px-2 py-0.5 rounded-full bg-green-500/90 text-white text-xs font-600 font-raleway">
              {discount}% OFF
            </span>
          )}
          <div className="product-orb group-hover:scale-110 transition-transform duration-300">
            <span className="text-5xl">
              {product.id.includes("shilajeet") ? "🪨" : product.id.includes("soap") ? "🌿" : "✨"}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-accent text-accent" />
          ))}
          <span className="text-xs text-forest-muted font-raleway ml-1">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-cormorant font-600 text-forest text-xl mb-1 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="font-raleway text-xs text-accent font-500 mb-2">{product.tagline}</p>
        <p className="font-raleway text-sm text-forest-muted line-clamp-2 flex-1 mb-4">{product.shortDesc}</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-cormorant font-700 text-2xl text-forest">{formatPrice(product.price)}</span>
          <span className="text-sm text-forest-muted/50 line-through font-raleway">{formatPrice(product.mrp)}</span>
          <span className="text-xs text-forest-muted/60 font-raleway">/ {product.unit}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-raleway font-600 text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            added ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {added ? <><Check size={14} /> Added!</> : <><ShoppingBag size={14} /> Add to Cart</>}
        </motion.button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[45vh] bg-gradient-to-br from-chapter-1 to-chapter-2 flex items-end pt-24 relative">
        <div className="container-custom pb-14 relative z-10">
          <AnimatedSection>
            <p className="text-accent font-raleway text-xs tracking-widest uppercase mb-3">Ayurvedic Formulations</p>
            <h1 className="font-cormorant font-700 text-white mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Our Ayurvedic Shop
            </h1>
            <p className="font-raleway text-white/70 max-w-xl leading-relaxed">
              Handcrafted from the same herbs and protocols we use in our clinic. Each product is physician-formulated and batch-tested for purity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Shop */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <Filter size={16} className="text-forest-muted" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-raleway font-500 transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-white border border-cream-section text-forest-muted hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-cormorant font-600 text-forest text-2xl mb-2">No products found</p>
              <p className="font-raleway text-forest-muted text-sm">Try a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 bg-cream-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { emoji: "🌿", title: "100% Natural", desc: "No artificial additives, preservatives or chemicals" },
              { emoji: "🚚", title: "Free Shipping", desc: "On all orders above ₹999 — Pan India" },
              { emoji: "🔬", title: "Lab Tested", desc: "Every batch tested for purity and potency" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-cream-section">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="font-cormorant font-600 text-forest text-xl mb-1">{item.title}</p>
                <p className="font-raleway text-sm text-forest-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
