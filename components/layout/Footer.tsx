import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Heart, MessageCircle } from "lucide-react";
import SanskritDivider from "@/components/shared/SanskritDivider";
import Logo from "./Logo";

const TREATMENTS = [
  { label: "Panchakarma", href: "/treatments/panchakarma" },
  { label: "Weight Management", href: "/treatments/weight-loss" },
  { label: "Shirodhara", href: "/treatments/stress-relief" },
  { label: "Skin Therapy", href: "/treatments/skin-treatment" },
  { label: "Janu Basti", href: "/treatments/janu-basti" },
  { label: "Kati Basti", href: "/treatments/kati-basti" },
];

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book Consultation", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-chapter-1 text-white/75 relative overflow-hidden">
      {/* Decorative bg leaf */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="white">
          <path d="M100 10 C140 30,190 80,170 130 C150 180,80 190,40 160 C0 130,10 60,50 30 C70 15,90 5,100 10Z" />
        </svg>
      </div>

      <div className="container-custom pt-14 pb-8">
        <SanskritDivider color="rgba(201,168,76,0.4)" className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo light size="md" className="mb-5" />
            <p className="text-sm font-raleway text-white/55 leading-relaxed mb-5 max-w-xs">
              Haryana's most trusted AYUSH-certified Ayurvedic Panchakarma center. Healing through ancient wisdom since 2009.
            </p>
            <div className="flex gap-2.5">
              {[
                { href: "https://instagram.com/shreejipanchkarma", Icon: Instagram, label: "Instagram" },
                { href: "https://facebook.com/shreejipanchkarma", Icon: Facebook, label: "Facebook" },
                { href: "https://youtube.com/@shreejipanchkarma", Icon: Youtube, label: "YouTube" },
                { href: "https://wa.me/919876543210", Icon: MessageCircle, label: "WhatsApp" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-accent/25 hover:text-accent transition-all duration-200 cursor-pointer"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-cormorant font-600 text-white text-lg mb-5">Treatments</h3>
            <ul className="space-y-2.5">
              {TREATMENTS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm font-raleway text-white/55 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cormorant font-600 text-white text-lg mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm font-raleway text-white/55 hover:text-accent transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-cormorant font-600 text-white text-lg mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm font-raleway text-white/55 leading-relaxed">
                  Near Railway Station, Model Town,<br />Sonipat, Haryana – 131001
                </p>
              </li>
              <li className="flex gap-3">
                <Phone size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+919876543210" className="text-sm font-raleway text-white/55 hover:text-accent transition-colors block">+91 98765 43210</a>
                  <a href="tel:+919876543211" className="text-sm font-raleway text-white/55 hover:text-accent transition-colors block">+91 98765 43211</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@shreejipanchkarma.com" className="text-sm font-raleway text-white/55 hover:text-accent transition-colors break-all">
                  info@shreejipanchkarma.com
                </a>
              </li>
            </ul>
            <div className="mt-5 bg-white/5 rounded-xl p-3 border border-white/8">
              <p className="font-raleway font-500 text-white/70 text-xs mb-1">Hours</p>
              <p className="text-xs font-raleway text-white/50">Mon–Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-xs font-raleway text-white/50">Sunday: 10:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-raleway text-white/35 text-center sm:text-left">
            © {new Date().getFullYear()} Shreeji Panchkarma. All rights reserved.
            <span className="mx-2">·</span>AYUSH Ministry Certified
          </p>
          <p className="text-xs font-raleway text-white/35 flex items-center gap-1">
            Made with <Heart size={10} className="text-accent fill-accent mx-0.5" /> in Haryana, India
          </p>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919876543210?text=Hello%2C%20I%20want%20to%20book%20a%20Panchakarma%20consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </a>
    </footer>
  );
}
