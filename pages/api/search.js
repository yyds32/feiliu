import { posts } from '../../src/data'

export default function handler(req, res) {
  const q = (req.query.q || '').toLowerCase().trim()
  if (!q) return res.status(200).json({ results: [] })

  const results = posts.filter(p => (p.title + ' ' + p.content + ' ' + p.excerpt).toLowerCase().includes(q)).map(p => ({ id: p.id, title: p.title, excerpt: p.excerpt }))
  res.status(200).json({ results })
}
