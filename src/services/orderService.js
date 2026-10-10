import { supabase } from '../config/supabase'

const LOCAL_STORAGE_KEY = 'zaika_orders_cache_v1'

export function getLocalOrders() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Error reading localStorage orders:', e)
    return []
  }
}

export function saveLocalOrders(orders) {
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

  // Generate a clean 5-digit alphanumeric Reference ID e.g. ZR-84291
  const refCode = 'ZR-' + Math.floor(10000 + Math.random() * 90000)

  // Append Ref code to notes for easy querying in Supabase
  const notesWithRef = orderPayload.notes
    ? `${orderPayload.notes.trim()} [Ref: ${refCode}]`
    : `[Ref: ${refCode}]`

  const newOrder = {
    customer_name: orderPayload.name.trim(),
    customer_phone: orderPayload.phone.trim(),
    customer_address: orderPayload.address.trim(),
    items: orderPayload.items,
    items_summary: itemsSummary,
    total_amount: Number(orderPayload.total),
    status: 'Pending',
    notes: notesWithRef,
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
  const localRecord = {
    ...(supabaseOrder || {}),
    id: supabaseOrder?.id || 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6),
    ref_id: refCode,
    created_at: supabaseOrder?.created_at || new Date().toISOString(),
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

// Track an order by Ref ID, UUID, short ID, or customer phone number
export async function trackOrder(query) {
  if (!query || !query.trim()) return null
  const clean = query.trim()
  const cleanUpper = clean.toUpperCase()

  const localOrders = getLocalOrders()
  const localMatch = localOrders.find(o => {
    const refMatch = o.ref_id && o.ref_id.toUpperCase() === cleanUpper
    const idMatch = o.id && (o.id.toLowerCase() === clean.toLowerCase() || o.id.slice(0, 8).toLowerCase() === clean.toLowerCase())
    const notesMatch = o.notes && o.notes.toUpperCase().includes(cleanUpper)
    const phoneClean = o.customer_phone ? o.customer_phone.replace(/\D/g, '') : ''
    const queryDigits = clean.replace(/\D/g, '')
    const phoneMatch = queryDigits.length >= 7 && phoneClean.includes(queryDigits)
    return refMatch || idMatch || notesMatch || phoneMatch
  })

  // Helper to attach ref_id if missing
  const enrichOrder = (ord) => {
    if (!ord) return ord
    let ref = ord.ref_id
    if (!ref && ord.notes) {
      const match = ord.notes.match(/\[Ref:\s*([A-Za-z0-9-]+)\]/i)
      if (match && match[1]) ref = match[1]
    }
    if (!ref) {
      ref = ord.id && ord.id.length > 8 ? 'ZR-' + ord.id.slice(0, 5).toUpperCase() : ord.id || 'ZR-ORDER'
    }
    return { ...ord, ref_id: ref }
  }

  // 1. If local match exists, attempt to pull latest live status from Supabase
  if (localMatch && localMatch.id && !localMatch.id.startsWith('local-')) {
    try {
      const { data: remoteData } = await supabase
        .from('orders')
        .select('*')
        .eq('id', localMatch.id)
        .maybeSingle()

      if (remoteData) {
        const enriched = enrichOrder({ ...localMatch, ...remoteData })
        // Update local cache with latest status from database
        const updated = localOrders.map(o => (o.id === enriched.id ? enriched : o))
        saveLocalOrders(updated)
        return enriched
      }
    } catch (err) {
      console.warn('Supabase fetch by ID error:', err)
    }
  }

  // 2. Query Supabase directly by UUID or search pattern
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clean)
    if (isUuid) {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('id', clean)
        .maybeSingle()
      if (data) {
        return enrichOrder(data)
      }
    }

    // Try search in Supabase by notes (containing Ref ID) or customer phone
    const { data: searchResults } = await supabase
      .from('orders')
      .select('*')
      .or(`notes.ilike.%${clean}%,customer_phone.ilike.%${clean}%`)
      .order('created_at', { ascending: false })
      .limit(1)

    if (searchResults && searchResults.length > 0) {
      const enriched = enrichOrder(searchResults[0])
      // cache locally
      saveLocalOrders([enriched, ...localOrders.filter(o => o.id !== enriched.id)])
      return enriched
    }
  } catch (err) {
    console.warn('Supabase query error in trackOrder:', err)
  }

  return localMatch ? enrichOrder(localMatch) : null
}
