import { cva } from "class-variance-authority";

/**
 * WYWA branded button variants.
 * Separated from the component file to support Vite Fast Refresh.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-cta text-bg-dark hover:opacity-85 active:opacity-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5",
        ghost:
          "text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "py-[6px] px-[14px] text-sm",
        default: "py-[6px] px-[14px] text-sm",
        lg: "py-4 px-8 text-body-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
