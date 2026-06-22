import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
