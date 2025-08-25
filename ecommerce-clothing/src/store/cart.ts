import { create } from 'zustand'

export type CartItem = {
  productId: string
  title: string
  priceCents: number
  imageUrl: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item, qty = 1) => set((state) => {
    const existing = state.items.find(i => i.productId === item.productId)
    if (existing) {
      return {
        items: state.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i)
      }
    }
    return { items: [...state.items, { ...item, quantity: qty }] }
  }),
  remove: (productId) => set((state) => ({ items: state.items.filter(i => i.productId !== productId) })),
  clear: () => set({ items: [] })
}))

