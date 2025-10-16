import { useCart } from '../context/cart'
import { useState } from 'react'
import fetch from 'isomorphic-unfetch'

export default function CartPage() {
  const { items, remove, clear } = useCart()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    const email = window.prompt('请输入邮箱以接收订单确认（测试）')
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, email }) })
    const data = await res.json()
    setLoading(false)
    if (data.url) {
      window.location.href = data.url
    } else alert('创建结账失败')
  }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <div>
      <h1>购物车</h1>
      {items.length === 0 ? (
        <p>购物车空</p>
      ) : (
        <div>
          {items.map((it) => (
            <div key={it.productId} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
              <div>{it.title}</div>
              <div>数量: {it.quantity} • 单价: {(it.price / 100).toFixed(2)} USD</div>
              <button onClick={() => remove(it.productId)}>移除</button>
            </div>
          ))}
          <h3>总计：{(total/100).toFixed(2)} USD</h3>
          <button onClick={handleCheckout} disabled={loading}>{loading ? '创建中…' : '结算 (Stripe 测试)'} </button>
          <button onClick={clear}>清空</button>
        </div>
      )}
    </div>
  )
}
