import { ImageResponse } from 'next/og';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

export const runtime = 'edge'; // Use the edge runtime for faster responses

export default async function handler() {
  try {
    const imagePath = join(process.cwd(), 'app/opengraph-image.png');
    const logoData = await readFile(imagePath);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: '1200px',
            height: '630px',
          }}
        >
          <img
            src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
            alt="OpenGraph Image"
            style={{ height: '100px' }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    return new Response('Failed to generate OpenGraph image', { status: 500 });
  }
}