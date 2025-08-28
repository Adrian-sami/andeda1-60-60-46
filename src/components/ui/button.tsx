import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover:shadow-glow md:transform md:hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-glow",
        outline:
          "border border-andeda-green/30 bg-transparent text-foreground hover:bg-andeda-green hover:text-white hover:shadow-glow md:transform md:hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-elegant hover:shadow-glow md:transform md:hover:scale-105",
        ghost: "hover:bg-andeda-gradient/20 hover:text-foreground md:transform md:hover:scale-105",
        link: "text-andeda-green underline-offset-4 hover:underline hover:text-andeda-blue",
        gradient: "bg-andeda-gradient text-white hover:opacity-90 md:transform md:hover:scale-105 transition-all duration-300",
        "gradient-minimal": "bg-andeda-gradient text-white hover:opacity-95 md:transform md:hover:scale-101 transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] border border-transparent",
        "gradient-intense": "bg-andeda-gradient-intense text-white hover:shadow-neon-intense md:transform md:hover:scale-105 md:hover:rotate-1 transition-all duration-300 shadow-glow border border-transparent",
        "gradient-outline": "border-2 gradient-border bg-transparent text-andeda-green hover:bg-andeda-gradient hover:text-white md:transform md:hover:scale-105 transition-all duration-300",
        "neon": "bg-card border border-andeda-green/50 text-andeda-green hover:bg-andeda-green hover:text-background neon-glow hover:shadow-neon md:transform md:hover:scale-110",
        "glass": "glass-effect text-foreground hover:bg-andeda-gradient/20 border border-andeda-blue/30 md:transform md:hover:scale-105",
      },
      size: {
        default: "h-9 sm:h-10 px-3 sm:px-4 py-2 text-sm",
        sm: "h-8 sm:h-9 rounded-md px-2 sm:px-3 text-xs sm:text-sm",
        lg: "h-10 sm:h-11 rounded-md px-6 sm:px-8 text-sm sm:text-base",
        icon: "h-9 w-9 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
