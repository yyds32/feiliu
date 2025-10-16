import { useRouter } from 'next/router'

export default function Success(){
  const router = useRouter()
  const { session_id } = router.query

  return (
    <div>
      <h1>支付/下单成功（测试）</h1>
      <p>感谢，订单已创建。Stripe session: {session_id}</p>
      <p>注意：在测试模式下，请使用 Stripe Dashboard 查看支付状态或配置 webhook 来更新订单。</p>
    </div>
  )
}
