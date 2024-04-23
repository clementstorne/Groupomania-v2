import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-8 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-orange-9 text-orange-1 shadow hover:bg-orange-11",
        secondary:
          "bg-orange-3 text-gray-12 border border-orange-7 shadow-sm hover:bg-orange-4",
        outline:
          "bg-orange-1 text-gray-12 border border-orange-8 shadow-sm hover:bg-orange-4 hover:text-black",
        destructive: "bg-red-700 text-gray-1 shadow-sm hover:bg-red-800 ",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        admin: "text-gray-11 hover:text-orange-10 hover:bg-gray-4",
        link: "text-orange-9 underline-offset-4 hover:text-orange-11 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-lg font-bold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
