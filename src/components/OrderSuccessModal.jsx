import React, { useState } from 'react'
import {
  CheckCircle2,
  ArrowRight,
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  ExternalLink,
  Home,
  Truck,
  Copy,
  Check
} from 'lucide-react'
import { TARGET_GMAIL } from '../config/supabase'
import { getDirectGmailComposeUrl, getGmailSearchActivationUrl } from '../services/emailService'

export function OrderSuccessModal({ isOpen, order, emailStatus, onClose, onTrackOrder }) {
  const [copied, setCopied] = useState(false)
  if (!isOpen || !order) return null

  const refCode = order.ref_id || (order.id ? (typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : order.id) : 'ZR-ORDER')
  const orderIdDisplay = refCode

  const directGmailUrl = getDirectGmailComposeUrl(order)
  const gmailSearchUrl = getGmailSearchActivationUrl()

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(refCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTrackClick = () => {
    if (onTrackOrder) {
      onTrackOrder(refCode)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[94vh]">
        
        {/* Top Celebration Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-600 via-amber-700 to-orange-700 text-neutral-950 text-center relative shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-neutral-950/30 hover:bg-neutral-950/50 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-950 text-amber-400 mx-auto flex items-center justify-center shadow-lg mb-2.5">
            <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight font-serif text-white">
            Order Received Successfully!
          </h3>
          <p className="text-xs text-amber-100 font-medium mt-1">
            Thank you for dining with Zaika Royale!
          </p>
        </div>

        {/* Live Reference ID & Instant Tracking Banner */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              Your Order Reference ID:
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
              <span className="font-mono text-xl font-black text-amber-400 tracking-wider">
                #{refCode}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="p-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
                title="Copy Reference ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={handleTrackClick}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Now</span>
          </button>
        </div>

        {/* Email Status & Delivery Alert */}
        <div className="p-3.5 sm:p-4 bg-neutral-950 border-b border-neutral-800 space-y-1.5 text-xs text-neutral-300 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Order confirmed and dispatched to our kitchen &amp; delivery rider!</span>
          </div>
          <p className="text-[11px] text-neutral-400 pl-6 leading-relaxed">
            Estimated Delivery: <strong>30-40 Minutes</strong> · Payment: <strong>Cash on Delivery (Rs. {Number(order.total_amount || order.total || 0).toLocaleString()} PKR)</strong>
          </p>
        </div>

        {/* Order Details Body: Scrollable */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-neutral-950/80 p-3.5 rounded-2xl border border-neutral-800">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Customer Name</span>
              <span className="font-semibold text-white">{order.customer_name || order.name}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Contact Number</span>
              <span className="font-semibold text-white">{order.customer_phone || order.phone}</span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-neutral-800/80">
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Delivery Address</span>
              <span className="text-neutral-300 leading-relaxed">{order.customer_address || order.address}</span>
            </div>
            {order.notes && (
              <div className="sm:col-span-2 pt-2 border-t border-neutral-800/80">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Special Notes</span>
                <span className="text-amber-300">{order.notes}</span>
              </div>
            )}
          </div>

          {/* Dishes list */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Dishes Ordered:</h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                  <span className="text-white">
                    <span className="text-amber-400 font-bold">{item.quantity}x</span> {item.name}
                  </span>
                  <span className="text-neutral-300 font-mono">
                    Rs. {(item.price * item.quantity).toLocaleString()} PKR
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grand total */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-white">Grand Total Amount</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              Rs. {Number(order.total_amount || order.total).toLocaleString()} <span className="text-xs text-neutral-400 font-normal">PKR</span>
            </span>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href={directGmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition underline font-medium order-3 sm:order-1"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Receipt in Gmail</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
            <button
              type="button"
              onClick={handleTrackClick}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Track Order</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Done</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
