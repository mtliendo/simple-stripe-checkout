import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import { env } from '$amplify/env/stripe-checkout-song'
const sesClient = new SESv2Client()

export const sendSESEmailWithAttachment = async (
	fileBuffer: Buffer,
	toEmailAddresses: string[],
	fileContentType: string,
	fileName: string
) => {
	const myEmail = env.FROM_EMAIL_ADDRESS
	const rawMessage = `From: ${myEmail}
To: ${toEmailAddresses.join(', ')}
Subject: Email with MP3 Attachment
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="boundary_string"

--boundary_string
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 7bit

This email has an MP3 attachment.

--boundary_string
Content-Type: ${fileContentType}
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="${fileName}"

${fileBuffer.toString('base64')}
--boundary_string--`

	const sendEmailParams = {
		Content: {
			Raw: {
				Data: Buffer.from(rawMessage),
			},
		},
	}

	const sendEmailCommand = new SendEmailCommand(sendEmailParams)

	try {
		const result = await sesClient.send(sendEmailCommand)
		console.log(`Email sent successfully. Message ID: ${result.MessageId}`)
	} catch (err) {
		console.error('Error sending email:', err)
	}
}
