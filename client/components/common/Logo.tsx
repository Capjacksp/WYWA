import { cn } from "@/lib/utils";

interface LogoProps {
  /** Width in px (height auto-scales from the 138×37 viewBox) */
  width?: number;
  /** Override the fill color (defaults to white) */
  color?: string;
  className?: string;
  gap?: number;
  strokWidth?: number;
  loops?: number;
  height?: number;
}

/**
 * WYWA SVG logo.
 *
 * Accepts `width` to resize and `color` to change the fill.
 * The viewBox is 138×37 so aspect ratio is always preserved.
 */
export default function Logo({
  width = 138,
  color = "#ffffff",
  className,
}: LogoProps) {
  const height = (width / 138) * 37
  return (
    <svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 138 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="WYWA logo"
    >
      {/* Y */}
      <path
        d="M48.17 36.58L51.92 26.23L42.46 0.43H46.45L53.82 21.41L61.15 0.43H65.04L51.97 36.58H48.17Z"
        fill={color}
      />

      {/* A */}
      <path
        d="M123.37 26.54C115.95 26.54 110.36 20.85 110.36 13.29C110.36 5.73 115.95 0 123.37 0C127.82 0 131.69 2.07 133.48 5.4L133.59 5.61H134.37L134.47 0.43H137.67V26.11H134.47L134.37 20.93H133.59L133.48 21.14C131.7 24.52 127.92 26.54 123.37 26.54ZM123.94 3.29C118.5 3.29 114.07 7.78 114.07 13.3C114.07 18.82 118.4 23.26 123.94 23.26C129.48 23.26 133.9 18.98 133.9 13.3C133.9 7.62 129.62 3.29 123.94 3.29Z"
        fill={color}
      />

      {/* W (first) */}
      <path
        d="M31.43 26.12C27.17 26.12 23.7 22.65 23.7 18.39V8.23C23.7 5.96 21.85 4.11 19.58 4.11C17.31 4.11 15.46 5.96 15.46 8.23V18.39C15.46 22.65 11.99 26.12 7.73004 26.12C3.47004 26.12 0 22.65 0 18.39V0.5H3.61005V18.39C3.61005 20.66 5.46004 22.51 7.73004 22.51C10 22.51 11.85 20.66 11.85 18.39V8.23C11.85 3.97 15.32 0.5 19.58 0.5C23.84 0.5 27.31 3.97 27.31 8.23V18.39C27.31 20.66 29.16 22.51 31.43 22.51C33.7 22.51 35.55 20.66 35.55 18.39V0.5H39.16V18.39C39.16 22.65 35.69 26.12 31.43 26.12Z"
        fill={color}
      />

      {/* W (second) */}
      <path
        d="M99.63 26.12C95.37 26.12 91.9 22.65 91.9 18.39V8.23C91.9 5.96 90.05 4.11 87.78 4.11C85.51 4.11 83.66 5.96 83.66 8.23V18.39C83.66 22.65 80.19 26.12 75.93 26.12C71.67 26.12 68.2 22.65 68.2 18.39V0.5H71.81V18.39C71.81 20.66 73.66 22.51 75.93 22.51C78.2 22.51 80.05 20.66 80.05 18.39V8.23C80.05 3.97 83.52 0.5 87.78 0.5C92.04 0.5 95.51 3.97 95.51 8.23V18.39C95.51 20.66 97.36 22.51 99.63 22.51C101.9 22.51 103.75 20.66 103.75 18.39V0.5H107.36V18.39C107.36 22.65 103.89 26.12 99.63 26.12Z"
        fill={color}
      />
    </svg>
  );
}


export function WavyLogo({
  width = 138,
  height,
  color = "#ffffff",
  className,
  loops = 3,
  strokWidth = 12,
  gap = 4
}: LogoProps) {
  const strokeWidth = strokWidth;
  const halfStroke = strokeWidth / 2;
  const startX = 20;
  const topY = 0;
  const bottomY = 80;
  const radius = gap / 2;

  // Build repeating wave path dynamically
  let d = `M ${startX} ${topY + 5} V ${bottomY}`;

  let x = startX;

  for (let i = 0; i < loops; i++) {
    d += `
      C ${x} ${bottomY + 20}
        ${x + radius} ${bottomY + 20}
        ${x + radius} ${bottomY}

      V ${topY + 20}

      C ${x + radius} ${topY - 2}
        ${x + gap} ${topY - 2}
        ${x + gap} ${topY + 18}

      V ${bottomY}
    `;

    x += gap;
  }

  // Final vertical line
  d += ` V ${bottomY + 15}`;

  const widestX = startX + gap * loops;
  const highestY = topY - 2;
  const lowestY = bottomY + 20;
  const viewX = startX - halfStroke;
  const viewY = highestY - halfStroke;
  const viewWidth = widestX - startX + strokeWidth;
  const viewHeight = lowestY - highestY + strokeWidth;
  const computedHeight = height ?? (width / viewWidth) * viewHeight;

  return (
    <svg
      className={cn(className)}
      width={width}
      height={computedHeight}
      viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Wave WAYA logo"
      preserveAspectRatio="none"
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
