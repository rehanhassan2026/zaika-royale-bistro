import React from 'react'
import { Sparkles, ArrowRight, Clock, Flame, Star, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react'

export function Hero({ onOpenOrderForm, onScrollToMenu }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Top Section Info */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Ambient luxury badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Karachi's Premier Charcoal Grill &amp; Royal Cuisine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-[1.1]">
              Royal Flavours, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                Charcoal Perfection.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Welcome to <span className="text-white font-bold">Zaika Royale Bistro</span>. Experience Karachi’s finest 
              slow-cooked Dum Mutton Biryani, live charcoal-grilled seekh kababs, and slow-simmered beef nihari. 
              Fresh ingredients, centuries-old recipes, delivered piping hot to your doorstep.
            </p>

            {/* Highlight Cards: Real restaurant value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Express 30-Min Delivery</p>
                  <p className="text-[11px] text-neutral-400">Piping hot food delivered straight from our tandoor to your home</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Halal &amp; Fresh Daily</p>
                  <p className="text-[11px] text-neutral-400">Prime aged meat and handcrafted aromatic spices</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenOrderForm}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/20 flex items-center gap-2.5 transition active:scale-95 cursor-pointer"
              >
                <span>Order Food Online</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onScrollToMenu}
                className="px-6 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/40 text-neutral-200 font-semibold text-base transition cursor-pointer"
              >
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Fast Home Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Live Charcoal Fresh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-3xl opacity-20 blur-lg"></div>

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"
                    alt="Royal Dum Mutton Biryani"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Chef's Signature Dish</span>
                  </div>

                  {/* Rating bubble */}
                  <div className="absolute top-4 right-4 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-2.5 py-1 rounded-full text-xs font-semibold text-neutral-200">
                    4.9 ★ (1,400+ Orders)
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Featured Dish</span>
                    <h3 className="text-xl font-bold text-white font-serif">Royal Dum Mutton Biryani</h3>
                    <p className="text-xs text-neutral-300">Served with seasoned raita, fresh mint salad &amp; roasted potatoes</p>
                  </div>
                </div>

                {/* Card footer details */}
                <div className="p-5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 block">Starting From</span>
                    <span className="text-2xl font-black text-amber-400">Rs. 1,350 <span className="text-xs text-neutral-400 font-normal">PKR</span></span>
                  </div>
                  <button
                    onClick={onOpenOrderForm}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Quick Order
                  </button>
                </div>
              </div>

              {/* Floating micro stats badge */}
              <div className="absolute -bottom-5 -left-5 bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/30">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">4.9 / 5.0 Star Rating</p>
                  <p className="text-[11px] text-neutral-400">Based on 2,800+ customer reviews</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
