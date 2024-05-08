import { defineFunction, secret } from '@aws-amplify/backend'

export const stripeCheckoutSongFunc = defineFunction({
	name: 'stripe-checkout-song',
	entry: './main.ts',
	environment: {
		STRIPE_SECRET: secret('stripe-secret'),
		STRIPE_WEBHOOK_SECRET: secret('stripe-webhook'),
		SONG_KEY: 'products/amplify-song.mp3',
		FROM_EMAIL_ADDRESS: 'mtliendo@focusotter.com',
	},
})
