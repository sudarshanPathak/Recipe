import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Item = {
  productId: string
  title: string
  priceCents: number
  imageUrl: string
  quantity: number
}

export async function POST(request: Request) {
  const { email, items } = await request.json() as { email?: string, items?: Item[] }
  if (!email || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Validate products and compute totals
  const productIds = items.map(i => i.productId)
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } })
  const productMap = new Map(products.map(p => [p.id, p]))
  let totalCents = 0
  for (const i of items) {
    const p = productMap.get(i.productId)
    if (!p) return NextResponse.json({ error: 'Product not found' }, { status: 400 })
    totalCents += p.priceCents * i.quantity
  }

  const order = await prisma.order.create({
    data: {
      emailSnapshot: email,
      totalCents,
      status: 'PAID',
      items: {
        create: items.map(i => ({
          productId: i.productId,
          unitPriceCents: productMap.get(i.productId)!.priceCents,
          quantity: i.quantity,
        }))
      }
    },
    include: { items: true }
  })

  return NextResponse.json({ orderId: order.id })
}

