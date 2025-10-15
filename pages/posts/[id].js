import { posts } from '../../src/data'

export default function Post({ post }) {
  if (!post) return <div style={{ padding: 40 }}>文章未找到</div>
  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}

export async function getStaticPaths() {
  return {
    paths: posts.map(p => ({ params: { id: String(p.id) } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = posts.find(p => String(p.id) === params.id) || null
  return { props: { post } }
}
