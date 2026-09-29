import { ImageResponse } from 'next/og';
import { INK_700, NAVY, TEAL, TEAL_700, ogFonts } from './og-mark';

export const alt = 'Straiton: Same sea. Better paperwork. UAE to India business payments, prepared before you fund.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// A course across the card: sets out, holds once in a loop, arrives.
const COURSE =
  'M60 380C180 300 300 300 390 345C430 365 500 360 500 320C500 285 455 280 448 312C442 342 480 360 520 356C600 348 640 300 700 290';

/** Link preview for Slack, LinkedIn, WhatsApp and the like. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#FFFFFF',
          color: NAVY,
          fontFamily: 'Plex',
          position: 'relative',
        }}
      >
        <svg width="760" height="420" viewBox="0 0 760 420" style={{ position: 'absolute', right: 0, bottom: 24 }}>
          <path d={COURSE} fill="none" stroke={TEAL} strokeWidth="6" strokeDasharray="0 15" strokeLinecap="round" />
          <circle cx="700" cy="290" r="13" fill={TEAL} stroke={NAVY} strokeWidth="4" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: TEAL_700 }}>UAE → India business payments</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 28,
              fontFamily: 'Newsreader',
              fontWeight: 300,
              fontSize: 112,
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
            }}
          >
            <span>Same sea.</span>
            <span>Better paperwork.</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 30, fontWeight: 500, color: INK_700, maxWidth: 640 }}>
            Business payments from the UAE to India, prepared before you fund.
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '0.04em' }}>STRAITON</div>
        </div>
        <div style={{ position: 'absolute', top: 70, right: 72, fontSize: 22, fontWeight: 500, color: INK_700 }}>
          Design prototype
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
