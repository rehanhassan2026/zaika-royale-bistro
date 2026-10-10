# 🍽️ Zaika Royale Bistro — Hackathon Restaurant Website + Social Media

> **Saylani Mass IT Training (SMIT) · ASF Campus · Modern Web & App Development with AI**  
> **Hackathon: Restaurant Website + Social Media (Total Marks: 100)**

---

## 🌟 Hackathon Implementation Highlights

| Part | Marks | Feature | Status |
| :--- | :---: | :--- | :---: |
| **Part A - 1** | **10** | **Home & Menu**: Restaurant name, big top section (Hero), 8 handcrafted dishes (min. 6 required) with picture, name, price | ✅ Complete |
| **Part A - 2** | **10** | **Order Form**: Customer writes name, phone & address, picks dishes and quantity, Place order button (all fields `required`) | ✅ Complete |
| **Part A - 3** | **15** | **Order comes to Gmail**: When clicking Place order, full order details (dishes, quantity, total, name, phone, address) dispatched to **`sandhucosmetics1@gmail.com`** | ✅ Complete |
| **Part A - 4** | **15** | **Order is saved in Supabase**: The same order is inserted into the Supabase table **`orders`** with initial status **`Pending`** | ✅ Complete |
| **Part B - 5** | **15** | **Admin Login & Dashboard**: Secure login form (only admin can enter), left sidebar (Orders, Logout), right panel with all orders (customer, dishes, total, time, status) | ✅ Complete |
| **Part B - 6** | **10** | **Change Order Status**: Admin can change status `Pending` → `Preparing` → `Delivered`. Saved in Supabase and persists on refresh | ✅ Complete |
| **Part B - 7** | **20** | **Social Media That Posts by Itself**: 3 posts (pictures) + 1 reel from dishes with exact 4 schedule times (Pakistan time) and auto-scheduler matrix | ✅ Complete |
| **Part B - 8** | **5** | **Mobile Responsive & Live**: 100% responsive on phones, ready for GitHub & Vercel deployment | ✅ Complete |

---

## 🔑 Admin Login Credentials (For Evaluator Submission)

- **Admin Email**: `sandhucosmetics1@gmail.com` *(or `admin@restaurant.com`)*
- **Admin Password**: `admin123`
- **Autofill**: Click the **"1-Click Autofill (Gmail)"** button on the login modal to instantly fill credentials.

---

## 🗄️ Supabase Configuration & SQL Setup

- **Project URL**: `https://akkahprtcttznhhdvgcb.supabase.co`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFra2FocHJ0Y3R0em5oaGR2Z2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1NjAwNDcsImV4cCI6MjEwNzEzNjA0N30.MLJiXqbwEUxmilB4gp4INg2_6SDsquhMnN_WoxuhqJ4`

### SQL to create the `orders` table in Supabase:
1. Go to your Supabase project dashboard: [https://supabase.com/dashboard/project/akkahprtcttznhhdvgcb/sql](https://supabase.com/dashboard/project/akkahprtcttznhhdvgcb/sql)
2. Click **New query**, paste the following script, and click **Run**:

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

*(You can also click the **"Supabase Setup"** button in the website header or admin sidebar to copy this script with 1 click!)*

---

## 📱 Social Media Posting Schedule (Pakistan Time)

As specified in the hackathon sheet, the scheduler automates 3 photo posts and 1 reel:

| Day | What | Time (Pakistan) | Strategic Why | Status |
| :---: | :--- | :---: | :--- | :---: |
| **Day 1** | **Post: menu/ opening** | `12:30 PM PKT` | People look for food before lunch | 🟢 Scheduled |
| **Day 1** | **Reel: a dish being made** | `8:00 PM PKT` | Dinner time, most people are online | 🟢 Scheduled |
| **Day 2** | **Post: today's deal** | `1:00 PM PKT` | Lunch break | 🟢 Scheduled |
| **Day 3** | **Post: customer favourite** | `7:30 PM PKT` | Evening, time to order | 🟢 Scheduled |

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 🌐 Deploy to Vercel in 2 Minutes

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your GitHub repository.
3. Click **Deploy**. Your restaurant website will be live with an HTTPS link!

---

## 📸 Checklist for Sunday 2:00 Submission:

- [x] **GitHub link**: Repository code with clean commits.
- [x] **Live website link**: Deployed on Vercel or GitHub Pages.
- [x] **Admin test email and password**: `sandhucosmetics1@gmail.com` / `admin123`.
- [x] **Screenshot of order in your Gmail**: Orders received at `sandhucosmetics1@gmail.com`.
- [x] **Screenshot of the Supabase `orders` table**: Table with status `Pending` / `Preparing` / `Delivered`.
- [x] **Screenshot of scheduled posts**: Showing the 4 times table in the Admin Social Media tab.
