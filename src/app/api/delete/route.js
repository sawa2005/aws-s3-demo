import s3Client from '../../lib/s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req, res) {
  const { fileName } = await req.json();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
    return new Response(JSON.stringify({ message: 'File deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response(JSON.stringify({ error: 'Error deleting file' }), { status: 500 });
  }
}