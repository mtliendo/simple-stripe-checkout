import { defineBackend } from '@aws-amplify/backend'
import { storage } from './storage/resource'
import { stripeCheckoutSongFunc } from './functions/stripe-checkout/resource'
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
	stripeCheckoutSongFunc,
	storage,
})

const stripeWebhookUrlObj =
	backend.stripeCheckoutSongFunc.resources.lambda.addFunctionUrl({
		authType: FunctionUrlAuthType.NONE,
	})

backend.addOutput({
	custom: {
		stripeCheckoutSongFunc: stripeWebhookUrlObj.url,
	},
})

backend.stripeCheckoutSongFunc.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['ses:SendEmail', 'ses:SendRawEmail'],
		resources: ['*'],
	})
)
