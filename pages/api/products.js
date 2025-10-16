const { getPrisma } = require('../../lib/prisma')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const prisma = getPrisma()
      if (!prisma) return res.status(500).json({ error: 'Prisma not initialized' })
      const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json({ products })
    } catch (err) {
      console.error('Error fetching products:', err && err.stack ? err.stack : err)
      return res.status(500).json({ error: 'Failed to fetch products', detail: String(err && err.message ? err.message : err) })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
