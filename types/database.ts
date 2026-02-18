// Database type definitions
// These will be replaced by auto-generated types from Supabase CLI

export interface Database {
    public: {
        Tables: {
            email_signups: {
                Row: {
                    id: string;
                    email: string;
                    signed_up_at: string;
                };
                Insert: {
                    id?: string;
                    email: string;
                    signed_up_at?: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    signed_up_at?: string;
                };
            };
            subscriptions: {
                Row: {
                    id: string;
                    user_id: string;
                    plan_type: "free" | "pro" | "enterprise";
                    contract_limit: number;
                    stripe_customer_id: string | null;
                    stripe_subscription_id: string | null;
                    status: "active" | "canceled" | "past_due";
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    plan_type?: "free" | "pro" | "enterprise";
                    contract_limit?: number;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status?: "active" | "canceled" | "past_due";
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    plan_type?: "free" | "pro" | "enterprise";
                    contract_limit?: number;
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                    status?: "active" | "canceled" | "past_due";
                    created_at?: string;
                    updated_at?: string;
                };
            };
            contracts: {
                Row: {
                    id: string;
                    user_id: string;
                    contractor_name: string;
                    contractor_email: string;
                    contractor_phone: string | null;
                    location_postal_code: string;
                    snowfall_threshold_cm: number;
                    notification_window_hours: number;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    contractor_name: string;
                    contractor_email: string;
                    contractor_phone?: string | null;
                    location_postal_code: string;
                    snowfall_threshold_cm: number;
                    notification_window_hours: number;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string;
                    contractor_name?: string;
                    contractor_email?: string;
                    contractor_phone?: string | null;
                    location_postal_code?: string;
                    snowfall_threshold_cm?: number;
                    notification_window_hours?: number;
                    is_active?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            notifications_log: {
                Row: {
                    id: string;
                    contract_id: string;
                    notification_type: "email" | "sms";
                    recipient: string;
                    snowfall_amount_cm: number;
                    sent_at: string;
                    status: "sent" | "failed" | "pending";
                };
                Insert: {
                    id?: string;
                    contract_id: string;
                    notification_type: "email" | "sms";
                    recipient: string;
                    snowfall_amount_cm: number;
                    sent_at?: string;
                    status?: "sent" | "failed" | "pending";
                };
                Update: {
                    id?: string;
                    contract_id?: string;
                    notification_type?: "email" | "sms";
                    recipient?: string;
                    snowfall_amount_cm?: number;
                    sent_at?: string;
                    status?: "sent" | "failed" | "pending";
                };
            };
        };
    };
}
