import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-brand text-white shadow-sm shadow-brand/20",
        secondary: "border-transparent bg-neutral-bg text-neutral hover:bg-neutral-border/50",
        destructive: "border-transparent bg-red-500 text-white shadow-sm shadow-red-500/20",
        outline: "text-neutral-body border-neutral-border bg-white/50 backdrop-blur-sm",
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/20 uppercase tracking-wider",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }
