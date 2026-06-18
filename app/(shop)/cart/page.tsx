"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getMrpTotal, getSavings, getItemCount } = useCartStore();
  const total = getTotal();
  const savings = getSavings();

  return (
    <section className="section-padding bg-cream min-h-screen pt-32">
      <div className="container-custom">
        <AnimatedSection className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={24} className="text-primary" />
            <h1 className="font-cormorant font-700 text-forest text-4xl">Your Cart</h1>
            {getItemCount() > 0 && (
              <span className="bg-primary/10 text-primary text-sm font-600 px-3 py-0.5 rounded-full font-raleway">
                {getItemCount()} items
              </span>
            )}
          </div>
        </AnimatedSection>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} className="text-primary/40" />
            </div>
            <h2 className="font-cormorant font-600 text-forest text-3xl mb-3">Your cart is empty</h2>
            <p className="font-raleway text-forest-muted mb-8">Explore our Ayurvedic formulations</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-5 border border-cream-section shadow-card flex gap-5"
                >
                  <div className={cn("w-20 h-20 rounded-xl bg-gradient-to-br flex-shrink-0", item.gradientClass)} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-cormorant font-600 text-forest text-lg">{item.name}</h3>
                        <p className="font-raleway text-xs text-forest-muted">{item.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-forest-muted/40 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-cream-section rounded-full px-1.5 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-forest-muted hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                          <Minus size={11} />
                        </button>
                        <span className="w-8 text-center font-600 text-forest font-raleway text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-forest-muted hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                          <Plus size={11} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-cormorant font-700 text-forest text-xl">{formatPrice(item.price * item.quantity)}</p>
                        {item.mrp > item.price && (
                          <p className="text-xs text-forest-muted/50 line-through font-raleway">{formatPrice(item.mrp * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-cream-section shadow-card p-6 sticky top-24">
                <h2 className="font-cormorant font-600 text-forest text-2xl mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm font-raleway">
                    <span className="text-forest-muted">Subtotal (MRP)</span>
                    <span className="text-forest-muted/60 line-through">{formatPrice(getMrpTotal())}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm font-raleway">
                      <span className="text-green-600 font-500">Discount</span>
                      <span className="text-green-600 font-600">− {formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-raleway">
                    <span className="text-forest-muted">Shipping</span>
                    <span className={total >= 999 ? "text-green-600 font-500" : "text-forest"}>
                      {total >= 999 ? "FREE" : formatPrice(99)}
                    </span>
                  </div>
                </div>
                <div className="border-t border-cream-section pt-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-raleway font-600 text-forest">Total</span>
                    <span className="font-cormorant font-700 text-3xl text-forest">
                      {formatPrice(total >= 999 ? total : total + 99)}
                    </span>
                  </div>
                </div>
                {total < 999 && (
                  <div className="bg-amber-50 rounded-xl p-3 mb-4 flex items-start gap-2">
                    <Tag size={14} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-raleway text-xs text-accent-dark">
                      Add {formatPrice(999 - total)} more for free shipping!
                    </p>
                  </div>
                )}
                <Link
                  href="/checkout"
                  className="block w-full text-center bg-primary text-white py-4 rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer mb-3"
                >
                  Proceed to Checkout →
                </Link>
                <Link
                  href="/shop"
                  className="block w-full text-center text-sm font-raleway text-forest-muted hover:text-primary transition-colors cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
