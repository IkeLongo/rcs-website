import { ImageResponse } from 'next/og';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import React from 'react';

export const runtime = 'edge'; // Use the edge runtime for faster responses

export async function GET() {
  try {
    // Resolve the path to the image file
    const imagePath = join(process.cwd(), 'public/opengraph-image.png'); // Ensure the file is in the 'public' directory
    const logoData = await readFile(imagePath);

    // Generate the OpenGraph image
    return new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: '1200px',
            height: '630px',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#333',
          },
        },
        React.createElement('img', {
          src: `data:image/png;base64,${Buffer.from(logoData).toString('base64')}`,
          alt: 'OpenGraph Image',
          style: { height: '100px', marginRight: '20px' },
        }),
        'RiverCity Creatives'
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