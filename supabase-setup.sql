-- ====================================================================
-- SUPABASE SQL SETUP SCRIPT FOR RESTAURANT ORDERS TABLE
-- Project URL: https://akkahprtcttznhhdvgcb.supabase.co
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    items_summary TEXT,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'Pending',
    notes TEXT,
    payment_method TEXT DEFAULT 'Cash on Delivery'
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public anonymous insertion (Customers placing orders)
DROP POLICY IF EXISTS "Allow public insert" ON public.orders;
CREATE POLICY "Allow public insert" ON public.orders
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- 4. Policy: Allow public anonymous select (Admin dashboard viewing orders)
DROP POLICY IF EXISTS "Allow public select" ON public.orders;
CREATE POLICY "Allow public select" ON public.orders
    FOR SELECT TO anon, authenticated
    USING (true);

-- 5. Policy: Allow public anonymous update (Admin dashboard updating status Pending -> Preparing -> Delivered)
DROP POLICY IF EXISTS "Allow public update" ON public.orders;
CREATE POLICY "Allow public update" ON public.orders
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Insert sample order to verify setup immediately
INSERT INTO public.orders (customer_name, customer_phone, customer_address, items_summary, total_amount, status, notes)
VALUES (
    'Ali Khan',
    '+92 300 1234567',
    'House 14-B, Block 4, Gulshan-e-Iqbal, Karachi',
    '1x Royal Mutton Biryani (Rs. 1,250), 2x Chicken Seekh Kabab (Rs. 900)',
    2150.00,
    'Pending',
    'Please send extra raita and spoons'
);

-- Check created orders
SELECT * FROM public.orders ORDER BY created_at DESC;

