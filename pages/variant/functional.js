import Link from 'next/link'
import { posts } from '../../src/data'

export default function Functional() {
  return (
    <main>
      <h1>功能版（Functional）</h1>
      <p>此版本侧重功能性：快速搜索、文章列表与清晰信息层级。</p>

      <section className="card">
        <h2>站内搜索（示例）</h2>
        <p>输入关键字后会返回匹配的文章（前端示例）。</p>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>文章</h2>
        <ul>
          {posts.map(p => (
            <li key={p.id}><Link href={`/posts/${p.id}`}>{p.title}</Link></li>
          ))}
        </ul>
      </section>
    </main>
  )
}
