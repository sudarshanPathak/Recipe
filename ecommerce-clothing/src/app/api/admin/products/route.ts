import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const form = await request.formData()
  const method = (form.get('_method') as string) || 'POST'
  if (method === 'DELETE') {
    const id = form.get('id') as string
    await prisma.product.delete({ where: { id } })
    return NextResponse.redirect(new URL('/admin/products', request.url))
  }
  const title = form.get('title') as string
  const priceCents = Number(form.get('priceCents')) || 0
  const imageUrl = form.get('imageUrl') as string
  const description = form.get('description') as string
  const categoryId = form.get('categoryId') as string
  await prisma.product.create({ data: { title, priceCents, imageUrl, description, categoryId, inStock: 100 } })
  return NextResponse.redirect(new URL('/admin/products', request.url))
}

