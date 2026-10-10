import React from 'react'
import { CheckCircle2, ArrowRight, X, Clock, MapPin, Phone, Mail, AlertCircle, ExternalLink } from 'lucide-react'
import { TARGET_GMAIL } from '../config/supabase'
import { getDirectGmailComposeUrl, getGmailSearchActivationUrl } from '../services/emailService'

export function OrderSuccessModal({ order, emailStatus, onClose }) {
  if (!order) return null

  const orderIdDisplay = order.id ? (typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : order.id) : 'ORD-LATEST'

  const directGmailUrl = getDirectGmailComposeUrl(order)
  const gmailSearchUrl = getGmailSearchActivationUrl()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Celebration Banner */}
        <div className="p-6 bg-gradient-to-br from-amber-600 via-amber-700 to-orange-700 text-neutral-950 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-950/20 hover:bg-neutral-950/40 text-neutral-950 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-neutral-950 text-amber-400 mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-black tracking-tight font-serif text-white">
            Order Received Successfully!
          </h3>
          <p className="text-xs text-amber-100 font-medium mt-1">
            Order #{orderIdDisplay} · Thank you for dining with Zaika Royale Bistro!
          </p>
        </div>

        {/* Email Activation / Dispatch Notice */}
        {emailStatus && emailStatus.needsActivation ? (
          <div className="p-4 bg-amber-950/50 border-b border-amber-500/40 space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-amber-400 text-sm">
                  Action Needed for Email Delivery:
                </span>
                <p className="text-[11px] text-neutral-300 leading-relaxed mt-1">
                  FormSubmit has sent a 1-time activation email to <strong className="text-white">{TARGET_GMAIL}</strong>. 
                  Open your Gmail (check <strong>Inbox</strong> &amp; <strong>Spam</strong>) and click <strong>"Activate Form"</strong> to start receiving all orders directly!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 pl-6">
              <a
                href={gmailSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition shadow-md"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Search Activation Email in Gmail</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={directGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 transition"
              >
                <span>Send Order via Gmail Compose</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-neutral-950 border-b border-neutral-800 space-y-1.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Your order is confirmed and sent to {TARGET_GMAIL}!</span>
            </div>
            <p className="text-[11px] text-neutral-400 pl-6">
              Estimated Delivery: <strong>30-40 Minutes</strong> · Payment: <strong>Cash on Delivery (Rs. {Number(order.total_amount || order.total || 0).toLocaleString()} PKR)</strong>
            </p>
          </div>
        )}

        {/* Order Details Body */}
        <div className="p-6 space-y-4 max-h-[42vh] overflow-y-auto">
          
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Customer Name</span>
              <span className="font-semibold text-white">{order.customer_name || order.name}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Contact Number</span>
              <span className="font-semibold text-white">{order.customer_phone || order.phone}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-neutral-800">
              <span className="text-neutral-500 block text-[10px] uppercase font-bold">Delivery Address</span>
              <span className="text-neutral-300">{order.customer_address || order.address}</span>
            </div>
            {order.notes && (
              <div className="col-span-2 pt-2 border-t border-neutral-800">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Special Notes</span>
                <span className="text-amber-300">{order.notes}</span>
              </div>
            )}
          </div>

          {/* Dishes list */}
          <div>
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Dishes Ordered:</h4>
            <div className="space-y-1.5">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/60">
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
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-white">Total Amount (Cash on Delivery)</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              Rs. {Number(order.total_amount || order.total).toLocaleString()} PKR
            </span>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={directGmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition underline font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Order in Gmail Compose</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Back to Restaurant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  )
}
