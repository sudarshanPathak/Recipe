import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const form = await request.formData()
  const method = (form.get('_method') as string) || 'POST'
  if (method === 'DELETE') {
    const id = form.get('id') as string
    await prisma.category.delete({ where: { id } })
    return NextResponse.redirect(new URL('/admin/categories', request.url))
  }
  const name = form.get('name') as string
  const slug = form.get('slug') as string
  await prisma.category.create({ data: { name, slug } })
  return NextResponse.redirect(new URL('/admin/categories', request.url))
}

