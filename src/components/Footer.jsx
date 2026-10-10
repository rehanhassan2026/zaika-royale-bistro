import React from 'react'
import { UtensilsCrossed, Mail, Phone, MapPin, Clock, Heart } from 'lucide-react'

export function Footer({ onOpenOrderForm }) {
  return (
    <footer id="contact" className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-amber-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-serif tracking-tight">
                Zaika<span className="text-amber-400">Royale</span> Bistro
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Artisan Pakistani barbecue, clay tandoor delicacies, and slow-dum mutton biryani. 
              Serving authentic culinary heritage and unforgettable charcoal flavours across Karachi.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#menu" className="hover:text-amber-400 transition">Our Menu</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition">Why Choose Us</a></li>
              <li><button onClick={onOpenOrderForm} className="hover:text-amber-400 transition cursor-pointer text-left">Order Online Now</button></li>
              <li><a href="#contact" className="hover:text-amber-400 transition">Contact &amp; Location</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Order Hotline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Support</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Delivery Hotline:</span>
                  <a href="tel:+923008291234" className="text-white font-semibold hover:text-amber-400 transition">
                    +92 (300) 829-1234
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Orders &amp; Queries:</span>
                  <a href="mailto:sandhucosmetics1@gmail.com" className="text-white font-semibold hover:text-amber-400 transition">
                    sandhucosmetics1@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operating Hours &amp; City</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Open Daily: 12:00 PM – 2:00 AM (Pakistan Time)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Main Boulevard, Phase 6, DHA &amp; Gulshan, Karachi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Zaika Royale Bistro. All rights reserved. 100% Halal Food Guaranteed.</p>
          <div className="flex items-center gap-1">
            <span>Fast Doorstep Delivery &amp; Fresh Charcoal Catering</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
