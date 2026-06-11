import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface LogoProps {
  width?: number;
  color?: string;
  className?: string;
  gap?: number;
  strokWidth?: number;
  loops?: number;
  height?: number;
}

export default function Logo({
  width = 138,
  color = "#ffffff",
  className,
}: LogoProps) {
  const height = (width / 138) * 37;

  return (
    <LogoVideo
      width={width}
      height={height}
      color={color}
      className={className}
    />
  );
}

function LogoVideo({
  width,
  height,
  color,
  className,
}: {
  width: number;
  height: number;
  color: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = document.createElement("video");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const pixelRatio = window.devicePixelRatio || 1;
    const targetWidth = Math.round(width * pixelRatio);
    const targetHeight = Math.round(height * pixelRatio);
    const logoColor = parseColor(color);
    let timeoutId = 0;
    let isDisposed = false;

    if (!ctx) return;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    video.src = "/videos/WYWA-logo-anim-cropped.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";

    const drawFrame = () => {
      if (isDisposed) return;

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        ctx.clearRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

        const frame = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const { data } = frame;

        for (let index = 0; index < data.length; index += 4) {
          const luminance = data[index] * 0.2126 + data[index + 1] * 0.7152 + data[index + 2] * 0.0722;
          const alpha = Math.max(0, Math.min(255, (luminance - 54) * 2.1));

          data[index] = logoColor.r;
          data[index + 1] = logoColor.g;
          data[index + 2] = logoColor.b;
          data[index + 3] = alpha;
        }

        ctx.putImageData(frame, 0, 0);
      }

      timeoutId = window.setTimeout(drawFrame, 66);
    };

    video.play().catch(() => {
      drawFrame();
    });
    drawFrame();

    return () => {
      isDisposed = true;
      window.clearTimeout(timeoutId);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [color, height, width]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block transition-opacity duration-300", className)}
      style={{ width, height }}
      role="img"
      aria-label="WYWA logo"
    />
  );
}

function parseColor(color: string) {
  if (color.toLowerCase() === "white") {
    return { r: 255, g: 255, b: 255 };
  }

  const normalized = color.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;

  const parsed = Number.parseInt(value, 16);

  if (Number.isNaN(parsed)) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: (parsed >> 16) & 255,
    g: (parsed >> 8) & 255,
    b: parsed & 255,
  };
}


export function WavyLogo({
  width = 138,
  height,
  color = "#ffffff",
  className,
  loops = 3,
  strokWidth = 34,
  gap = 133,
}: LogoProps) {
  const strokeWidth = strokWidth;
  const halfStroke = strokeWidth / 2;
  const segment = gap;
  const radius = segment / 2;
  const topY = halfStroke;
  const bottomY = topY + segment + strokeWidth * 0.8;

  let x = halfStroke;
  let d = `M ${x} ${bottomY} V ${topY + radius}`;

  for (let i = 0; i < loops; i++) {
    d += ` A ${radius} ${radius} 0 0 1 ${x + segment} ${topY + radius}`;
    x += segment;

    if (i < loops - 1) {
      d += ` V ${bottomY - radius}`;
      d += ` A ${radius} ${radius} 0 0 0 ${x + segment} ${bottomY - radius}`;
      d += ` V ${topY + radius}`;
      x += segment;
    }
  }

  d += ` V ${bottomY}`;

  const viewWidth = x + halfStroke;
  const viewHeight = bottomY + halfStroke;
  const computedHeight = height ?? (width / viewWidth) * viewHeight;

  return (
    <svg
      className={cn(className)}
      width={width}
      height={computedHeight}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Wave WAYA logo"
      preserveAspectRatio="xMidYMid meet"
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
