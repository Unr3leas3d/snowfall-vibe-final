import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-brand text-white", className)
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
