const fs = require('fs')
const path = require('path')

const SITE_URL = process.env.SITE_URL || 'https://example.com'
const dataPath = path.join(__dirname, '..', 'src', 'data.json')
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt')

const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

const urls = [
  `${SITE_URL}/`,
  ...data.map(p => `${SITE_URL}/posts/${p.id}`)
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}\n</urlset>`

fs.writeFileSync(outPath, xml)

const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
fs.writeFileSync(robotsPath, robots)

console.log('sitemap and robots generated at public/')
