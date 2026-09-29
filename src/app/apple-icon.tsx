import { ImageResponse } from 'next/og';
import { RouteMark } from './og-mark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon (iOS): the route mark, full bleed. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <RouteMark size={180} />
      </div>
    ),
    size,
  );
}
