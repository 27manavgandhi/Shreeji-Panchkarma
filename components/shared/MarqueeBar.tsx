import { cn } from "@/lib/utils";

const ITEMS = [
  "✦ 10,000+ Happy Patients",
  "✦ AYUSH Ministry Certified",
  "✦ Physician-Led Treatment",
  "✦ Zero Compromise on Authenticity",
  "✦ 15+ Years of Excellence",
  "✦ Fresh In-House Medicines",
  "✦ Sonipat · Delhi NCR · Haryana",
  "✦ Free First Consultation",
];

interface MarqueeBarProps {
  className?: string;
  dark?: boolean;
}

export default function MarqueeBar({ className, dark = true }: MarqueeBarProps) {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className={cn(
        "overflow-hidden py-3",
        dark ? "bg-chapter-1" : "bg-accent/10",
        className
      )}
      aria-label="Trust signals"
    >
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span
              key={i}
              className={cn(
                "inline-flex items-center whitespace-nowrap px-8 font-raleway font-500 text-sm tracking-wide",
                dark ? "text-accent" : "text-forest"
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
