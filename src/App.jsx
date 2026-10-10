import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { OrderFormModal } from './components/OrderFormModal'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { AdminLogin } from './components/AdminLogin'
import { AdminDashboard } from './components/AdminDashboard'
import { SupabaseModal } from './components/SupabaseModal'
import { Footer } from './components/Footer'
import { DISHES } from './data/dishes'
import { SOCIAL_SCHEDULE } from './data/socialSchedule'
import { checkSupabaseConnection, TARGET_GMAIL } from './config/supabase'
import { createOrder } from './services/orderService'
import { sendOrderToGmail } from './services/emailService'
import {
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Database,
  ArrowRight,
  ShoppingBag,
  Star,
  PhoneCall
} from 'lucide-react'
import { Instagram, Facebook } from './components/Icons'

export function App() {
  const [cart, setCart] = useState([])
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [latestOrder, setLatestOrder] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [supabaseReady, setSupabaseReady] = useState(false)
  const [currentView, setCurrentView] = useState('customer') // 'customer' | 'admin'

  // Test Supabase connection on load
  useEffect(() => {
    checkSupabaseConnection().then(res => {
      setSupabaseReady(res.tableReady)
    })
  }, [])

  // Cart operations
  const handleAddToCart = (dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id)
      if (existing) {
        return prev.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...dish, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(item => item.id !== dishId))
    } else {
      setCart(prev =>
        prev.map(item => (item.id === dishId ? { ...item, quantity: newQty } : item))
      )
    }
  }

  // Triggered when customer clicks "Place Order"
  const handlePlaceOrder = async (orderPayload) => {
    // 1. Save in Supabase (Part A Requirement 4: "Order is saved in Supabase table orders with status Pending")
    const orderResult = await createOrder(orderPayload)
    const savedOrder = orderResult.order

    // 2. Dispatch to Gmail (Part A Requirement 3: "full order comes to your Gmail: dishes, quantity, total, name, phone and address")
    await sendOrderToGmail({
      ...orderPayload,
      id: savedOrder.id,
    })

    // Confetti celebration!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f97316', '#10b981'],
      })
    } catch (e) {
      // Ignore if canvas confetti is blocked
    }

    // Set latest order and display success modal
    setLatestOrder(savedOrder)
    setCart([])
    setIsOrderModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Scroll helper
  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // If viewing admin dashboard directly
  if (currentView === 'admin' && isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <AdminDashboard
          adminUser={adminUser}
          onLogout={() => {
            setIsAdminLoggedIn(false)
            setAdminUser(null)
            setCurrentView('customer')
          }}
          onReturnHome={() => setCurrentView('customer')}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          supabaseReady={supabaseReady}
        />

        <SupabaseModal
          isOpen={isSupabaseModalOpen}
          onClose={() => setIsSupabaseModalOpen(false)}
          onRefreshStatus={(ready) => setSupabaseReady(ready)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsOrderModalOpen(true)}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setCurrentView('admin')
          } else {
            setIsAdminLoginOpen(true)
          }
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        supabaseReady={supabaseReady}
      />

      {/* Hero Section (Part A Requirement 1) */}
      <Hero
        onOpenOrderForm={() => setIsOrderModalOpen(true)}
        onScrollToMenu={scrollToMenu}
      />

      {/* Why Choose Us Feature Ribbon */}
      <section id="why-us" className="py-12 bg-neutral-900/60 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Authentic Coal Smoked</h4>
                <p className="text-xs text-neutral-400">100% natural wooden charcoal grill</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Guaranteed 30-Min</h4>
                <p className="text-xs text-neutral-400">Piping hot delivery to your door</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Gmail Order Alert</h4>
                <p className="text-xs text-neutral-400">Instant notification to inbox</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Supabase Live Sync</h4>
                <p className="text-xs text-neutral-400">Realtime orders status tracker</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Section (Part A Requirement 1: "Show at least 6 dishes, each with a picture, name and price") */}
      <Menu
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenOrderForm={() => setIsOrderModalOpen(true)}
      />

      {/* Embedded Quick Order Section (Part A Requirement 2) */}
      <section id="order-section" className="py-16 bg-neutral-900/40 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Part A Requirement · Customer Order Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
            Ready to Feast? Place Your Order in 1 Click!
          </h2>
          <p className="text-neutral-300 text-sm max-w-xl mx-auto">
            Fill in your delivery details, pick your favorite dishes, and click Place Order. Your order will be immediately emailed to <strong className="text-amber-400">{TARGET_GMAIL}</strong> and recorded in Supabase as <span className="underline font-bold text-white">Pending</span>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-base shadow-xl shadow-amber-500/25 flex items-center gap-3 transition active:scale-95 cursor-pointer"
            >
              <span>Open Online Order Form</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setCurrentView('admin')
                } else {
                  setIsAdminLoginOpen(true)
                }
              }}
              className="px-6 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Dashboard (Part B)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Preview Section on Public Site (Part B Task 7 preview) */}
      <section id="social-section" className="py-16 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 text-xs font-semibold mb-2">
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram &amp; Facebook Feed Preview</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
                Follow Us on Social Media @zaikaroyale.pk
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Automated posts scheduled for peak Pakistan appetite hours (12:30 PM, 8:00 PM, 1:00 PM, 7:30 PM).
              </p>
            </div>

            <button
              onClick={() => {
                setIsAdminLoggedIn(true)
                setAdminUser({ email: TARGET_GMAIL })
                setCurrentView('admin')
              }}
              className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-neutral-200 flex items-center gap-2 self-start md:self-auto transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>View Full Social Scheduler (Part B Task 7) &rarr;</span>
            </button>
          </div>

          {/* Micro Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIAL_SCHEDULE.map(post => (
              <div key={post.id} className="relative aspect-square rounded-2xl overflow-hidden group bg-neutral-900 border border-neutral-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-95 transition"></div>
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-[10px] font-mono text-amber-400 border border-neutral-700">
                  {post.time}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">{post.topic}</span>
                  <p className="text-xs font-bold text-white line-clamp-1">{post.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setCurrentView('admin')
          } else {
            setIsAdminLoginOpen(true)
          }
        }}
        onOpenOrderForm={() => setIsOrderModalOpen(true)}
      />

      {/* Modals */}
      <OrderFormModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onAddToCart={handleAddToCart}
        onOrderPlaced={handlePlaceOrder}
      />

      <OrderSuccessModal
        order={latestOrder}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenAdmin={() => {
          setIsAdminLoggedIn(true)
          setAdminUser({ email: TARGET_GMAIL })
          setCurrentView('admin')
        }}
      />

      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(user) => {
          setIsAdminLoggedIn(true)
          setAdminUser(user)
          setCurrentView('admin')
        }}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onRefreshStatus={(ready) => setSupabaseReady(ready)}
      />

    </div>
  )
}

export default App
