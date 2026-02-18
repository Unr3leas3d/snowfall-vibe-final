-- Add monthly_price to contracts table
ALTER TABLE public.contracts 
ADD COLUMN IF NOT EXISTS monthly_price NUMERIC(10, 2) DEFAULT 0.00;
