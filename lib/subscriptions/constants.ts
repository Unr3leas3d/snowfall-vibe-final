// Subscription plan type definitions
// These are shared across the entire application for consistency

export type PlanType = "free" | "pro" | "enterprise";

export interface PlanConfig {
    name: string;
    type: PlanType;
    contractLimit: number; // -1 for unlimited
    price: number; // monthly price in CAD
    features: string[];
    highlighted?: boolean; // "Most Popular" badge
}

export const PLANS: Record<PlanType, PlanConfig> = {
    free: {
        name: "Free",
        type: "free",
        contractLimit: 1,
        price: 0,
        features: [
            "1 snow contract",
            "Real-time weather monitoring",
            "Email notifications",
            "Basic dashboard",
        ],
    },
    pro: {
        name: "Pro",
        type: "pro",
        contractLimit: 10,
        price: 29,
        highlighted: true,
        features: [
            "Up to 10 contracts",
            "Real-time weather monitoring",
            "Email & SMS notifications",
            "Advanced dashboard",
            "Notification history",
            "Priority support",
        ],
    },
    enterprise: {
        name: "Enterprise",
        type: "enterprise",
        contractLimit: -1, // unlimited
        price: 79,
        features: [
            "Unlimited contracts",
            "Real-time weather monitoring",
            "Email & SMS notifications",
            "Advanced dashboard",
            "Full notification history",
            "API access",
            "Dedicated support",
            "Custom integrations",
        ],
    },
};

/**
 * Get the display label for a contract limit.
 */
export function getContractLimitLabel(limit: number): string {
    return limit === -1 ? "Unlimited" : `${limit}`;
}
