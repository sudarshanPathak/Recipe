import Link from 'next/link'

export default function AdminPage() {
  const ok = process.env.ADMIN_PASSWORD ? true : false
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      {!ok && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          Set ADMIN_PASSWORD in environment to protect admin routes.
        </div>
      )}
      <div className="flex gap-3">
        <Link href="/admin/products" className="px-4 py-2 border rounded">Manage Products</Link>
        <Link href="/admin/categories" className="px-4 py-2 border rounded">Manage Categories</Link>
      </div>
    </div>
  )
}

