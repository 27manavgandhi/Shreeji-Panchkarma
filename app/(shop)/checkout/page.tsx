"use client";

import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function CheckoutPage() {
  const { items, getTotal, getSavings } = useCartStore();
  const total = getTotal();
  const savings = getSavings();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-cormorant font-600 text-forest text-3xl mb-4">Your cart is empty</p>
          <Link href="/shop" className="text-primary font-raleway hover:underline">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-cream pt-28 pb-16">
      <div className="container-custom">
        <AnimatedSection className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-forest-muted hover:text-primary font-raleway text-sm transition-colors mb-4"
          >
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-primary" />
            <h1 className="font-cormorant font-700 text-forest text-4xl">Secure Checkout</h1>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl border border-cream-section shadow-card p-7">
              <h2 className="font-cormorant font-600 text-forest text-2xl mb-5">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Email Address", name: "email", type: "email" },
                  { label: "Phone / WhatsApp", name: "phone", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl border border-cream-section shadow-card p-7">
              <h2 className="font-cormorant font-600 text-forest text-2xl mb-5">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-1.5">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    placeholder="House/Flat No., Street, Colony"
                    className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                  />
                </div>
                <div>
                  <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-1.5">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Landmark, Sector, etc."
                    className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "City", name: "city" },
                    { label: "State", name: "state" },
                    { label: "PIN Code", name: "pin" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-1.5">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        name={f.name}
                        className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment note */}
            <div className="bg-primary/5 rounded-2xl border border-primary/15 p-6 flex gap-4">
              <CreditCard size={22} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-raleway font-600 text-forest text-sm mb-1">
                  Secure Payment via Razorpay
                </p>
                <p className="font-raleway text-forest-muted text-sm leading-relaxed">
                  We accept UPI, Credit/Debit Cards, Net Banking, and Wallets. All transactions are encrypted and secured by Razorpay.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-cream-section shadow-card p-6 sticky top-24">
              <h2 className="font-cormorant font-600 text-forest text-2xl mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-raleway text-sm font-500 text-forest">{item.shortName}</p>
                      <p className="font-raleway text-xs text-forest-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-raleway font-600 text-forest text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-section pt-4 space-y-2 mb-5">
                {savings > 0 && (
                  <div className="flex justify-between text-sm font-raleway">
                    <span className="text-green-600">You Save</span>
                    <span className="text-green-600 font-600">− {formatPrice(savings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-raleway">
                  <span className="text-forest-muted">Shipping</span>
                  <span className={total >= 999 ? "text-green-600 font-500" : "text-forest"}>
                    {total >= 999 ? "FREE" : formatPrice(99)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-cream-section">
                  <span className="font-raleway font-600 text-forest">Total</span>
                  <span className="font-cormorant font-700 text-3xl text-forest">
                    {formatPrice(total >= 999 ? total : total + 99)}
                  </span>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer flex items-center justify-center gap-2 mb-3">
                <Lock size={14} /> Place Order Securely
              </button>
              <div className="flex items-center justify-center gap-2 text-xs font-raleway text-forest-muted/60">
                <Truck size={13} />
                Estimated delivery: 3–5 business days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
