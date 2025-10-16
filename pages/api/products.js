const prisma = require('../../lib/prisma')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    res.status(200).json({ products })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
