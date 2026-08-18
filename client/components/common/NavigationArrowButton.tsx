import type { ButtonHTMLAttributes } from "react";
import { ArrowHead, type ArrowHeadProps } from "./ArrowHead";
import { cn } from "@/lib/utils";

interface NavigationArrowButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  direction: NonNullable<ArrowHeadProps["direction"]>;
  size?: ArrowHeadProps["size"];
  color?: string;
}

export function NavigationArrowButton({
  className,
  color,
  direction,
  size,
  ...props
}: NavigationArrowButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242425] disabled:cursor-default",
        className,
      )}
      {...props}
    >
      <ArrowHead direction={direction} size={size} color={color} />
    </button>
  );
}
