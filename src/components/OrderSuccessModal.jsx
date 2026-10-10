import React from 'react'
import { CheckCircle2, ArrowRight, X, Clock, MapPin, Phone, User, ShoppingBag } from 'lucide-react'

export function OrderSuccessModal({ order, onClose }) {
  if (!order) return null

  const orderIdDisplay = order.id ? (typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : order.id) : 'ORD-LATEST'

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

        {/* Real Customer Order Notice */}
        <div className="p-4 bg-neutral-950 border-b border-neutral-800 space-y-1.5 text-xs text-neutral-300">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Your order is confirmed! Our kitchen has begun preparing your dishes.</span>
          </div>
          <p className="text-[11px] text-neutral-400 pl-6">
            Estimated Delivery: <strong>30-40 Minutes</strong> · Payment: <strong>Cash on Delivery (Rs. {Number(order.total_amount || order.total || 0).toLocaleString()} PKR)</strong>
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4 max-h-[45vh] overflow-y-auto">
          
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
        <div className="p-5 border-t border-neutral-800 bg-neutral-950/90 flex items-center justify-between gap-3">
          <span className="text-[11px] text-neutral-400">
            A confirmation receipt has been sent to our dispatch team.
          </span>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>Back to Restaurant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  )
}
