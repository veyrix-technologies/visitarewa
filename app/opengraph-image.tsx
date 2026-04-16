import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Visit Arewa | Your Journey Into the Heart of Nigeria';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // Image container
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020402', // Your dark footer color
          backgroundImage: 'radial-gradient(circle at 25px 25px, #14532d 2%, transparent 0%), radial-gradient(circle at 75px 75px, #14532d 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background "Glow" Effect */}
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
            }}
        />

        {/* The Arewa Knot (Simplified SVG for OG) */}
        <div style={{ display: 'flex', marginBottom: 20 }}>
            <svg
                width="120"
                height="120"
                viewBox="0 0 100 100"
                fill="none"
                stroke="#22c55e" // Green-500
                strokeWidth="2"
            >
                <path d="M50 2 Q 55 45 98 50 Q 55 55 50 98 Q 45 55 2 50 Q 45 45 50 2 Z" fill="rgba(34,197,94,0.1)"/>
                <path d="M20 20 H80 V80 H20 Z" stroke="#22c55e" strokeWidth="2" />
            </svg>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            textShadow: '0 0 40px rgba(34,197,94,0.6)', // Neon Glow
          }}
        >
          VISIT AREWA
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#86efac', // Green-300
            marginTop: 20,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
         Your Journey Into the Heart of Nigeria
        </div>

        {/* Footer / Branding */}
        <div
            style={{
                position: 'absolute',
                bottom: 40,
                fontSize: 18,
                color: '#4b5563', // Gray-600
                display: 'flex',
                alignItems: 'center',
                gap: 10,
            }}
        >
            <span>Powered by Veyrix Technologies</span>
            <div style={{ width: 6, height: 6, backgroundColor: '#22c55e', borderRadius: '50%' }} />
            <span>Abuja, Nigeria</span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}