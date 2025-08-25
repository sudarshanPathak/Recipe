// Simple CommonJS seed script for Node compatibility
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const men = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: { name: 'Men', slug: 'men' },
  })
  const women = await prisma.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: { name: 'Women', slug: 'women' },
  })
  const accessories = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: { name: 'Accessories', slug: 'accessories' },
  })

  await prisma.product.createMany({
    data: [
      {
        title: 'Classic Tee',
        description: 'Soft cotton tee for everyday wear.',
        priceCents: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1520975922203-b478c6b1285d?q=80&w=1200&auto=format&fit=crop',
        inStock: 50,
        categoryId: men.id,
      },
      {
        title: 'Slim Fit Jeans',
        description: 'Comfortable stretch denim with a modern cut.',
        priceCents: 6900,
        imageUrl: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1200&auto=format&fit=crop',
        inStock: 40,
        categoryId: men.id,
      },
      {
        title: 'Silk Blouse',
        description: 'Elegant blouse with a relaxed silhouette.',
        priceCents: 7900,
        imageUrl: 'https://images.unsplash.com/photo-1503342394125-0ce8ef8e3e2f?q=80&w=1200&auto=format&fit=crop',
        inStock: 30,
        categoryId: women.id,
      },
      {
        title: 'Midi Skirt',
        description: 'Flowy skirt that pairs with everything.',
        priceCents: 5400,
        imageUrl: 'https://images.unsplash.com/photo-1520975729984-4c0dc4d47549?q=80&w=1200&auto=format&fit=crop',
        inStock: 35,
        categoryId: women.id,
      },
      {
        title: 'Leather Belt',
        description: 'Full-grain leather belt with matte buckle.',
        priceCents: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1584380931289-9b6773e7e4f0?q=80&w=1200&auto=format&fit=crop',
        inStock: 80,
        categoryId: accessories.id,
      },
      {
        title: 'Wool Scarf',
        description: 'Cozy scarf for colder days.',
        priceCents: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop',
        inStock: 60,
        categoryId: accessories.id,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

