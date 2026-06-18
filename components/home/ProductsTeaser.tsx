"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Check, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { formatPrice, getDiscount } from "@/lib/utils";

interface FloatLabel {
  id: string;
  x: number;
  y: number;
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const [floatLabels, setFloatLabels] = useState<FloatLabel[]>([]);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleAddToCart = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now().toString();
    setFloatLabels((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => {
      setFloatLabels((prev) => prev.filter((l) => l.id !== id));
    }, 900);

    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setTimeout(() => openCart(), 300);
  }, [addItem, openCart, product]);

  const discount = getDiscount(product.price, product.mrp);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.12s linear",
      }}
      className="will-change-transform"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-cream-section shadow-card hover:shadow-card-hover hover:-translate-y-3 transition-all duration-300 group relative h-full flex flex-col">
        {/* Badge */}
        <div
          className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-white text-xs font-600 font-raleway -rotate-2 ${product.badgeColor} animate-badge-pulse shimmer`}
        >
          {product.badge}
        </div>

        {/* Visual zone */}
        <div
          className={`relative h-52 bg-gradient-to-br ${product.gradientClass} flex items-center justify-center overflow-hidden`}
        >
          {/* Background rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-48 h-48 rounded-full border border-white animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-36 h-36 rounded-full border border-white animate-[spin_15s_linear_infinite_reverse]" />
          </div>
          {/* Product orb */}
          <div className="product-orb group-hover:scale-110 transition-transform duration-300">
            <span className="text-5xl select-none" role="img" aria-label={product.shortName}>
              {product.id.includes("shilajeet") ? "🪨" : product.id.includes("soap") ? "🌿" : "✨"}
            </span>
          </div>
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute bottom-3 left-3 bg-green-500/90 text-white text-xs font-600 font-raleway px-2 py-0.5 rounded-full">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Info zone */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-accent text-accent" />
            ))}
            <span className="text-xs text-forest-muted font-raleway ml-1">
              ({product.reviewCount})
            </span>
          </div>

          <h3 className="font-cormorant font-600 text-forest text-xl leading-tight mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="font-raleway text-xs text-accent font-500 mb-3">{product.tagline}</p>
          <p className="font-raleway text-sm text-forest-muted leading-relaxed mb-4 flex-1 line-clamp-3">
            {product.shortDesc}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="font-cormorant font-700 text-2xl text-forest">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-forest-muted/50 line-through font-raleway">
              {formatPrice(product.mrp)}
            </span>
            <span className="text-xs font-raleway text-forest-muted/60">
              / {product.unit}
            </span>
          </div>

          {/* Add to cart */}
          <div className="relative">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`relative w-full py-3 rounded-xl font-raleway font-600 text-sm transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={14} /> Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Floating +1 labels */}
            <AnimatePresence>
              {floatLabels.map((label) => (
                <motion.div
                  key={label.id}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -50, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute pointer-events-none font-cormorant font-700 text-accent text-xl z-20"
                  style={{ left: label.x, top: 0 }}
                >
                  +1
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View detail link */}
          <Link
            href={`/product/${product.slug}`}
            className="mt-3 text-center text-xs font-raleway text-forest-muted hover:text-primary transition-colors cursor-pointer"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProductsTeaser() {
  return (
    <section id="products" className="section-padding bg-cream-section relative overflow-hidden">
      {/* Subtle leaf bg */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.04] pointer-events-none rotate-45" aria-hidden="true">
        <Sparkles size={256} className="text-primary" />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-14">
          <p className="text-xs font-raleway font-500 tracking-widest uppercase text-accent mb-3">
            Ayurvedic Formulations
          </p>
          <h2 className="font-cormorant font-600 text-forest mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Bring the Healing Home
          </h2>
          <SanskritDivider color="#C9A84C" className="my-4" />
          <p className="font-raleway text-forest-muted max-w-xl mx-auto text-base leading-relaxed">
            Our handcrafted Ayurvedic formulations — made from the same herbs and protocols we use in our clinic. The healing continues beyond our walls.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-7" staggerDelay={0.1}>
          {products.map((product, i) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center mt-12">
          <p className="font-raleway text-forest-muted text-sm mb-5">
            Free shipping on orders above ₹999 · Authentic Ayurvedic formulations
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-raleway font-600 text-sm transition-all duration-300 cursor-pointer"
          >
            Visit Our Full Shop
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
