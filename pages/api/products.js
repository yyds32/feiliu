const { getPrisma } = require('../../lib/prisma')

// Static fallback products (kept in sync with prisma/seed.js)
const STATIC_PRODUCTS = [
  {
    id: 1,
    title: '示例商品 A',
    slug: 'sample-product-a',
    description: '这是示例商品 A 的描述。',
    price: 1999,
    image: '/images/sample-a.jpg',
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: '示例商品 B',
    slug: 'sample-product-b',
    description: '这是示例商品 B 的描述。',
    price: 2999,
    image: '/images/sample-b.jpg',
    stock: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: '示例商品 C',
    slug: 'sample-product-c',
    description: '这是示例商品 C 的描述。',
    price: 3999,
    image: '/images/sample-c.jpg',
    stock: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const prisma = getPrisma()

    if (!prisma) {
      // Prisma isn't available in this runtime (common on serverless with sqlite).
      // Return a static fallback so the site remains functional while we fix DB.
      console.warn('Prisma not initialized — returning static fallback products')
      return res.status(200).json({ products: STATIC_PRODUCTS })
    }

    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json({ products })
  } catch (err) {
    console.error('Error fetching products:', err && err.stack ? err.stack : err)
    // If Prisma threw during runtime initialization, fall back to static data
    try {
      return res.status(200).json({ products: STATIC_PRODUCTS })
    } catch (fallbackErr) {
      return res.status(500).json({ error: 'Failed to fetch products', detail: String(err && err.message ? err.message : err) })
    }
  }
}
