import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-chapter-1 via-chapter-2 to-primary flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8">
          <Leaf size={36} className="text-accent" />
        </div>
        <p className="font-raleway text-accent text-xs tracking-widest uppercase mb-3">
          Page Not Found
        </p>
        <h1 className="font-cormorant font-700 text-white text-5xl mb-4">
          404
        </h1>
        <p className="font-cormorant font-400 italic text-white/70 text-2xl mb-3">
          "Even in nature, not all paths lead where we expect."
        </p>
        <p className="font-raleway text-white/50 text-sm mb-8 leading-relaxed">
          The page you are looking for may have moved or doesn't exist. Let us guide you back to healing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-accent text-forest px-7 py-3.5 rounded-full font-raleway font-600 text-sm hover:bg-accent-soft transition-colors cursor-pointer"
          >
            Return Home <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full font-raleway font-500 text-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
