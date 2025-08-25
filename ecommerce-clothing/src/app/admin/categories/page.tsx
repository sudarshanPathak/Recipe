import { prisma } from '@/lib/prisma'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <form action="/api/admin/categories" method="post" className="flex gap-2">
        <input name="name" placeholder="Name" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="slug" className="border rounded px-3 py-2" required />
        <button className="px-4 py-2 bg-black text-white rounded">Create</button>
      </form>
      <ul className="space-y-2">
        {categories.map(c => (
          <li key={c.id} className="flex items-center justify-between border rounded p-2">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-600">{c.slug}</div>
            </div>
            <form action="/api/admin/categories" method="post">
              <input type="hidden" name="id" value={c.id} />
              <input type="hidden" name="_method" value="DELETE" />
              <button className="text-sm text-red-600">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

