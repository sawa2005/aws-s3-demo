import s3Client from '../../lib/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req, res) {
  const { fileContent, fileName } = await req.json();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: Buffer.from(fileContent, 'base64'),
    ContentType: 'image/jpeg', // Adjust content type as needed
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return new Response(JSON.stringify({ message: 'File uploaded successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(JSON.stringify({ error: 'Error uploading file' }), { status: 500 });
  }
}
