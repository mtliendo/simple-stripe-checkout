import { defineStorage } from '@aws-amplify/backend'
import { stripeCheckoutSongFunc } from '../functions/stripe-checkout/resource'

export const storage = defineStorage({
	name: 'amplifyStripeSongCheckout',
	access: (allow) => ({
		'products/*': [allow.resource(stripeCheckoutSongFunc).to(['read'])],
	}),
})
