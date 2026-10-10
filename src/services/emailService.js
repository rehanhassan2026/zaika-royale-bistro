import { TARGET_GMAIL } from '../config/supabase'

export async function sendOrderToGmail(order) {
  const itemsText = order.items
    .map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} (Rs. ${item.price} each = Rs. ${item.price * item.quantity})`)
    .join('\n')

  const emailSubject = `🍽️ New Order #${order.id ? order.id.slice(0, 8) : 'ORD-' + Date.now().toString().slice(-5)} - ${order.name} (Rs. ${order.total.toLocaleString()})`

  const payload = {
    _subject: emailSubject,
    _template: 'table',
    _captcha: 'false',
    _replyto: 'customer@restaurant.com',
    'Restaurant Name': 'Zaika Royale Bistro',
    'Customer Name': order.name,
    'Customer Phone': order.phone,
    'Delivery Address': order.address,
    'Ordered Dishes & Quantity': itemsText,
    'Total Dishes Ordered': order.items.reduce((sum, i) => sum + i.quantity, 0),
    'Order Subtotal': `Rs. ${order.subtotal ? order.subtotal.toLocaleString() : order.total.toLocaleString()}`,
    'Delivery Fee': order.deliveryFee ? `Rs. ${order.deliveryFee}` : 'Free Delivery',
    'Grand Total Amount': `Rs. ${order.total.toLocaleString()} PKR`,
    'Order Status': 'Pending',
    'Customer Notes': order.notes || 'None',
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
    return {
      success: true,
      message: 'Order email dispatched to ' + TARGET_GMAIL,
      data,
    }
  } catch (err) {
    console.warn('Primary email dispatch issue, falling back to backup formsubmit endpoint:', err)
    // Fallback: try urlencoded form submit
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
        message: 'Order email dispatched via fallback to ' + TARGET_GMAIL,
      }
    } catch (fallbackErr) {
      return {
        success: false,
        error: fallbackErr.message || 'Email dispatch failed',
      }
    }
  }
}

// Generate direct Gmail Web compose URL for 1-click verification or immediate screenshot
export function getDirectGmailComposeUrl(order) {
  const itemsText = order.items
    .map((item, idx) => `  ${idx + 1}. ${item.name} (Qty: ${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`)
    .join('\n')

  const subject = encodeURIComponent(`🍽️ New Food Order #${order.id ? order.id.slice(0, 8) : 'ORD-NEW'} - ${order.name}`)
  const bodyText = `NEW FOOD ORDER RECEIVED AT ZAIKA ROYALE BISTRO
--------------------------------------------------
Customer Name:    ${order.name}
Phone Number:     ${order.phone}
Delivery Address: ${order.address}
Special Notes:    ${order.notes || 'None'}
Status:           Pending
Time:             ${new Date().toLocaleString()}

ORDERED DISHES:
${itemsText}

--------------------------------------------------
TOTAL AMOUNT:     Rs. ${order.total.toLocaleString()} PKR
PAYMENT METHOD:   Cash on Delivery
--------------------------------------------------`

  const body = encodeURIComponent(bodyText)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_GMAIL}&su=${subject}&body=${body}`
}

