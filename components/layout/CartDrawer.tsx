"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, getDiscount } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getMrpTotal, getSavings, getItemCount } =
    useCartStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const total = getTotal();
  const savings = getSavings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-cream flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-section bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-cormorant font-600 text-xl text-forest">
                  Your Cart
                </h2>
                {getItemCount() > 0 && (
                  <span className="bg-primary/10 text-primary text-xs font-600 px-2 py-0.5 rounded-full font-raleway">
                    {getItemCount()} items
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl text-forest-muted hover:text-forest hover:bg-cream-section transition-all duration-200 cursor-pointer"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-primary/50" />
                  </div>
                  <div>
                    <p className="font-cormorant font-600 text-2xl text-forest mb-2">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-forest-muted font-raleway">
                      Explore our Ayurvedic formulations and begin your healing journey.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-600 font-raleway hover:bg-primary-dark transition-colors cursor-pointer"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-2xl p-4 flex gap-4 shadow-card"
                    >
                      {/* Product visual */}
                      <div
                        className={cn(
                          "w-16 h-16 rounded-xl bg-gradient-to-br flex-shrink-0",
                          item.gradientClass
                        )}
                      />
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-cormorant font-600 text-base text-forest leading-tight mb-0.5">
                          {item.shortName}
                        </p>
                        <p className="text-xs text-forest-muted font-raleway mb-2">
                          {item.unit}
                        </p>
                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2 bg-cream-section rounded-full px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-forest hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-sm font-600 font-raleway text-forest">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-forest hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          {/* Price */}
                          <div className="text-right">
                            <p className="font-600 text-forest text-sm font-raleway">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.mrp > item.price && (
                              <p className="text-[11px] text-forest-muted/60 line-through font-raleway">
                                {formatPrice(item.mrp * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1 text-forest-muted/50 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-section bg-white p-6 space-y-4">
                {savings > 0 && (
                  <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-2.5">
                    <span className="text-sm text-green-700 font-raleway font-500">
                      🎉 You save
                    </span>
                    <span className="text-sm font-700 text-green-700 font-raleway">
                      {formatPrice(savings)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-raleway font-500 text-forest-muted">Total</span>
                  <span className="font-cormorant font-700 text-2xl text-forest">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-forest-muted/60 font-raleway text-center">
                  Shipping calculated at checkout · Free above ₹999
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-2xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-sm text-forest-muted hover:text-primary font-raleway transition-colors cursor-pointer py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
