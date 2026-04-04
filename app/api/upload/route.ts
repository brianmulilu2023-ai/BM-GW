import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const stream = Readable.from(buffer);

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'portfolio' },
    (error, result) => {
      if (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }
      return NextResponse.json({ url: result?.secure_url });
    }
  );

  stream.pipe(uploadStream);
}