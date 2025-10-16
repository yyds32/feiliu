const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      title: '示例商品 A',
      slug: 'product-a',
      description: '这是示例商品 A 的描述。',
      price: 1999,
      image: '/images/product-a.jpg',
      stock: 10,
    },
    {
      title: '示例商品 B',
      slug: 'product-b',
      description: '这是示例商品 B 的描述。',
      price: 2999,
      image: '/images/product-b.jpg',
      stock: 5,
    },
    {
      title: '示例商品 C',
      slug: 'product-c',
      description: '这是示例商品 C 的描述。',
      price: 499,
      image: '/images/product-c.jpg',
      stock: 25,
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
