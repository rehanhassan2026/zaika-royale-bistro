import React, { useState } from 'react'
import { X, ShoppingBag, Plus, Minus, Trash2, Send, ShieldCheck, Mail, Database, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { DISHES } from '../data/dishes'
import { TARGET_GMAIL } from '../config/supabase'

export function OrderFormModal({ isOpen, onClose, cart, onUpdateQuantity, onAddToCart, onOrderPlaced }) {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [progressStep, setProgressStep] = useState('') // 'email' | 'supabase' | 'done'

  if (!isOpen) return null

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 150
  const grandTotal = subtotal + deliveryFee

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    // Hackathon requirement: "All fields must be filled (required)"
    if (!customerName.trim()) {
      setErrorMessage('Customer name is required!')
      return
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Phone number is required!')
      return
    }
    if (!customerAddress.trim()) {
      setErrorMessage('Delivery address is required!')
      return
    }
    if (cart.length === 0) {
      setErrorMessage('Please select at least 1 dish to place your order!')
      return
    }

    setIsSubmitting(true)

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
      setProgressStep('Confirming your order...')
      await onOrderPlaced(orderData)
      // reset form
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

  // Pre-fill quick demo data for easy testing during hackathon demo
  const handleQuickDemoFill = () => {
    setCustomerName('Muhammad Rehan')
    setCustomerPhone('+92 300 8291456')
    setCustomerAddress('Flat 402, Al-Noor Heights, Block 13-D, Gulshan-e-Iqbal, Karachi')
    setNotes('Please bring extra mint chutney and spicy chili dip.')
    if (cart.length === 0) {
      onAddToCart(DISHES[0]) // Royal Biryani
      onAddToCart(DISHES[1]) // Seekh Kabab
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-serif">Place Your Order</h3>
              <p className="text-xs text-neutral-400">
                Fresh Charcoal Delicacies · Cash on Delivery Available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium border border-neutral-700 transition"
              title="Click to fill sample delivery address"
            >
              Fill Sample Address
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-500/50 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Section */}
          <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Phone Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                Delivery Address <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="House / Flat No, Street, Sector, Area, City (e.g. House 14-B, Block 4, Gulshan-e-Iqbal, Karachi)"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition resize-none"
              />
            </div>

            {/* Special Instructions (Optional) */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                Special Instructions <span className="text-neutral-500 text-[10px]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Make it extra spicy, extra raita, call upon arrival"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>
          </form>

          {/* Selected Dishes & Quantity Section */}
          <div className="pt-2 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>Selected Dishes &amp; Quantity</span>
                <span className="text-amber-400">*</span>
                <span className="text-neutral-500 text-[11px]">({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              </label>
              {cart.length > 0 && (
                <span className="text-xs text-amber-400 font-semibold">
                  Subtotal: Rs. {subtotal.toLocaleString()}
                </span>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-dashed border-neutral-800 text-center space-y-3">
                <p className="text-xs text-neutral-400">You haven't selected any dishes yet. Pick from our popular dishes below:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DISHES.slice(0, 4).map(dish => (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => onAddToCart(dish)}
                      className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 flex items-center justify-between text-left transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img src={dish.image} alt={dish.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white line-clamp-1">{dish.name}</p>
                          <p className="text-[10px] text-amber-400 font-semibold">Rs. {dish.price}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
                        + Add
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
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

          {/* Pricing Breakdown Card */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Dishes Subtotal:</span>
              <span className="text-white font-medium">Rs. {subtotal.toLocaleString()} PKR</span>
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Standard Delivery:</span>
              <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : 'text-white'}>
                {deliveryFee === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryFee} PKR`}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm">
              <span className="font-bold text-white">Grand Total Amount:</span>
              <span className="text-xl font-black text-amber-400">
                Rs. {grandTotal.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">PKR</span>
              </span>
            </div>
          </div>

          {/* Trust notes */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secure Instant Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Delivery in 30-40 Mins</span>
            </div>
          </div>

        </div>

        {/* Modal Footer with Submit Button */}
        <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs font-bold transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            form="order-form"
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 transition active:scale-95 cursor-pointer ${
              isSubmitting || cart.length === 0 ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                <span>{progressStep || 'Processing Order...'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Place Order (Rs. {grandTotal.toLocaleString()})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

