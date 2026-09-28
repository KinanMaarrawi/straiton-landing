/**
 * Map geometry, ported from design/Desktop 1440 v2.dc.html (logic class).
 * Equirectangular projection with a latitude-corrected x scale. All
 * coordinates are in the map's own viewBox units (606 × 680 / 606 × 720).
 */

export type MapKey = 'hero' | 'arr';
type LonLat = [number, number];

export const MAPS: Record<MapKey, { lon0: number; lat1: number; py: number; W: number; H: number; cl: number }> = {
  hero: { lon0: 53.7, lat1: 28.2, py: 85, W: 606, H: 680, cl: 24.4 },
  arr: { lon0: 67.0, lat1: 22.0, py: 70, W: 606, H: 720, cl: 17.0 },
};

const LAND: Record<MapKey, LonLat[][]> = {
  hero: [
    [[52.5,27.45],[53.5,26.95],[54.3,26.7],[54.9,26.55],[55.6,26.75],[56.1,27.05],[56.3,27.18],[56.9,27.0],[57.3,26.3],[57.6,25.8],[57.77,25.64],[58.5,25.55],[59.5,25.4],[60.5,25.3],[61.6,25.2],[62.5,25.1],[62.5,29.5],[52.5,29.5]],
    [[52.5,24.1],[53.2,24.15],[53.9,24.2],[54.37,24.47],[54.7,24.8],[55.0,25.0],[55.3,25.27],[55.5,25.45],[55.95,25.8],[56.1,26.1],[56.35,26.38],[56.45,26.2],[56.4,25.9],[56.3,25.62],[56.35,25.12],[56.6,24.6],[56.75,24.35],[57.3,23.9],[58.0,23.7],[58.6,23.6],[59.1,23.1],[59.5,22.57],[59.8,22.5],[59.5,22.0],[59.1,21.5],[58.8,20.9],[58.5,20.3],[58.3,19.6],[52.5,19.6]],
  ],
  arr: [
    [[64.5,25.45],[65.5,25.45],[66.6,25.4],[67.0,24.85],[67.3,24.3],[67.6,23.9],[68.2,23.6],[68.6,23.25],[69.3,22.85],[70.2,22.95],[70.6,22.8],[70.0,22.45],[69.1,22.35],[68.97,22.24],[69.6,21.64],[70.37,20.9],[70.98,20.71],[71.6,21.0],[72.15,21.6],[72.4,22.2],[72.6,22.3],[72.65,21.9],[72.8,21.17],[72.83,20.4],[72.75,19.7],[72.84,18.94],[73.0,18.2],[73.3,17.0],[73.5,16.2],[73.8,15.5],[74.1,14.8],[74.4,14.0],[74.6,13.0],[74.85,12.9],[75.2,12.0],[75.6,11.4],[75.9,10.9],[76.2,10.0],[78,9.5],[78,26],[64.5,26]],
  ],
};

/**
 * The real sea lane, abstracted: Dubai Creek (25.27 N, 55.30 E) → Hormuz →
 * Gulf of Oman on the hero map; Arabian Sea → Mumbai (18.94 N, 72.84 E) on
 * the arrival map. Mumbai is the illustrative endpoint only.
 */
const GEO: Record<MapKey, LonLat[]> = {
  hero: [[55.30,25.27],[55.38,25.52],[55.62,25.95],[55.95,26.36],[56.38,26.63],[56.78,26.42],[57.08,25.95],[57.6,25.2],[58.5,24.3],[59.35,23.35],[60.05,22.2],[60.1,20.2]],
  arr: [[68.05,22.0],[68.4,20.9],[69.6,19.9],[71.3,19.25],[72.84,18.94]],
};

function pxLon(k: MapKey) {
  const m = MAPS[k];
  return m.py * Math.cos((m.cl * Math.PI) / 180);
}

export function project(k: MapKey, p: LonLat): [number, number] {
  const m = MAPS[k];
  return [(p[0] - m.lon0) * pxLon(k), (m.lat1 - p[1]) * m.py];
}

/** Route points for a map, in its viewBox units. */
export function routePoints(k: MapKey): Array<[number, number]> {
  return GEO[k].map((p) => project(k, p));
}

function pointInPolygon(p: LonLat, poly: LonLat[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a[1] > p[1] !== b[1] > p[1] && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}

/** Land as a dot grid: 3px dots on an 8px grid, one SVG path. */
export function landDots(k: MapKey): string {
  const m = MAPS[k];
  const px = pxLon(k);
  let d = '';
  for (let y = 4; y < m.H; y += 8) {
    for (let x = 4; x < m.W; x += 8) {
      const p: LonLat = [m.lon0 + x / px, m.lat1 - y / m.py];
      if (LAND[k].some((q) => pointInPolygon(p, q))) d += `M${x - 1.5} ${y}a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0`;
    }
  }
  return d;
}
