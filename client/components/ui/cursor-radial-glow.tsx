import { cn } from "@/lib/utils";
import {
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  useEffect,
  useRef,
} from "react";

type CursorRadialGlowProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section";
};

type GlowStyle = CSSProperties & {
  "--cursor-glow-x": string;
  "--cursor-glow-y": string;
};

export function CursorRadialGlow({
  as: Component = "div",
  children,
  className,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  style,
  ...props
}: CursorRadialGlowProps) {
  const surfaceRef = useRef<HTMLElement>(null);
  const lastPointerRef = useRef({ x: 0, y: 0, isInside: false });
  const frameRef = useRef<number>();

  const updateGlowPosition = (clientX: number, clientY: number) => {
    const surface = surfaceRef.current;
    if (!surface) {
      return;
    }

    const bounds = surface.getBoundingClientRect();
    surface.style.setProperty(
      "--cursor-glow-x",
      `${clientX - bounds.left}px`,
    );
    surface.style.setProperty(
      "--cursor-glow-y",
      `${clientY - bounds.top}px`,
    );
  };

  useEffect(() => {
    const handleViewportChange = () => {
      const pointer = lastPointerRef.current;
      if (!pointer.isInside || frameRef.current !== undefined) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        updateGlowPosition(pointer.x, pointer.y);
        frameRef.current = undefined;
      });
    };

    window.addEventListener("scroll", handleViewportChange, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleViewportChange, true);
      window.removeEventListener("resize", handleViewportChange);

      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    onPointerEnter?.(event);

    if (event.pointerType !== "mouse") {
      return;
    }

    lastPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      isInside: true,
    };
    updateGlowPosition(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    onPointerMove?.(event);

    if (event.pointerType !== "mouse") {
      return;
    }

    lastPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      isInside: true,
    };
    updateGlowPosition(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    onPointerLeave?.(event);
    lastPointerRef.current.isInside = false;
  };

  return (
    <Component
      ref={surfaceRef as never}
      className={cn("cursor-radial-glow-surface", className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={
        {
          "--cursor-glow-x": "50%",
          "--cursor-glow-y": "35%",
          ...style,
        } as GlowStyle
      }
      {...props}
    >
      <div aria-hidden="true" className="cursor-radial-glow" />
      {children}
    </Component>
  );
}
