import { verifyWebhookSig } from './helpers/verifyStripeWebhook'
import { env } from '$amplify/env/stripe-checkout-song'
import { getObjectFromS3 } from './helpers/getObjectFromS3'
import { sendSESEmailWithAttachment } from './helpers/sendSESEmailWithAttachment'

const mainFlow = async (customerEmail: string | null | undefined) => {
	if (!customerEmail) throw new Error('Stripe customer email not found')

	const song = await getObjectFromS3({
		bucketName: env.AMPLIFY_STRIPE_SONG_CHECKOUT_BUCKET_NAME,
		objKey: env.SONG_KEY,
	})
	if (!song?.Body) throw new Error('Song not found')

	const contentType = song.ContentType!
	const fileByteArray = await song.Body?.transformToByteArray()
	const fileBuffer = Buffer.from(fileByteArray)
	await sendSESEmailWithAttachment(
		fileBuffer,
		[customerEmail, 'mtliendo@focusotter.com'],
		contentType,
		'mySong.mp3'
	)
}

export const handler = async (event: any) => {
	const stripeEvent = await verifyWebhookSig(event)
	switch (stripeEvent.type) {
		case 'checkout.session.completed':
			await mainFlow(stripeEvent.data.object.customer_details?.email)
	}
	return 'Hello, World!'
}
