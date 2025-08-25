"use client"
import { useCart } from '@/store/cart'
import Image from 'next/image'

export default function CartPage() {
  const { items, remove, clear } = useCart()
  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map(i => (
            <div key={i.productId} className="flex gap-4 items-center border rounded p-3">
              <div className="relative w-20 h-24 bg-gray-100 rounded overflow-hidden">
                <Image src={i.imageUrl} alt={i.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-gray-700">${(i.priceCents/100).toFixed(2)} × {i.quantity}</div>
              </div>
              <button className="text-sm text-red-600" onClick={() => remove(i.productId)}>Remove</button>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t mt-2">
            <div className="text-lg font-semibold">Total: ${(totalCents/100).toFixed(2)}</div>
            <div className="space-x-2">
              <button className="px-4 py-2" onClick={clear}>Clear</button>
              <a href="/checkout" className="px-4 py-2 bg-black text-white rounded">Checkout</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

