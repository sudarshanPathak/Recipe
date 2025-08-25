"use client"
import { useCart } from '@/store/cart'
import { useRouter } from 'next/navigation'

type Props = {
  productId: string
  title: string
  priceCents: number
  imageUrl: string
  redirectToCart?: boolean
}

export default function AddToCartButton({ productId, title, priceCents, imageUrl, redirectToCart = true }: Props) {
  const add = useCart(s => s.add)
  const router = useRouter()
  return (
    <button
      className="px-6 py-3 bg-black text-white rounded-md"
      onClick={() => {
        add({ productId, title, priceCents, imageUrl })
        if (redirectToCart) router.push('/cart')
      }}
    >
      Add to Cart
    </button>
  )
}

