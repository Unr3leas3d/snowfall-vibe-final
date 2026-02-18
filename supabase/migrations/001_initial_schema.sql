-- ─── Initial Schema for Snowfall ──────────────────────────────────

-- 1. Email Signups (Marketing/Waitlist)
CREATE TABLE IF NOT EXISTS public.email_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    signed_up_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'pro', 'enterprise')) DEFAULT 'free',
    contract_limit INTEGER NOT NULL DEFAULT 1, -- -1 for unlimited
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- 3. Contracts
CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    contractor_name TEXT NOT NULL,
    contractor_email TEXT NOT NULL,
    contractor_phone TEXT,
    location_postal_code TEXT NOT NULL,
    snowfall_threshold_cm NUMERIC NOT NULL DEFAULT 5,
    notification_window_hours INTEGER NOT NULL DEFAULT 24,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Notifications Log
CREATE TABLE IF NOT EXISTS public.notifications_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('email', 'sms')),
    recipient TEXT NOT NULL,
    snowfall_amount_cm NUMERIC NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT now(),
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'pending')) DEFAULT 'sent'
);

-- ─── Row Level Security (RLS) ───────────────────────────────────

-- Enable RLS
ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

-- email_signups: Public can insert, only service_role can read
CREATE POLICY "Public can insert emails" ON public.email_signups
    FOR INSERT WITH CHECK (true);

-- subscriptions: Users can only see their own subscription
CREATE POLICY "Users can view own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- contracts: Users can manage their own contracts
CREATE POLICY "Users can view own contracts" ON public.contracts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contracts" ON public.contracts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contracts" ON public.contracts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own contracts" ON public.contracts
    FOR DELETE USING (auth.uid() = user_id);

-- notifications_log: Users can view logs for their own contracts
CREATE POLICY "Users can view own notification logs" ON public.notifications_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.contracts
            WHERE public.contracts.id = public.notifications_log.contract_id
            AND public.contracts.user_id = auth.uid()
        )
    );

-- ─── Triggers for updated_at ────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_subscriptions_updated
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_contracts_updated
    BEFORE UPDATE ON public.contracts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
