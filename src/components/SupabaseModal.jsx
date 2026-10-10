import React, { useState } from 'react'
import { Database, Copy, Check, ExternalLink, X, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import { SUPABASE_URL, checkSupabaseConnection } from '../config/supabase'

export function SupabaseModal({ isOpen, onClose, onRefreshStatus }) {
  const [copied, setCopied] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  if (!isOpen) return null

  const sqlCode = `-- 1. Create orders table in public schema
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

-- 6. Insert sample order to verify
INSERT INTO public.orders (customer_name, customer_phone, customer_address, items_summary, total_amount, status, notes)
VALUES (
    'Ali Khan',
    '+92 300 1234567',
    'House 14-B, Block 4, Gulshan-e-Iqbal, Karachi',
    '1x Royal Dum Mutton Biryani (Rs. 1,350), 1x Seekh Kabab (Rs. 780)',
    2130.00,
    'Pending',
    'Extra raita and green chilies'
);`

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleTestNow = async () => {
    setIsTesting(true)
    const result = await checkSupabaseConnection()
    setTestResult(result)
    setIsTesting(false)
    if (onRefreshStatus) {
      onRefreshStatus(result.tableReady)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-neutral-950/70 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Supabase Orders Table Setup</h3>
              <p className="text-xs text-neutral-400">Project URL: {SUPABASE_URL}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Instructions */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
            <p className="font-bold text-amber-400 uppercase tracking-wider">How to enable Supabase table in 30 seconds:</p>
            <ol className="list-decimal list-inside space-y-1 text-neutral-300">
              <li>Open your Supabase project in browser: <a href="https://supabase.com/dashboard/project/akkahprtcttznhhdvgcb/sql" target="_blank" rel="noreferrer" className="text-amber-400 underline font-semibold">Supabase SQL Editor <ExternalLink className="w-3 h-3 inline" /></a></li>
              <li>Click <strong>New query</strong></li>
              <li>Paste the SQL script below and click <strong>Run</strong></li>
              <li>Click <strong>Test Connection Now</strong> below to verify!</li>
            </ol>
          </div>

          {/* Test connection result */}
          {testResult && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between border ${
              testResult.tableReady
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {testResult.tableReady ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                <span>
                  {testResult.tableReady
                    ? 'Success! Table "public.orders" is ready and accepting orders!'
                    : `Notice: Table "orders" not found yet (${testResult.error}). Run SQL script in Supabase.`}
                </span>
              </div>
            </div>
          )}

          {/* Code snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                SQL Setup Script (with RLS Policies)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px] overflow-x-auto max-h-56">
              {sqlCode}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleTestNow}
            disabled={isTesting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-neutral-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isTesting ? 'Testing Table...' : 'Test Connection Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  )
}

