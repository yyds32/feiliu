import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Shop() {
  const { data } = useSWR('/api/products', fetcher)
  const products = data?.products || []

  return (
    <div>
      <h1>商品目录</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        {products.map((p) => (
          <Link key={p.id} href={`/shop/${p.slug}`}>
            <a style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
              <h3>{p.title}</h3>
              <p>{(p.price / 100).toFixed(2)} USD</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
