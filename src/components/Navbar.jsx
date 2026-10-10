import React, { useState } from 'react'
import { UtensilsCrossed, ShoppingBag, Phone, Clock, Sparkles, Menu as MenuIcon, X, Truck } from 'lucide-react'

export function Navbar({ cartCount, cartTotal, onOpenCart, onOpenTrack }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (targetId) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      {/* Top Announcement Banner - Responsive */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-neutral-950 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="flex h-2 w-2 rounded-full bg-neutral-950 animate-ping shrink-0"></span>
            <span className="truncate">Free Delivery on Orders Over Rs. 1,000 | 100% Fresh Charcoal Grill</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-neutral-950 font-bold">
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 12 PM – 2 AM
            </span>
            <a href="tel:+923008291234" className="flex items-center gap-1 hover:underline">
              <Phone className="w-3.5 h-3.5" /> 
              <span className="hidden xs:inline">+92 300 829-1234</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-950" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif">
                Zaika<span className="text-amber-400">Royale</span>
              </span>
              <p className="text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase font-medium">Bistro &amp; Charcoal Grill</p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#menu" className="hover:text-amber-400 transition-colors">Our Menu</a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a>
            <a href="#order-form" className="hover:text-amber-400 transition-colors">Order Online</a>
            <button
              onClick={onOpenTrack}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Order</span>
            </button>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Track Order Button (Desktop & Tablet) */}
            <button
              onClick={onOpenTrack}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-amber-500/50 text-neutral-200 transition hidden sm:flex items-center gap-1.5 cursor-pointer"
              title="Track your food order with Ref ID"
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>

            {/* Quick Order Button (Desktop/Tablet) */}
            <button
              onClick={() => handleNavClick('order-form')}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:border-amber-500 text-neutral-200 transition hidden md:flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Order Online</span>
            </button>

            {/* Cart / Order button */}
            <button
              onClick={() => handleNavClick('order-form')}
              className="relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition active:scale-95 cursor-pointer shrink-0"
              aria-label="View order cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Order</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs font-black bg-neutral-950 text-amber-400 rounded-full min-w-5">
                  {cartCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="hidden md:inline text-xs font-black border-l border-neutral-900/40 pl-2">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white lg:hidden transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900/98 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-2.5 animate-fadeIn">
          <nav className="flex flex-col space-y-1 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('menu')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 transition cursor-pointer"
            >
              Our Menu (8 Dishes)
            </button>
            <button
              onClick={() => handleNavClick('why-us')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 transition cursor-pointer"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('order-form')}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30 transition flex items-center justify-between cursor-pointer"
            >
              <span>Order Online Form</span>
              <span className="text-xs">→</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenTrack) onOpenTrack()
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-800 text-amber-300 hover:text-amber-200 transition flex items-center gap-2 cursor-pointer font-bold"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Order (Ref ID)</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 transition cursor-pointer"
            >
              Contact &amp; Location
            </button>
          </nav>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>Hotline: +92 300 829-1234</span>
            <a
              href="tel:+923008291234"
              className="px-3 py-1.5 rounded-lg bg-neutral-800 text-amber-400 font-bold border border-neutral-700"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
