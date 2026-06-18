import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SanskritDivider from "@/components/shared/SanskritDivider";
import { generatePageMetadata, localBusinessSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact & Book Appointment | Shreeji Panchkarma Sonipat",
  description:
    "Book a Panchakarma consultation at Shreeji Panchkarma, Sonipat. Call +91 98765 43210 or visit our clinic in Model Town, Sonipat, Haryana. Free first consultation.",
  keywords: [
    "book panchkarma sonipat",
    "ayurvedic consultation sonipat",
    "shreeji panchkarma contact",
    "panchkarma appointment haryana",
  ],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />

      {/* Hero */}
      <section className="min-h-[40vh] bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-end pt-24 relative">
        <div className="container-custom pb-14 relative z-10">
          <AnimatedSection>
            <p className="text-accent font-raleway text-xs tracking-widest uppercase mb-4">Get in Touch</p>
            <h1 className="font-cormorant font-700 text-white mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Begin Your Healing Journey
            </h1>
            <p className="font-raleway text-white/70 max-w-xl leading-relaxed">
              Your first consultation is completely free. Dr. Sharma will assess your Prakriti and design the precise treatment your body needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-cream-section p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Call or WhatsApp</p>
                      <a href="tel:+919876543210" className="font-cormorant font-700 text-forest text-2xl block hover:text-primary transition-colors">
                        +91 98765 43210
                      </a>
                      <a href="tel:+919876543211" className="font-cormorant font-600 text-forest-muted text-lg block hover:text-primary transition-colors">
                        +91 98765 43211
                      </a>
                      <a
                        href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20book%20a%20Panchakarma%20consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-500 font-raleway hover:bg-green-500/20 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={14} /> Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-cream-section p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Visit Us</p>
                      <p className="font-cormorant font-600 text-forest text-xl mb-1">Shreeji Panchkarma</p>
                      <p className="font-raleway text-forest-muted text-sm leading-relaxed">
                        Near Railway Station, Model Town,<br />
                        Sonipat, Haryana – 131001
                      </p>
                      <a
                        href="https://maps.google.com/?q=Sonipat+Haryana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-primary text-sm font-500 font-raleway hover:underline"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-cream-section p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-xs text-forest-muted uppercase tracking-wider mb-3">Clinic Hours</p>
                      <table className="text-sm font-raleway w-full">
                        <tbody className="space-y-1">
                          {[
                            { day: "Monday – Saturday", hours: "9:00 AM – 7:00 PM" },
                            { day: "Sunday", hours: "10:00 AM – 2:00 PM" },
                          ].map((row) => (
                            <tr key={row.day}>
                              <td className="text-forest-muted pr-4 py-1">{row.day}</td>
                              <td className="text-forest font-500">{row.hours}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-xs text-accent font-500 font-raleway mt-3">
                        * Appointments recommended — walk-ins welcome
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-cream-section p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Email</p>
                      <a href="mailto:info@shreejipanchkarma.com" className="font-cormorant font-600 text-forest text-lg hover:text-primary transition-colors">
                        info@shreejipanchkarma.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-cream-section shadow-card p-8">
                <h2 className="font-cormorant font-600 text-forest text-3xl mb-2">
                  Request a Free Consultation
                </h2>
                <p className="font-raleway text-forest-muted text-sm mb-7">
                  Tell us about your health concern and Dr. Sharma will contact you within 24 hours to schedule your consultation.
                </p>
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { label: "Full Name *", type: "text", placeholder: "e.g. Rajesh Kumar", name: "name" },
                      { label: "Phone / WhatsApp *", type: "tel", placeholder: "+91 98765 43210", name: "phone" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">{f.label}</label>
                        <input
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest placeholder-forest-muted/40 focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest placeholder-forest-muted/40 focus:outline-none focus:border-primary/50 transition-colors bg-cream"
                    />
                  </div>
                  <div>
                    <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Treatment of Interest *</label>
                    <select className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest focus:outline-none focus:border-primary/50 transition-colors bg-cream cursor-pointer appearance-none">
                      <option value="">Select a treatment...</option>
                      <option>Panchakarma</option>
                      <option>Ayurvedic Weight Management</option>
                      <option>Shirodhara — Stress Relief</option>
                      <option>Ayurvedic Skin Therapy</option>
                      <option>Janu Basti — Knee Pain</option>
                      <option>Kati Basti — Back Pain</option>
                      <option>General Health Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-raleway text-xs text-forest-muted uppercase tracking-wider mb-2">Your Health Concern</label>
                    <textarea
                      rows={4}
                      placeholder="Please describe your main health concern, duration of symptoms, and any previous treatments you have tried..."
                      className="w-full border border-cream-section rounded-xl px-4 py-3 font-raleway text-sm text-forest placeholder-forest-muted/40 focus:outline-none focus:border-primary/50 transition-colors bg-cream resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-xl font-raleway font-600 text-sm hover:bg-primary-dark transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    Request Free Consultation
                    <span>→</span>
                  </button>
                  <p className="text-xs font-raleway text-forest-muted/60 text-center">
                    Your information is 100% confidential. We will never share your details.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Map placeholder */}
          <AnimatedSection className="mt-12">
            <div className="w-full h-64 rounded-2xl bg-cream-section border border-cream-section flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-primary/30 mx-auto mb-3" />
                <p className="font-cormorant font-600 text-forest/50 text-xl">
                  Near Railway Station, Model Town, Sonipat — 131001
                </p>
                <a
                  href="https://maps.google.com/?q=Sonipat+Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-primary text-sm font-500 font-raleway hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
