import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // Use the edge runtime for faster responses

export async function GET() {
  try {
    // Use the public URL for the image
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/opengraph-image.png`;

    // Generate the OpenGraph image
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
            src={imageUrl}
            alt="OpenGraph Image"
            style={{
              width: '1200px', // Full width
              height: '630px', // Full height
              objectFit: 'cover', // Ensure the image covers the entire area
            }}
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