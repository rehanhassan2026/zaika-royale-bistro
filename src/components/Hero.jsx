import React from 'react'
import { Sparkles, ArrowRight, Clock, Flame, Star, CheckCircle2, ShieldCheck } from 'lucide-react'

export function Hero({ onOpenOrderForm, onScrollToMenu }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Top Section Info */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6">
            
            {/* Ambient luxury badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Karachi's Premier Charcoal Grill &amp; Royal Cuisine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-[1.15] sm:leading-[1.1]">
              Royal Flavours, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
                Charcoal Perfection.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Welcome to <span className="text-white font-bold">Zaika Royale Bistro</span>. Experience Karachi’s finest 
              slow-cooked Dum Mutton Biryani, live charcoal-grilled seekh kababs, and slow-simmered beef nihari. 
              Delivered piping hot straight to your doorstep.
            </p>

            {/* Highlight Cards: Real restaurant value props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Express 30-Min Delivery</p>
                  <p className="text-[11px] text-neutral-400 leading-snug">Hot food straight from our clay tandoor to your home</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Halal &amp; Fresh Daily</p>
                  <p className="text-[11px] text-neutral-400 leading-snug">Prime cuts &amp; hand-ground spices prepared every morning</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Full width on phone, row on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenOrderForm}
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer"
              >
                <span>Order Food Online</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/40 text-neutral-200 font-bold text-sm sm:text-base flex items-center justify-center transition cursor-pointer"
              >
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 pt-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Fast Home Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Live Charcoal Fresh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-3xl opacity-20 blur-lg"></div>

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"
                    alt="Royal Dum Mutton Biryani"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent"></div>
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    <span>Chef's Signature Dish</span>
                  </div>

                  {/* Rating bubble */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-neutral-200">
                    4.9 ★ (1,400+ Orders)
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-400 font-bold">Featured Dish</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-serif">Royal Dum Mutton Biryani</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-300">Served with seasoned raita &amp; fresh salad</p>
                  </div>
                </div>

                {/* Card footer details */}
                <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs text-neutral-400 block">Starting From</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-400">Rs. 1,350 <span className="text-xs text-neutral-400 font-normal">PKR</span></span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenOrderForm}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
