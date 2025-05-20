import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'pablo carvalho | full stack developer & designer'
export const size = {
  width: 1200,
  height: 630,
}

const isProduction = process.env.NODE_ENV === 'production'

const imageUrl = isProduction
  ? 'https://portfolio-2025-seven-iota.vercel.app/images/profile.png'
  : 'http://localhost:3000/images/profile.png'


export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            backgroundImage: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <img
              src={imageUrl}
              alt="pablo carvalho"
              width={200}
              height={200}
              style={{
                borderRadius: '50%',
                marginBottom: '20px',
                border: '4px solid white',
                objectFit: 'cover',
                background: '#222',
              }}
            />
            <div
              style={{
                fontSize: '60px',
                fontWeight: '900',
                color: 'white',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              pablo carvalho
            </div>
            <div
              style={{
                fontSize: '30px',
                fontWeight: '700',
                color: '#888',
                textAlign: 'center',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              fullstack developer & designer
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
} 