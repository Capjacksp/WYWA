import { cva } from "class-variance-authority";

/**
 * WYWA branded button variants.
 * Separated from the component file to support Vite Fast Refresh.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "py-1.5 px-6 text-h3 font-body font-[500] bg-cta leading-snug uppercase tracking-[0.15em] text-bg-dark hover:opacity-85 active:opacity-95"
      }
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
