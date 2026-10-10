import { TARGET_GMAIL } from '../config/supabase'

export async function sendOrderToGmail(order) {
  const itemsText = order.items
    .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} (Rs. ${item.price} each = Rs. ${item.price * item.quantity})`)
    .join('\n')

  const refCode = order.ref_id || (order.id ? (typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : order.id) : 'ZR-' + Date.now().toString().slice(-5))
  const emailSubject = `🍽️ New Order #${refCode} - ${order.name} (Rs. ${order.total.toLocaleString()})`

  const payload = {
    _subject: emailSubject,
    _template: 'table',
    _captcha: 'false',
    _replyto: 'customer@restaurant.com',
    'Order Reference ID': refCode,
    'Restaurant Name': 'Zaika Royale Bistro',
    'Customer Name': order.name,
    'Customer Phone': order.phone,
    'Delivery Address': order.address,
    'Special Cooking Notes': order.notes || 'None',
    'Ordered Dishes': itemsText,
    'Total Dishes Count': order.items.reduce((sum, i) => sum + i.quantity, 0),
    'Food Subtotal': `Rs. ${order.subtotal ? order.subtotal.toLocaleString() : order.total.toLocaleString()} PKR`,
    'Delivery Charges': order.deliveryFee ? `Rs. ${order.deliveryFee} PKR` : 'Free Delivery',
    'Grand Total Amount': `Rs. ${order.total.toLocaleString()} PKR`,
    'Payment Method': 'Cash on Delivery',
    'Order Placed At': new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }) + ' (PKT)',
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_GMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    
    // Check if FormSubmit is waiting for 1-time user email activation
    const isNeedsActivation = data && data.message && (
      data.message.toLowerCase().includes('activation') ||
      data.message.toLowerCase().includes('activate')
    )

    return {
      success: data.success === 'true' || data.success === true,
      needsActivation: Boolean(isNeedsActivation),
      message: data.message || 'Order email dispatched',
      data,
    }
  } catch (err) {
    console.warn('FormSubmit AJAX dispatch issue, attempting standard form POST:', err)
    try {
      const formData = new FormData()
      Object.entries(payload).forEach(([k, v]) => formData.append(k, String(v)))
      await fetch(`https://formsubmit.co/${TARGET_GMAIL}`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
      return {
        success: true,
        needsActivation: false,
        message: 'Order email dispatched via fallback to ' + TARGET_GMAIL,
      }
    } catch (fallbackErr) {
      return {
        success: false,
        needsActivation: false,
        error: fallbackErr.message || 'Email dispatch failed',
      }
    }
  }
}

// Generate direct Gmail Web compose URL with prefilled recipient and receipt
export function getDirectGmailComposeUrl(order) {
  const itemsText = (order.items || [])
    .map((item, idx) => `  ${idx + 1}. ${item.name} (Qty: ${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`)
    .join('\n')

  const subject = encodeURIComponent(`🍽️ New Food Order #${order.id ? (typeof order.id === 'string' && order.id.length > 8 ? order.id.slice(0, 8).toUpperCase() : order.id) : 'ORD-NEW'} - ${order.customer_name || order.name}`)
  const bodyText = `NEW FOOD ORDER RECEIVED AT ZAIKA ROYALE BISTRO
--------------------------------------------------
Customer Name:    ${order.customer_name || order.name}
Phone Number:     ${order.customer_phone || order.phone}
Delivery Address: ${order.customer_address || order.address}
Special Notes:    ${order.notes || 'None'}
Status:           Pending
Time:             ${new Date().toLocaleString()}

ORDERED DISHES:
${itemsText}

--------------------------------------------------
TOTAL AMOUNT:     Rs. ${Number(order.total_amount || order.total).toLocaleString()} PKR
PAYMENT METHOD:   Cash on Delivery
--------------------------------------------------`

  const body = encodeURIComponent(bodyText)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_GMAIL}&su=${subject}&body=${body}`
}

// Gmail search URL to find the activation email from FormSubmit
export function getGmailSearchActivationUrl() {
  return `https://mail.google.com/mail/u/0/#search/formsubmit`
}
