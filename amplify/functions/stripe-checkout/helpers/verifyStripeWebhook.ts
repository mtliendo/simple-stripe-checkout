import Stripe from 'stripe'
import { env } from '$amplify/env/stripe-checkout-song'

type Event = {
	headers: {
		'stripe-signature': string
	}
	body: string
}
export const verifyWebhookSig = async (event: Event) => {
	const stripe = new Stripe(env.STRIPE_SECRET)
	const sig = event.headers['stripe-signature']
	try {
		const stripeEvent = stripe.webhooks.constructEvent(
			event.body,
			sig,
			env.STRIPE_WEBHOOK_SECRET
		)
		return stripeEvent
	} catch (err) {
		console.log('uh oh', err)
		throw Error('Invalid signature')
	}
}
