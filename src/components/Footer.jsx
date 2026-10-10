import { UtensilsCrossed, Mail, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react'
import { Instagram, Facebook } from './Icons'
import { TARGET_GMAIL } from '../config/supabase'

export function Footer({ onOpenAdmin, onOpenOrderForm }) {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-serif tracking-tight">
                Zaika<span className="text-amber-400">Royale</span> Bistro
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Artisan Pakistani barbecue, clay tandoor delicacies, and slow-dum mutton biryani. 
              Built with precision for the Saylani Mass IT Training (SMIT) AI Web Hackathon.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social-section"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social-section"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition text-[11px] font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#menu" className="hover:text-amber-400 transition">Our Menu (6+ Dishes)</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition">Why Choose Us</a></li>
              <li><button onClick={onOpenOrderForm} className="hover:text-amber-400 transition cursor-pointer text-left">Online Order Form</button></li>
              <li><a href="#social-section" className="hover:text-amber-400 transition">Social Media Posts</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Order Routing */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Order Routing</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Orders Sent To:</span>
                  <span className="text-white font-mono">{TARGET_GMAIL}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Hotline:</span>
                  <span className="text-white">+92 (300) 829-1234</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hours &amp; Location</h4>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Open Daily: 12:00 PM – 2:00 AM (Pakistan Time)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Saylani Mass IT Training · ASF Campus, Karachi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Zaika Royale Bistro · Saylani Mass IT Training Hackathon Project.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for high performance with React, Tailwind &amp; Supabase</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
