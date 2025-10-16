import { buffer } from 'micro'
const Stripe = require('stripe')
const prisma = require('../../../lib/prisma')

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)
  let event
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.orderId
    if (orderId) {
      await prisma.order.update({ where: { id: Number(orderId) }, data: { status: 'paid' } })
    }
  }

  res.json({ received: true })
}
