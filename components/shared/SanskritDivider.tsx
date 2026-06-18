import { cn } from "@/lib/utils";

interface SanskritDividerProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export default function SanskritDivider({
  className,
  color = "currentColor",
  size = "md",
}: SanskritDividerProps) {
  const widths = { sm: 200, md: 320, lg: 480 };
  const w = widths[size];

  return (
    <div className={cn("flex items-center justify-center my-6", className)}>
      <svg
        width={w}
        height="32"
        viewBox={`0 0 ${w} 32`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left extending line */}
        <line
          x1="0"
          y1="16"
          x2={w / 2 - 52}
          y2="16"
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
        {/* Left leaf */}
        <ellipse
          cx={w / 2 - 40}
          cy="16"
          rx="8"
          ry="4"
          fill={color}
          fillOpacity="0.2"
          transform={`rotate(-30 ${w / 2 - 40} 16)`}
        />
        <ellipse
          cx={w / 2 - 40}
          cy="16"
          rx="8"
          ry="4"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.5"
          transform={`rotate(-30 ${w / 2 - 40} 16)`}
        />
        {/* Left small dot */}
        <circle cx={w / 2 - 24} cy="16" r="2" fill={color} fillOpacity="0.4" />
        {/* Center lotus mandala */}
        <g transform={`translate(${w / 2}, 16)`}>
          {/* Outer petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-8"
              rx="3"
              ry="6"
              fill={color}
              fillOpacity="0.15"
              stroke={color}
              strokeWidth="0.5"
              strokeOpacity="0.5"
              transform={`rotate(${angle})`}
            />
          ))}
          {/* Inner circle */}
          <circle cx="0" cy="0" r="5" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="0.75" strokeOpacity="0.6" />
          {/* Center dot */}
          <circle cx="0" cy="0" r="2" fill={color} fillOpacity="0.7" />
        </g>
        {/* Right small dot */}
        <circle cx={w / 2 + 24} cy="16" r="2" fill={color} fillOpacity="0.4" />
        {/* Right leaf */}
        <ellipse
          cx={w / 2 + 40}
          cy="16"
          rx="8"
          ry="4"
          fill={color}
          fillOpacity="0.2"
          transform={`rotate(30 ${w / 2 + 40} 16)`}
        />
        <ellipse
          cx={w / 2 + 40}
          cy="16"
          rx="8"
          ry="4"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.5"
          transform={`rotate(30 ${w / 2 + 40} 16)`}
        />
        {/* Right extending line */}
        <line
          x1={w / 2 + 52}
          y1="16"
          x2={w}
          y2="16"
          stroke={color}
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
