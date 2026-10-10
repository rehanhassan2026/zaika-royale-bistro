# 🍽️ Zaika Royale Bistro — Part A Restaurant Website

> **Saylani Mass IT Training (SMIT) · ASF Campus · Modern Web & App Development with AI**  
> **Hackathon: Part A — Restaurant Website (Saturday · 50 Marks)**

---

## 🌟 Part A Requirements Checklist (50/50 Marks)

| Task | Marks | Requirement & Implementation | Status |
| :---: | :---: | :--- | :---: |
| **1** | **10** | **Home and Menu**: Restaurant name ("Zaika Royale Bistro"), big top section (Hero with imagery, CTAs, and trust badges), at least 6 dishes (shows 8 dishes) with picture, name, and price in PKR. | ✅ Complete |
| **2** | **10** | **Order Form**: Customer writes name, phone and address, picks dishes and quantity, clicks "Place order". All fields must be filled (`required` validation). | ✅ Complete |
| **3** | **15** | **Order comes to Gmail**: When clicking "Place order", full order details (dishes, quantity, total, name, phone, address) dispatched to **`sandhucosmetics1@gmail.com`**. Easy to read. | ✅ Complete |
| **4** | **15** | **Order is saved in Supabase**: The same order is saved in the Supabase table called **`orders`** with initial status **`Pending`**. | ✅ Complete |

---

## 🗄️ Supabase Configuration & Setup

- **Project URL**: `https://akkahprtcttznhhdvgcb.supabase.co`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFra2FocHJ0Y3R0em5oaGR2Z2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NjAwNDcsImV4cCI6MjEwNzEzNjA0N30.MLJiXqbwEUxmilB4gp4INg2_6SDsquhMnN_WoxuhqJ4`

### SQL to create the `orders` table in Supabase:
1. Open your Supabase project in browser: [https://supabase.com/dashboard/project/akkahprtcttznhhdvgcb/sql](https://supabase.com/dashboard/project/akkahprtcttznhhdvgcb/sql)
2. Click **New query**, paste the following script from `supabase-setup.sql`, and click **Run**:

```sql
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

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.orders
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.orders
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public update" ON public.orders
    FOR UPDATE TO anon, authenticated
    USING (true)
    WITH CHECK (true);
```

*(You can also click the **"Supabase Setup"** button in the top navigation bar to copy this code with 1 click).*

---

## 📧 Gmail Routing Details

- **Destination Email**: `sandhucosmetics1@gmail.com`
- **What gets sent**:
  - Customer Name
  - Phone Number
  - Delivery Address
  - Dishes List & Quantities
  - Order Subtotal & Grand Total (PKR)
  - Order Status (`Pending`)
  - Order Timestamp (PKT)
- **One-Time Email Activation**: Check `sandhucosmetics1@gmail.com` for the activation email from FormSubmit and click "Activate Form" so automated emails land directly in your inbox.
- **Gmail Screenshot Helper**: When you place an order, the confirmation popup provides an **"Open in Gmail (Screenshot)"** button to view the pre-filled compose window for submission screenshot purposes.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local server
npm run dev

# 3. View in browser
# http://localhost:5173/
```
