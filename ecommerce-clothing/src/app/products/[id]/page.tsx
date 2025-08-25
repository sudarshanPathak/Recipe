import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

type Props = { params: { id: string } }

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  })

  if (!product) return <div>Product not found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
        <Image src={product.imageUrl} alt={product.title} fill className="object-cover"/>
      </div>
      <div>
        <div className="text-sm text-gray-500">{product.category.name}</div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <div className="text-xl mt-2">${(product.priceCents/100).toFixed(2)}</div>
        <p className="text-gray-700 mt-4">{product.description}</p>
        <div className="mt-6">
          <AddToCartButton
            productId={product.id}
            title={product.title}
            priceCents={product.priceCents}
            imageUrl={product.imageUrl}
          />
        </div>
      </div>
    </div>
  )
}

