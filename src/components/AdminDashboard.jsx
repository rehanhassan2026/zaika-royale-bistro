import React, { useState, useEffect } from 'react'
import {
  UtensilsCrossed,
  Package,
  Share2,
  Database,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Home
} from 'lucide-react'
import { getAllOrders, updateOrderStatus } from '../services/orderService'
import { SocialScheduler } from './SocialScheduler'
import { TARGET_GMAIL } from '../config/supabase'

export function AdminDashboard({ adminUser, onLogout, onReturnHome, onOpenSupabaseModal, supabaseReady }) {
  const [activeTab, setActiveTab] = useState('orders') // 'orders' | 'social'
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)
  const [notification, setNotification] = useState(null)

  const loadOrders = async () => {
    setIsLoading(true)
    try {
      const res = await getAllOrders()
      setOrders(res.orders || [])
      if (res.error) {
        setNotification({
          type: 'warning',
          message: 'Supabase notice: ' + res.error + '. Showing local cached orders.',
        })
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      // Update local state immediately so UI changes without delay
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
      setNotification({
        type: 'success',
        message: `Order status updated to "${newStatus}" and saved in Supabase!`,
      })
      setTimeout(() => setNotification(null), 3500)
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Could not update status: ' + err.message,
      })
    } finally {
      setUpdatingId(null)
    }
  }

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    const nameMatch = (order.customer_name || order.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    const phoneMatch = (order.customer_phone || order.phone || '').includes(searchQuery)
    const addressMatch = (order.customer_address || order.address || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && (nameMatch || phoneMatch || addressMatch)
  })

  // Metrics
  const totalCount = orders.length
  const pendingCount = orders.filter(o => o.status === 'Pending').length
  const preparingCount = orders.filter(o => o.status === 'Preparing').length
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || o.total || 0), 0)

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      
      {/* =========================================================================
          LEFT SIDEBAR (Requirement 5: "The dashboard has a sidebar on the left (Orders, Logout)")
          ========================================================================= */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col shrink-0">
        
        {/* Brand */}
        <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white font-serif">Zaika Royale</h2>
            <p className="text-[11px] text-amber-400 font-medium">Admin Control Center</p>
          </div>
        </div>

        {/* Admin info badge */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
          <p className="text-[10px] uppercase font-bold text-neutral-500">Logged in Admin</p>
          <p className="text-white font-medium truncate">{adminUser?.email || TARGET_GMAIL}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Session Active</span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Orders Dashboard</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === 'orders' ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-800 text-neutral-400'
            }`}>
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'social'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4" />
              <span>Social Media (Auto-Post)</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              4 Times
            </span>
          </button>

          <button
            onClick={onOpenSupabaseModal}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Supabase SQL Setup</span>
            </div>
            <span className={`w-2 h-2 rounded-full ${supabaseReady ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          </button>

          <div className="pt-4 border-t border-neutral-800 my-2"></div>

          <button
            onClick={onReturnHome}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Restaurant Web</span>
          </button>
        </nav>

        {/* Sidebar Footer: Logout */}
        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-red-950/40 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-500/40 text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* =========================================================================
          RIGHT MAIN PANEL (Requirement 5: "...and all orders on the right: customer, dishes, total, time and status.")
          ========================================================================= */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* If Social Media tab is active */}
        {activeTab === 'social' ? (
          <SocialScheduler />
        ) : (
          <>
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-serif">
                  Live Orders Management
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Change order status: <span className="text-amber-400 font-bold">Pending</span> &rarr; <span className="text-blue-400 font-bold">Preparing</span> &rarr; <span className="text-emerald-400 font-bold">Delivered</span> (persists in Supabase)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadOrders}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 flex items-center gap-2 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
                  <span>Refresh Orders</span>
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {notification && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 border ${
                notification.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : notification.type === 'warning'
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
            )}

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <span className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">Total Orders</span>
                <span className="text-2xl font-black text-white">{totalCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-500/30">
                <span className="text-[11px] uppercase font-bold text-amber-400 block mb-1">Pending</span>
                <span className="text-2xl font-black text-amber-400">{pendingCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-blue-500/30">
                <span className="text-[11px] uppercase font-bold text-blue-400 block mb-1">Preparing</span>
                <span className="text-2xl font-black text-blue-400">{preparingCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900 border border-emerald-500/30">
                <span className="text-[11px] uppercase font-bold text-emerald-400 block mb-1">Delivered</span>
                <span className="text-2xl font-black text-emerald-400">{deliveredCount}</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-900 border border-neutral-800">
              
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Pending', 'Preparing', 'Delivered'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      statusFilter === status
                        ? 'bg-amber-500 text-neutral-950 shadow-sm'
                        : 'bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by customer, phone, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

            </div>

            {/* Orders List / Cards */}
            {isLoading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-neutral-400">Loading orders from Supabase...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3">
                <Package className="w-12 h-12 text-neutral-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No Orders Found</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  {searchQuery || statusFilter !== 'All'
                    ? 'No orders match your filter criteria.'
                    : 'No customer orders have been placed yet. Place an order on the website to see it here live!'}
                </p>
                <button
                  onClick={onReturnHome}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs uppercase transition hover:bg-amber-400 cursor-pointer"
                >
                  Place Test Order
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => {
                  const statusColors = {
                    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    Preparing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                    Delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                  }

                  const orderIdDisplay = typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8) : order.id

                  return (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition space-y-4"
                    >
                      {/* Order Header: Customer & Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
                            #{orderIdDisplay}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white">
                              {order.customer_name || order.name}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-500" />
                                {order.customer_phone || order.phone}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-neutral-500" />
                                {new Date(order.created_at || Date.now()).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })} PKT
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Current Status Badge */}
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${statusColors[order.status] || statusColors.Pending}`}>
                            {order.status || 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Middle Details: Address & Dishes */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                        
                        {/* Address */}
                        <div className="md:col-span-4 bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 space-y-1">
                          <span className="text-[10px] uppercase font-bold text-neutral-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" /> Delivery Address
                          </span>
                          <p className="text-neutral-300 leading-relaxed">
                            {order.customer_address || order.address}
                          </p>
                          {order.notes && (
                            <div className="pt-1.5 border-t border-neutral-900 mt-1">
                              <span className="text-[10px] text-amber-400 font-bold block">Notes:</span>
                              <span className="text-neutral-400">{order.notes}</span>
                            </div>
                          )}
                        </div>

                        {/* Dishes & Quantities */}
                        <div className="md:col-span-5 bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                            Dishes &amp; Quantity
                          </span>
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {Array.isArray(order.items) && order.items.length > 0 ? (
                              order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-neutral-300">
                                  <span>
                                    <strong className="text-amber-400 font-bold">{item.quantity}x</strong> {item.name}
                                  </span>
                                  <span className="text-neutral-400 font-mono">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-neutral-300">{order.items_summary || 'Standard order items'}</p>
                            )}
                          </div>
                        </div>

                        {/* Financial Total */}
                        <div className="md:col-span-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 flex flex-col justify-center items-end text-right">
                          <span className="text-[10px] uppercase font-bold text-neutral-500 block">Total Amount</span>
                          <span className="text-xl font-black text-amber-400 font-mono">
                            Rs. {Number(order.total_amount || order.total || 0).toLocaleString()} PKR
                          </span>
                          <span className="text-[10px] text-neutral-400">Cash on Delivery</span>
                        </div>
                      </div>

                      {/* Bottom Controls: Requirement 6: "Change Order Status: Pending -> Preparing -> Delivered. The new status is saved in Supabase." */}
                      <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Change Status:</span>
                          <div className="flex items-center gap-1.5">
                            {['Pending', 'Preparing', 'Delivered'].map(statusOption => {
                              const isActive = order.status === statusOption
                              const isUpdating = updatingId === order.id

                              return (
                                <button
                                  key={statusOption}
                                  disabled={isActive || isUpdating}
                                  onClick={() => handleStatusChange(order.id, statusOption)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                                    isActive
                                      ? 'bg-amber-500 text-neutral-950 font-black shadow-sm ring-1 ring-amber-400'
                                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white'
                                  } ${isUpdating ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                  {statusOption === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                                  {statusOption === 'Preparing' && <Clock className="w-3 h-3" />}
                                  <span>{statusOption}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <span className="text-[11px] text-neutral-500">
                          {order._isLocalFallback ? 'Awaiting Supabase table run' : 'Synced with Supabase orders table'}
                        </span>
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}
