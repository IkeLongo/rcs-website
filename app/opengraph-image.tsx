import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
 
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'app/opengraph-image.png'));
  const base64Logo = Buffer.from(logoData).toString('base64');
  const logoSrc = `data:image/png;base64,${base64Logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoSrc} height="100" />
      </div>
    )
  );
}