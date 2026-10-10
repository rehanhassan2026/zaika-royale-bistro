import { supabase } from '../config/supabase'

const LOCAL_STORAGE_KEY = 'zaika_orders_cache_v1'

function getLocalOrders() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Error reading localStorage orders:', e)
    return []
  }
}

function saveLocalOrders(orders) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders))
  } catch (e) {
    console.error('Error saving localStorage orders:', e)
  }
}

export async function createOrder(orderPayload) {
  const itemsSummary = orderPayload.items
    .map(item => `${item.quantity}x ${item.name} (Rs. ${item.price})`)
    .join(', ')

  const newOrder = {
    customer_name: orderPayload.name.trim(),
    customer_phone: orderPayload.phone.trim(),
    customer_address: orderPayload.address.trim(),
    items: orderPayload.items,
    items_summary: itemsSummary,
    total_amount: Number(orderPayload.total),
    status: 'Pending', // Requirement: A new order has the status Pending
    notes: orderPayload.notes ? orderPayload.notes.trim() : '',
    payment_method: 'Cash on Delivery',
  }

  let supabaseOrder = null
  let supabaseError = null

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])
      .select()
      .single()

    if (error) {
      console.warn('Supabase insert warning:', error.message)
      supabaseError = error
    } else {
      supabaseOrder = data
    }
  } catch (err) {
    console.warn('Supabase insert network exception:', err)
    supabaseError = err
  }

  // Generate fallback record if Supabase is awaiting table setup
  const localRecord = supabaseOrder || {
    id: 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6),
    created_at: new Date().toISOString(),
    ...newOrder,
    _isLocalFallback: Boolean(supabaseError),
  }

  // Update localStorage cache
  const existing = getLocalOrders()
  saveLocalOrders([localRecord, ...existing.filter(o => o.id !== localRecord.id)])

  return {
    order: localRecord,
    savedInSupabase: !supabaseError,
    supabaseError: supabaseError ? supabaseError.message || 'Table not found or RLS policy required' : null,
  }
}

export async function getAllOrders() {
  let supabaseOrders = []
  let supabaseError = null

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      supabaseError = error
    } else if (data) {
      supabaseOrders = data
    }
  } catch (err) {
    supabaseError = err
  }

  const localOrders = getLocalOrders()

  if (supabaseOrders && supabaseOrders.length > 0) {
    // Save to local cache as sync
    saveLocalOrders(supabaseOrders)
    return {
      orders: supabaseOrders,
      source: 'supabase',
      error: null,
    }
  }

  return {
    orders: localOrders,
    source: supabaseError ? 'local_cache' : 'supabase_empty',
    error: supabaseError ? supabaseError.message || 'Could not query Supabase orders table' : null,
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  let supabaseUpdated = false
  let supabaseError = null

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()

    if (error) {
      supabaseError = error
    } else {
      supabaseUpdated = true
    }
  } catch (err) {
    supabaseError = err
  }

  // Always update local cache so UI is instantaneous and persists
  const current = getLocalOrders()
  const updated = current.map(item => {
    if (item.id === orderId) {
      return { ...item, status: newStatus }
    }
    return item
  })
  saveLocalOrders(updated)

  return {
    success: true,
    supabaseUpdated,
    error: supabaseError ? supabaseError.message : null,
  }
}

