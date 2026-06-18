import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const DEFAULT_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+-<>";

type ScrambleHoverProps = {
  children: ReactNode;
  symbols?: string;
  duration?: number;
} & HTMLAttributes<HTMLDivElement>;

export function ScrambleHover({
  children,
  symbols = DEFAULT_SYMBOLS,
  duration = 720,
  onPointerEnter,
  ...props
}: ScrambleHoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const activeTextNodesRef = useRef<Array<{ node: Text; text: string }>>([]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      activeTextNodesRef.current.forEach(({ node, text }) => {
        node.textContent = text;
      });
    };
  }, []);

  const scramble = () => {
    const root = rootRef.current;
    if (
      !root ||
      symbols.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    cancelAnimationFrame(animationFrameRef.current);
    activeTextNodesRef.current.forEach(({ node, text }) => {
      node.textContent = text;
    });

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes: Array<{ node: Text; text: string }> = [];
    let currentNode = walker.nextNode();

    while (currentNode) {
      const parentLabel = (currentNode.parentElement?.closest(
        "[aria-label]",
      ) as HTMLElement | null)?.ariaLabel;
      const text = parentLabel || currentNode.textContent || "";
      if (text.trim()) textNodes.push({ node: currentNode as Text, text });
      currentNode = walker.nextNode();
    }
    activeTextNodesRef.current = textNodes;

    const characterCount = textNodes.reduce(
      (total, item) => total + Array.from(item.text).length,
      0,
    );
    if (characterCount === 0) return;

    const startedAt = performance.now();

    const update = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const resolvedCount = Math.floor(progress * characterCount);
      let characterOffset = 0;

      textNodes.forEach(({ node, text }) => {
        const characters = Array.from(text);
        node.textContent = characters
          .map((character, index) => {
            const characterIndex = characterOffset + index;
            if (
              character.trim() === "" ||
              characterIndex < resolvedCount ||
              progress === 1
            ) {
              return character;
            }

            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join("");
        characterOffset += characters.length;
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(update);
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        scramble();
      }}
      {...props}
    >
      {children}
    </div>
  );
}
