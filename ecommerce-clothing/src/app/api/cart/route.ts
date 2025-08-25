import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const formData = await request.formData()
  const productId = formData.get('productId') as string
  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 })
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.redirect(new URL('/cart', request.url))
}

