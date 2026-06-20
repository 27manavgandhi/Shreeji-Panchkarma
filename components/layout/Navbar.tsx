"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "Panchakarma", href: "/treatments/panchakarma" },
      { label: "Weight Management", href: "/treatments/weight-loss" },
      { label: "Shirodhara", href: "/treatments/stress-relief" },
      { label: "Skin Therapy", href: "/treatments/skin-treatment" },
      { label: "Janu Basti", href: "/treatments/janu-basti" },
      { label: "Kati Basti", href: "/treatments/kati-basti" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const isHomePage = pathname === "/";
  const isLight = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      // Turn solid after 85% of viewport height (clears the hero section)
      setScrolled(window.scrollY > Math.max(60, window.innerHeight * 0.82));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed z-50 transition-all duration-400",
          scrolled
            ? "top-0 left-0 right-0 bg-white shadow-sm border-b border-cream-section"
            : "top-3 left-3 right-3 md:top-4 md:left-4 md:right-4"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 md:px-5 transition-all duration-400",
            scrolled ? "py-3" : "py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
          )}
        >
          {/* Logo */}
          <Logo light={isLight} size="md" />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setTreatmentsOpen(true)}
                  onMouseLeave={() => setTreatmentsOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-raleway font-500 transition-all duration-200 cursor-pointer",
                      isLight
                        ? "text-white/85 hover:text-white hover:bg-white/15"
                        : "text-forest-muted hover:text-primary hover:bg-primary/8"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={cn("transition-transform duration-200", treatmentsOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {treatmentsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-float border border-cream-section overflow-hidden"
                        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2.5 px-4 py-3 text-sm text-forest-muted hover:text-primary hover:bg-primary/5 transition-colors duration-150 font-raleway"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                        <div className="border-t border-cream-section">
                          <Link
                            href="/treatments"
                            className="flex items-center px-4 py-3 text-sm text-primary font-600 hover:bg-primary/5 transition-colors font-raleway"
                          >
                            View All Treatments →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-raleway font-500 transition-all duration-200",
                    pathname === link.href
                      ? isLight ? "text-white bg-white/20" : "text-primary bg-primary/10"
                      : isLight ? "text-white/80 hover:text-white hover:bg-white/15" : "text-forest-muted hover:text-primary hover:bg-primary/8"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <a
              href="tel:+919876543210"
              className={cn(
                "hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-raleway font-500 transition-all duration-200",
                isLight ? "text-white/80 hover:text-white hover:bg-white/15" : "text-forest-muted hover:text-primary hover:bg-primary/8"
              )}
              aria-label="Call us"
            >
              <Phone size={13} />
              <span className="hidden xl:inline">+91 98765 43210</span>
            </a>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className={cn(
                "relative p-2.5 rounded-xl transition-all duration-200 cursor-pointer",
                isLight ? "text-white hover:bg-white/20" : "text-forest-muted hover:text-primary hover:bg-primary/10"
              )}
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag size={19} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent text-white text-[9px] font-700 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Book CTA */}
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-raleway font-600 transition-all duration-200 ml-1",
                isLight
                  ? "bg-white text-primary hover:bg-cream shadow-sm"
                  : "bg-primary text-white hover:bg-primary-dark shadow-green-glow"
              )}
            >
              Book Now
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                "lg:hidden p-2.5 rounded-xl transition-all duration-200 cursor-pointer",
                isLight ? "text-white hover:bg-white/20" : "text-forest hover:bg-primary/10"
              )}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-3 right-3 z-40 lg:hidden bg-white rounded-2xl shadow-float overflow-hidden border border-cream-section"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
            >
              <div className="p-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center px-4 py-3 rounded-xl text-forest font-raleway font-500 hover:text-primary hover:bg-primary/8 transition-colors text-base"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-0.5 space-y-0.5 pb-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-forest-muted hover:text-primary hover:bg-primary/8 font-raleway transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent/50" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-cream-section p-3 space-y-2">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-primary text-white py-3.5 rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors"
                >
                  Book a Consultation
                </Link>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full text-center border border-cream-section text-forest-muted py-3 rounded-xl font-raleway text-sm hover:border-primary/30 hover:text-primary transition-colors"
                >
                  <Phone size={14} /> +91 98765 43210
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}