"use client"
import { useCart } from '@/store/cart'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [email, setEmail] = useState('')
  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  const handlePlaceOrder = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, items }),
    })
    if (response.ok) {
      clear()
      window.location.href = '/orders/thank-you'
    } else {
      alert('Checkout failed')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="space-y-4 max-w-md">
        <label className="block">
          <span className="block text-sm text-gray-600 mb-1">Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="you@example.com"/>
        </label>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Total: ${(totalCents/100).toFixed(2)}</div>
          <button className="px-6 py-3 bg-black text-white rounded" onClick={handlePlaceOrder} disabled={!email || items.length===0}>Place Order</button>
        </div>
      </div>
    </div>
  )
}

