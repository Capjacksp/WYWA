import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

const DEFAULT_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-<>";

export type ScrambleTextLine = {
  text: string;
  className?: string;
};

type ScrambleLoadTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  lines: ScrambleTextLine[];
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  distance?: number;
  resolveInterval?: number;
  symbols?: string;
};

type UseScrambleTextOptions = {
  text: string;
  delay?: number;
  resolveInterval?: number;
  symbols?: string;
};

const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
};

export function ScrambleLoadText({
  as = "div",
  lines,
  className,
  style,
  delay = 0,
  duration = 1.3,
  stagger = 0.16,
  distance = 110,
  resolveInterval = 60,
  symbols = DEFAULT_SYMBOLS,
}: ScrambleLoadTextProps) {
  const Component = motionComponents[as];

  return (
    <Component className={className} style={style}>
      {lines.map((line, index) => (
        <span key={`${line.text}-${index}`} className="block overflow-hidden">
          <ScrambleLine
            {...line}
            delay={delay + index * stagger}
            duration={duration}
            distance={distance}
            resolveInterval={resolveInterval}
            symbols={symbols}
          />
        </span>
      ))}
    </Component>
  );
}

function ScrambleLine({
  text,
  className,
  delay,
  duration,
  distance,
  resolveInterval,
  symbols,
}: ScrambleTextLine & {
  delay: number;
  duration: number;
  distance: number;
  resolveInterval: number;
  symbols: string;
}) {
  const reduceMotion = useReducedMotion();
  const displayText = useScrambleText({ text, delay, resolveInterval, symbols });

  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, x: distance }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}

export function useScrambleText({
  text,
  delay = 0,
  resolveInterval = 60,
  symbols = DEFAULT_SYMBOLS,
}: UseScrambleTextOptions) {
  const reduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (reduceMotion || symbols.length === 0) {
      setDisplayText(text);
      return;
    }

    const characters = Array.from(text);
    const startedAt = performance.now() + delay * 2000;
    let animationFrame = 0;
    let lastUpdate = 0;

    const updateText = (now: number) => {
      if (now < startedAt) {
        animationFrame = requestAnimationFrame(updateText);
        return;
      }

      if (now - lastUpdate >= 42) {
        const resolvedCount = Math.floor((now - startedAt) / resolveInterval);

        if (resolvedCount >= characters.length) {
          setDisplayText(text);
          return;
        }

        setDisplayText(
          characters
            .map((character, index) => {
              if (character === " " || index < resolvedCount) return character;
              return symbols[Math.floor(Math.random() * symbols.length)];
            })
            .join(""),
        );
        lastUpdate = now;
      }

      animationFrame = requestAnimationFrame(updateText);
    };

    animationFrame = requestAnimationFrame(updateText);
    return () => cancelAnimationFrame(animationFrame);
  }, [delay, reduceMotion, resolveInterval, symbols, text]);

  return displayText;
}
