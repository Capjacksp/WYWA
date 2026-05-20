import {
  motion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

const motionComponents = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

function getMotionComponent(as?: ElementType) {
  if (typeof as === "string" && as in motionComponents) {
    return motionComponents[as as keyof typeof motionComponents];
  }

  return motion.div;
}

type ScrollTextLinesProps<T extends ElementType> = {
  as?: T;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function ScrollTextLines<T extends ElementType = "div">({
  as,
  lines,
  className,
  lineClassName,
  delay = 0,
  ...props
}: ScrollTextLinesProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Component = getMotionComponent(as);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  return (
    <Component
      ref={containerRef}
      className={className}
      {...props}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <ScrollTextLine
            className={lineClassName ?? "block"}
            index={index}
            lineCount={lines.length}
            progress={scrollYProgress}
            delay={delay}
          >
            {line}
          </ScrollTextLine>
        </span>
      ))}
    </Component>
  );
}

export function LoadTextLines<T extends ElementType = "div">({
  as,
  lines,
  className,
  lineClassName,
  delay = 0,
  ...props
}: ScrollTextLinesProps<T>) {
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.09,
          },
        },
      }}
      {...props}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            className={lineClassName ?? "block"}
            variants={{
              hidden: { opacity: 0, x: 160 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

type ScrollTextLineProps = {
  children: ReactNode;
  className: string;
  index: number;
  lineCount: number;
  progress: MotionValue<number>;
  delay: number;
};

function ScrollTextLine({
  children,
  className,
  index,
  lineCount,
  progress,
  delay,
}: ScrollTextLineProps) {
  const safeCount = Math.max(lineCount, 1);
  const stagger = Math.min(0.16, 0.44 / safeCount);
  const start = Math.min(0.7, delay + index * stagger);
  const end = Math.min(1, start + 0.62);
  const x = useTransform(progress, [start, end], [160, 0]);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span className={className} style={{ x, opacity }}>
      {children}
    </motion.span>
  );
}
