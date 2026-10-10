import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { OrderSection } from './components/OrderSection'
import { OrderFormModal } from './components/OrderFormModal'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { Footer } from './components/Footer'
import { createOrder } from './services/orderService'
import { sendOrderToGmail } from './services/emailService'
import {
  Flame,
  Clock,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react'

export function App() {
  const [cart, setCart] = useState([])
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [latestOrder, setLatestOrder] = useState(null)
  const [emailStatus, setEmailStatus] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

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

  // Smooth scroll to on-page order form
  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      setIsOrderModalOpen(true)
    }
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle order placement
  const handlePlaceOrder = async (orderPayload) => {
    // 1. Save in Supabase orders table with status 'Pending'
    const orderResult = await createOrder(orderPayload)
    const savedOrder = orderResult.order

    // 2. Dispatch full order details to sandhucosmetics1@gmail.com
    const mailResult = await sendOrderToGmail({
      ...orderPayload,
      id: savedOrder.id,
    })
    setEmailStatus(mailResult)

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f97316', '#10b981'],
      })
    } catch (e) {
      // Ignore if blocked
    }

    // Set order for confirmation receipt
    setLatestOrder(savedOrder)
    setCart([])
    setIsOrderModalOpen(false)
    setIsSuccessModalOpen(true)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={scrollToOrderForm}
      />

      {/* Hero Section */}
      <Hero
        onOpenOrderForm={scrollToOrderForm}
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
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Fresh &amp; Halal</h4>
                <p className="text-xs text-neutral-400">Strict hygiene and quality checks</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Master Chef Recipes</h4>
                <p className="text-xs text-neutral-400">Generations of royal culinary heritage</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Section */}
      <Menu
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenOrderForm={scrollToOrderForm}
      />

      {/* Fully Visible On-Page Order Form Section */}
      <OrderSection
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onAddToCart={handleAddToCart}
        onOrderPlaced={handlePlaceOrder}
      />

      {/* Footer */}
      <Footer
        onOpenOrderForm={scrollToOrderForm}
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
        emailStatus={emailStatus}
        onClose={() => setIsSuccessModalOpen(false)}
      />

    </div>
  )
}

export default App
