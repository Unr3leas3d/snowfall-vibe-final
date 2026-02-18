import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, description, error, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-body-sm font-medium text-neutral"
                    >
                        {label}
                    </label>
                )}
                {description && (
                    <p className="text-caption text-neutral-muted">
                        {description}
                    </p>
                )}
                <input
                    type={type}
                    id={inputId}
                    className={cn(
                        "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-body text-neutral transition-colors",
                        "placeholder:text-neutral-muted/60",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-bg",
                        error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-neutral-border hover:border-neutral-muted/40",
                        className
                    )}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                />
                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="text-caption text-red-600 flex items-center gap-1"
                    >
                        <svg
                            className="h-3.5 w-3.5 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
