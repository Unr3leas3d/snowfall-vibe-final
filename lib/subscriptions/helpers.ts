import { createClient } from "@/lib/supabase/server";
import { PLANS, PlanType } from "./constants";

/**
 * Fetches the user's current subscription from the database.
 */
export async function getUserSubscription(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error("Error fetching subscription:", error);
        return null;
    }

    return data;
}

/**
 * Checks if a user can create a new contract based on their current plan limits.
 */
export async function canCreateContract(userId: string) {
    const supabase = createClient();

    // Get subscription
    const subscription = await getUserSubscription(userId);
    if (!subscription) return false;

    // Get current contract count
    const { count, error } = await supabase
        .from("contracts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_active", true);

    if (error) {
        console.error("Error counting contracts:", error);
        return false;
    }

    const currentCount = count || 0;
    const limit = subscription.contract_limit;

    // -1 means unlimited
    if (limit === -1) return true;

    return currentCount < limit;
}

/**
 * Returns the contract limit for a given plan type.
 */
export function getContractLimit(planType: PlanType): number {
    return PLANS[planType].contractLimit;
}
