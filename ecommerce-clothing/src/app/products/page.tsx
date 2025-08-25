import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

type Props = { searchParams?: { q?: string; category?: string } }

export default async function ProductsPage({ searchParams }: Props) {
  const q = searchParams?.q?.trim() || ''
  const categoryFilter = searchParams?.category || ''
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q ? { title: { contains: q } } : {},
        categoryFilter ? { categoryId: categoryFilter } : {},
      ],
    },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

      <form className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3" action="/products" method="get">
        <input
          type="text"
          name="q"
          placeholder="Search products"
          defaultValue={q}
          className="border rounded px-3 py-2 md:col-span-2"
        />
        <select name="category" defaultValue={categoryFilter} className="border rounded px-3 py-2">
          <option value="">All categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="px-4 py-2 border rounded">Filter</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <Link href={`/products/${p.id}`} key={p.id} className="border rounded-lg overflow-hidden hover:shadow">
            <div className="relative aspect-[4/5] bg-gray-100">
              <Image src={p.imageUrl} alt={p.title} fill className="object-cover"/>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">{p.category.name}</div>
              <div className="font-medium">{p.title}</div>
              <div className="text-gray-700">${(p.priceCents/100).toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

