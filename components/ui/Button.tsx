import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-body-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary:
                    "bg-brand text-white hover:bg-brand-hover active:bg-brand-700 shadow-soft hover:shadow-card",
                secondary:
                    "bg-neutral-bg text-neutral border border-neutral-border hover:bg-neutral-border/50 active:bg-neutral-border",
                outline:
                    "border-2 border-brand text-brand bg-transparent hover:bg-brand hover:text-white",
                ghost:
                    "text-neutral-body hover:bg-neutral-bg hover:text-neutral active:bg-neutral-border/50",
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-soft",
                link:
                    "text-brand underline-offset-4 hover:underline p-0 h-auto",
            },
            size: {
                sm: "h-9 px-4 text-caption",
                md: "h-11 px-6",
                lg: "h-12 px-8 text-body",
                xl: "h-14 px-10 text-body-lg rounded-2xl",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        {children}
                    </>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
