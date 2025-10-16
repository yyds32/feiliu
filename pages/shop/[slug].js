import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/cart'

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  useEffect(() => {
    if (!slug) return
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => d.products.find((p) => p.slug === slug))
      .then(setProduct)
  }, [slug])

  if (!product) return <div>加载中…</div>

  function handleAdd() {
    add({ productId: product.id, title: product.title, price: product.price, quantity: qty })
    alert('已加入购物车')
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>价格：{(product.price / 100).toFixed(2)} USD</p>
      <div>
        <label>数量</label>
        <input type="number" value={qty} min={1} onChange={(e) => setQty(Number(e.target.value))} />
      </div>
      <button onClick={handleAdd}>加入购物车</button>
    </div>
  )
}
