const prisma = require('../../lib/prisma')
const Stripe = require('stripe')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { items, email } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  // build line items
  const line_items = items.map((it) => ({
    price_data: {
      currency: 'usd',
      product_data: { name: it.title },
      unit_amount: it.price,
    },
    quantity: it.quantity,
  }))

  try {
    // create pending order locally
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
    const order = await prisma.order.create({
      data: { email, total, status: 'pending' },
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: { orderId: String(order.id) },
    })

    // attach stripeId
    await prisma.order.update({ where: { id: order.id }, data: { stripeId: session.id } })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create checkout' })
  }
}
