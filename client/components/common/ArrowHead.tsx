export interface ArrowHeadProps {
  direction?: "left" | "right";
  size?: number | { x: number; y: number };
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ArrowHead({
  direction = "right",
  size = 27,
  color = "#F15D59",
  className,
  style: styleProp,
}: ArrowHeadProps) {
  const x = typeof size === "number" ? size : size.x;
  const y = typeof size === "number" ? size : size.y;

  const sideStyle: React.CSSProperties =
    direction === "right"
      ? { borderLeftWidth: x, borderLeftColor: color }
      : { borderRightWidth: x, borderRightColor: color };

  return (
    <span
      aria-hidden="true"
      className={`block h-0 w-0 shrink-0 border-y-transparent${className ? ` ${className}` : ""}`}
      style={{ borderTopWidth: y, borderBottomWidth: y, ...sideStyle, ...styleProp }}
    />
  );
}
