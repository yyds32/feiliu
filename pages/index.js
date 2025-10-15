import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
  const [q, setQ] = useState('')
  const { data } = useSWR(q ? `/api/search?q=${encodeURIComponent(q)}` : null, fetcher)

  return (
    <main>
      <h1>示例站点</h1>
      <p>这是一个基于 Next.js 的示例站点骨架，包含站内搜索示例。</p>

      <div style={{ margin: '20px 0' }}>
        <input className="search-input" value={q} onChange={e => setQ(e.target.value)} placeholder="搜索示例内容" />
      </div>

      {data ? (
        <div>
          <h2>搜索结果</h2>
          {data.results.length ? data.results.map(item => (
            <article key={item.id} className="card" style={{ marginBottom: 12 }}>
              <h3><Link href={`/posts/${item.id}`}>{item.title}</Link></h3>
              <p>{item.excerpt}</p>
            </article>
          )) : <p>无结果</p>}
        </div>
      ) : (
        <div>
          <h2>文章列表</h2>
          <ul>
            <li><Link href="/posts/1">示例文章一</Link></li>
            <li><Link href="/posts/2">示例文章二</Link></li>
            <li><Link href="/posts/3">示例文章三</Link></li>
          </ul>
        </div>
      )}

    </main>
  )
}
