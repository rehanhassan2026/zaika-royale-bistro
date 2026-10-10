import React from 'react'
import { UtensilsCrossed, ShoppingBag, Phone, Clock, Sparkles } from 'lucide-react'

export function Navbar({ cartCount, cartTotal, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-neutral-950 text-xs font-semibold px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-neutral-950 animate-ping"></span>
            <span>✨ Special Offer: Free Express Delivery on All Orders Over Rs. 1,000 | 100% Fresh Charcoal Grilled Daily</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-950">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 12:00 PM – 2:00 AM Daily
            </span>
            <span className="hidden sm:inline font-bold">|</span>
            <span className="hidden sm:flex items-center gap-1 font-bold">
              <Phone className="w-3.5 h-3.5" /> Hotline: +92 (300) 829-1234
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6 text-neutral-950" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                Zaika<span className="text-amber-400">Royale</span>
              </span>
              <p className="text-xs text-neutral-400 tracking-wider uppercase font-medium">Bistro &amp; Charcoal Grill</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Our Menu</a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a>
            <a href="#order-section" className="hover:text-amber-400 transition-colors">Order Online</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Order Form shortcut */}
            <button
              onClick={onOpenCart}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-amber-500 text-neutral-200 transition hidden sm:flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Order Online</span>
            </button>

            {/* Cart / Order button */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2.5 transition active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Order</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center px-2 py-0.5 text-xs font-black bg-neutral-950 text-amber-400 rounded-full">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline text-xs font-black border-l border-neutral-900/40 pl-2">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
