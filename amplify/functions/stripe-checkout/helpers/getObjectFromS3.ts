import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import { S3Client } from '@aws-sdk/client-s3'
const s3Client = new S3Client()

export async function getObjectFromS3({
	bucketName,
	objKey,
}: {
	bucketName: string
	objKey: string
}) {
	let res: GetObjectCommandOutput | undefined
	try {
		res = await s3Client.send(
			new GetObjectCommand({ Bucket: bucketName, Key: objKey })
		)
	} catch (e) {
		console.log(e)
		console.log('error getting object', e)
	}

	return res
}
