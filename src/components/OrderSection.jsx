import React, { useState } from 'react'
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  ShieldCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Sparkles
} from 'lucide-react'
import { DISHES } from '../data/dishes'

export function OrderSection({ cart, onUpdateQuantity, onAddToCart, onOrderPlaced }) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [progressStep, setProgressStep] = useState('')

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 150
  const grandTotal = subtotal + deliveryFee

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name!')
      return
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your phone number!')
      return
    }
    if (!customerAddress.trim()) {
      setErrorMessage('Please enter your complete delivery address!')
      return
    }
    if (cart.length === 0) {
      setErrorMessage('Please pick at least 1 dish to place your order!')
      return
    }

    setIsSubmitting(true)
    setProgressStep('Confirming your order...')

    const orderData = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
      notes: notes.trim(),
      items: cart,
      subtotal,
      deliveryFee,
      total: grandTotal,
    }

    try {
      await onOrderPlaced(orderData)
      // Clear form on success
      setCustomerName('')
      setCustomerPhone('')
      setCustomerAddress('')
      setNotes('')
    } catch (err) {
      setErrorMessage(err.message || 'Error processing order. Please try again.')
    } finally {
      setIsSubmitting(false)
      setProgressStep('')
    }
  }

  const handleFillSample = () => {
    setCustomerName('Muhammad Rehan')
    setCustomerPhone('+92 300 8291456')
    setCustomerAddress('Flat 402, Al-Noor Heights, Block 13-D, Gulshan-e-Iqbal, Karachi')
    setNotes('Please send extra green chili raita and mint dip.')
    if (cart.length === 0) {
      onAddToCart(DISHES[0]) // Royal Dum Mutton Biryani
      onAddToCart(DISHES[1]) // Seekh Kabab
    }
  }

  return (
    <section id="order-form" className="py-16 sm:py-24 bg-neutral-900/60 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Fast &amp; Fresh Online Checkout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Place Your Food Order
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Fill in your delivery address, select your favorite dishes, and click Place Order. Enjoy piping hot charcoal food delivered right to your door!
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main 2-Column Form Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Card Top Announcement Bar */}
          <div className="p-4 bg-neutral-950/70 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Standard Delivery: <strong>30-40 Minutes</strong> across Karachi</span>
            </div>
            
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-medium text-[11px] border border-neutral-700 transition cursor-pointer"
            >
              Fill Sample Address
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            
            {/* =========================================================
                LEFT COLUMN: CUSTOMER DETAILS FORM
                ========================================================= */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>1. Your Delivery Details</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Please provide your contact details so our dispatch rider can deliver your food.
                </p>
              </div>

              <form id="direct-order-form" onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Ali"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Complete Delivery Address <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    <textarea
                      required
                      rows={3}
                      placeholder="House / Flat No, Building, Street, Sector, Area (e.g. House 14-B, Block 4, Gulshan-e-Iqbal, Karachi)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition resize-none"
                    />
                  </div>
                </div>

                {/* Special Instructions (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                    Cooking / Delivery Notes <span className="text-neutral-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, extra raita, please call before ring"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

              </form>

              {/* Payment Info */}
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Payment Method: <strong>Cash on Delivery (COD)</strong></span>
                </div>
                <span className="text-[10px] text-neutral-500 uppercase font-semibold">Pay upon arrival</span>
              </div>
            </div>

            {/* =========================================================
                RIGHT COLUMN: SELECTED DISHES & SUMMARY
                ========================================================= */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-neutral-950/40 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>2. Selected Dishes</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Dishes list */}
                {cart.length === 0 ? (
                  <div className="p-5 rounded-2xl bg-neutral-950 border border-dashed border-neutral-800 text-center space-y-3">
                    <p className="text-xs text-neutral-400">
                      Your order is empty. Pick dishes with 1-click below:
                    </p>
                    <div className="space-y-2">
                      {DISHES.slice(0, 3).map(dish => (
                        <div
                          key={dish.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition"
                        >
                          <div className="flex items-center gap-2.5 text-left">
                            <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-xs font-bold text-white line-clamp-1">{dish.name}</p>
                              <p className="text-[11px] text-amber-400 font-semibold">Rs. {dish.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onAddToCart(dish)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                            <p className="text-[11px] text-amber-400 font-semibold">
                              Rs. {item.price.toLocaleString()} × {item.quantity} = <span className="text-white">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition cursor-pointer"
                          >
                            {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3 h-3" />}
                          </button>

                          <span className="text-xs font-black text-amber-400 w-5 text-center">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center font-bold transition cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Financial Calculation & Place Order CTA */}
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Food Subtotal:</span>
                    <span className="text-white font-medium">Rs. {subtotal.toLocaleString()} PKR</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Delivery Charges:</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                      {deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryFee} PKR`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm">
                    <span className="font-bold text-white">Grand Total Amount:</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      Rs. {grandTotal.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">PKR</span>
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  form="direct-order-form"
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className={`w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer ${
                    isSubmitting || cart.length === 0 ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>{progressStep || 'Confirming Order...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm &amp; Place Order (Rs. {grandTotal.toLocaleString()})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-neutral-500">
                  By clicking Place Order, your food is prepared fresh and dispatched via express courier.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
