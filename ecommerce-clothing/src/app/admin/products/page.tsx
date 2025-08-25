import { prisma } from '@/lib/prisma'

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ])
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <form action="/api/admin/products" method="post" className="grid md:grid-cols-5 gap-2">
        <input name="title" placeholder="Title" className="border rounded px-3 py-2" required />
        <input name="priceCents" placeholder="Price (cents)" type="number" className="border rounded px-3 py-2" required />
        <input name="imageUrl" placeholder="Image URL" className="border rounded px-3 py-2" required />
        <select name="categoryId" className="border rounded px-3 py-2" required>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="px-4 py-2 bg-black text-white rounded">Create</button>
        <textarea name="description" placeholder="Description" className="md:col-span-5 border rounded px-3 py-2" required />
      </form>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600">{p.category.name} · ${(p.priceCents/100).toFixed(2)}</div>
            </div>
            <form action="/api/admin/products" method="post">
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="_method" value="DELETE" />
              <button className="text-sm text-red-600">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

