import React, { useState, useEffect } from 'react'
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  ChefHat,
  X,
  AlertCircle,
  PackageCheck,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react'
import { trackOrder, getLocalOrders } from '../services/orderService'

export function TrackOrderModal({ isOpen, onClose, initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const [searchedOrder, setSearchedOrder] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const executeSearch = async (queryToSearch) => {
    const q = (queryToSearch || '').trim()
    if (!q) {
      setErrorMessage('Please enter a Reference ID or Phone number!')
      return
    }

    setErrorMessage('')
    setIsSearching(true)
    setHasSearched(true)

    try {
      const order = await trackOrder(q)
      setSearchedOrder(order)
      if (!order) {
        setErrorMessage(`No active order found for "${q}". Please double check your Reference ID (e.g. ZR-84291) or Phone number.`)
      }
    } catch (err) {
      setErrorMessage('Search error: ' + err.message)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setSearchQuery(initialQuery)
        executeSearch(initialQuery)
      } else {
        // If user already had a searched order, keep it, otherwise load latest recent order if available
        const recent = getLocalOrders()
        if (recent.length > 0 && !searchedOrder) {
          const latest = recent[0]
          const q = latest.ref_id || latest.id
          setSearchQuery(q)
          setSearchedOrder(latest)
          setHasSearched(true)
        }
      }
    }
  }, [isOpen, initialQuery])

  if (!isOpen) return null

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    executeSearch(searchQuery)
  }

  const handleCopyRef = (textToCopy) => {
    if (!textToCopy) return
    navigator.clipboard?.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Pre-load recent local order if available
  const recentOrders = getLocalOrders().slice(0, 3)

  // Map order status to progress steps
  const getStepStatus = (orderStatus, stepIndex) => {
    // 0: Order Placed, 1: Kitchen, 2: On The Way, 3: Delivered
    const s = (orderStatus || 'Pending').toLowerCase()
    if (s === 'delivered') {
      return 'completed'
    }
    if (s === 'preparing') {
      if (stepIndex <= 1) return 'completed'
      if (stepIndex === 2) return 'current'
      return 'upcoming'
    }
    // Pending
    if (stepIndex === 0) return 'completed'
    if (stepIndex === 1) return 'current'
    return 'upcoming'
  }

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & routed to kitchen', icon: CheckCircle2 },
    { title: 'In The Kitchen', desc: 'Charcoal grill & tandoor underway', icon: Flame },
    { title: 'Out For Delivery', desc: 'Rider dispatched with thermal box', icon: Truck },
    { title: 'Delivered', desc: 'Delivered hot to your door', icon: PackageCheck },
  ]

  const refDisplay = searchedOrder?.ref_id || (searchedOrder?.id ? (typeof searchedOrder.id === 'string' && searchedOrder.id.length > 8 ? searchedOrder.id.slice(0, 8).toUpperCase() : searchedOrder.id) : 'ZR-ORDER')

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-neutral-950/80 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-serif">Track Your Food Order</h3>
              <p className="text-xs text-neutral-400">Enter your Reference ID to see real-time order status</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Ref ID (e.g. ZR-84291) or Phone number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition uppercase font-mono tracking-wider"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions / Recent Orders */}
            {recentOrders.length > 0 && !searchedOrder && (
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-500">Recent:</span>
                {recentOrders.map(ro => {
                  const rCode = ro.ref_id || (ro.id ? ro.id.slice(0, 8).toUpperCase() : 'ZR-ORDER')
                  return (
                    <button
                      key={ro.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(rCode)
                        setSearchedOrder(ro)
                        setHasSearched(true)
                        setErrorMessage('')
                      }}
                      className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-amber-300 font-mono text-[11px] transition"
                    >
                      #{rCode}
                    </button>
                  )
                })}
              </div>
            )}
          </form>

          {/* Error notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Searched Order Details */}
          {searchedOrder && (
            <div className="space-y-6 pt-2 animate-fadeIn">
              
              {/* Top Order Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black text-amber-400">
                      #{refDisplay}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyRef(refDisplay)}
                      className="p-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition cursor-pointer"
                      title="Copy Reference ID"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {searchedOrder.status || 'Pending'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Placed at: {new Date(searchedOrder.created_at || Date.now()).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold block">Estimated Arrival</span>
                  <span className="text-sm font-bold text-white flex items-center sm:justify-end gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>30 - 40 Minutes</span>
                  </span>
                </div>
              </div>

              {/* Progress Milestones Tracker */}
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Live Preparation &amp; Delivery Progress
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {steps.map((step, idx) => {
                    const stepState = getStepStatus(searchedOrder.status, idx)
                    const Icon = step.icon

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition ${
                          stepState === 'completed'
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                            : stepState === 'current'
                            ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 ring-1 ring-amber-500/30 animate-pulse'
                            : 'bg-neutral-900/50 border-neutral-800 text-neutral-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-5 h-5 ${stepState === 'completed' ? 'text-emerald-400' : stepState === 'current' ? 'text-amber-400' : 'text-neutral-600'}`} />
                          <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${stepState === 'upcoming' ? 'text-neutral-500' : 'text-white'}`}>
                            {step.title}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5 leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Details Accordion / Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Customer Details */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Delivery Destination</span>
                  <p className="font-bold text-white">{searchedOrder.customer_name || searchedOrder.name}</p>
                  <p className="text-neutral-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{searchedOrder.customer_phone || searchedOrder.phone}</span>
                  </p>
                  <p className="text-neutral-400 flex items-start gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{searchedOrder.customer_address || searchedOrder.address}</span>
                  </p>
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">Payment &amp; Bill</span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      Rs. {Number(searchedOrder.total_amount || searchedOrder.total || 0).toLocaleString()} PKR
                    </span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Cash on Delivery upon arrival</p>
                  </div>

                  <a
                    href="tel:+923008291234"
                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 text-xs font-semibold border border-neutral-800 flex items-center justify-center gap-2 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Hotline for Rider Update</span>
                  </a>
                </div>
              </div>

              {/* Ordered Dishes List */}
              {Array.isArray(searchedOrder.items) && searchedOrder.items.length > 0 ? (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Items in this Order</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {searchedOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs text-neutral-300 py-1 border-b border-neutral-900 last:border-0">
                        <span>
                          <strong className="text-amber-400 font-bold">{item.quantity}x</strong> {item.name}
                        </span>
                        <span className="font-mono text-neutral-400">
                          Rs. {(item.price * item.quantity).toLocaleString()} PKR
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : searchedOrder.items_summary ? (
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">Ordered Items</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-mono">{searchedOrder.items_summary}</p>
                </div>
              ) : null}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/90 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            For urgent updates, call hotline +92 (300) 829-1234
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}
