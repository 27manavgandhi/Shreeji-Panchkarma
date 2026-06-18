import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  light?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ light = false, className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { svg: 28, text: "text-base", sub: "text-[9px]" },
    md: { svg: 36, text: "text-xl", sub: "text-[10px]" },
    lg: { svg: 48, text: "text-2xl", sub: "text-xs" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* SVG Logo Mark */}
      <div className="relative flex-shrink-0" style={{ width: s.svg, height: s.svg }}>
        <svg
          width={s.svg}
          height={s.svg}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer circle */}
          <circle
            cx="24" cy="24" r="22"
            stroke={light ? "rgba(255,255,255,0.3)" : "rgba(45,106,79,0.3)"}
            strokeWidth="1"
          />
          {/* Lotus petals — 8 petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 24 + 10 * Math.sin(rad);
            const cy = 24 - 10 * Math.cos(rad);
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="4"
                ry="7"
                fill={light ? "rgba(201,168,76,0.25)" : "rgba(45,106,79,0.2)"}
                stroke={light ? "rgba(201,168,76,0.6)" : "#2D6A4F"}
                strokeWidth="0.75"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
          {/* Inner lotus */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 24 + 5 * Math.sin(rad);
            const cy = 24 - 5 * Math.cos(rad);
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx="2.5"
                ry="4.5"
                fill={light ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.4)"}
                stroke={light ? "#C9A84C" : "#C9A84C"}
                strokeWidth="0.5"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
          {/* Center dot */}
          <circle cx="24" cy="24" r="4"
            fill={light ? "#C9A84C" : "#C9A84C"}
            opacity="0.9"
          />
          <circle cx="24" cy="24" r="2"
            fill={light ? "#ffffff" : "#1B4332"}
          />
          {/* Top leaf stem */}
          <path
            d="M24 2 Q26 8 24 12 Q22 8 24 2Z"
            fill={light ? "rgba(201,168,76,0.7)" : "#2D6A4F"}
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-cormorant font-700 leading-tight transition-colors duration-300",
            s.text,
            light ? "text-white" : "text-forest"
          )}
        >
          Shreeji
        </span>
        <span
          className={cn(
            "font-raleway font-500 tracking-[0.18em] uppercase transition-colors duration-300",
            s.sub,
            light ? "text-white/60" : "text-forest-muted"
          )}
        >
          Panchkarma
        </span>
      </div>
    </Link>
  );
}
