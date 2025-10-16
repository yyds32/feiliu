import Link from 'next/link'
import Image from 'next/image'
import { posts } from '../../src/data'

export default function Visual(){
  return (
    <main>
      <h1>视觉版（Visual）</h1>
      <p>此版本侧重视觉与排版，使用更强的色彩与卡片样式。</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {posts.map(p => (
          <article key={p.id} style={{ width: 300 }} className="card">
            <div style={{ height:140, background:'#f5f7fb', borderRadius:6, marginBottom:8 }} />
            <h3><Link href={`/posts/${p.id}`}>{p.title}</Link></h3>
            <p style={{ color:'#666' }}>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
