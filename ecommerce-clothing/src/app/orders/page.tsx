import { prisma } from '@/lib/prisma'

type Props = { searchParams?: { email?: string } }

export default async function OrdersPage({ searchParams }: Props) {
  const email = (searchParams?.email || '').trim()
  const orders = email
    ? await prisma.order.findMany({
        where: { emailSnapshot: email },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
      })
    : []

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <form className="flex gap-2" method="get" action="/orders">
        <input name="email" placeholder="Enter your email" defaultValue={email} className="border rounded px-3 py-2" />
        <button className="px-4 py-2 border rounded">Lookup</button>
      </form>
      {email && orders.length === 0 && (
        <div className="text-gray-600">No orders found.</div>
      )}
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Order #{o.id.slice(0,8)}</div>
                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()} · ${(o.totalCents/100).toFixed(2)} · {o.status}</div>
              </div>
            </div>
            <ul className="mt-3 text-sm text-gray-700 list-disc pl-5">
              {o.items.map(item => (
                <li key={item.id}>{item.product.title} × {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

