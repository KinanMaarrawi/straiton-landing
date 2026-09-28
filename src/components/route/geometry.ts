/**
 * Route geometry, ported from the reference frames' compute() logic
 * (design/Desktop 1440 v2.dc.html and design/Mobile 390.dc.html).
 * Pure functions: give them measured rects, get back an SVG path.
 */
import { MAPS, routePoints } from '@/lib/geo';

export type Pt = [number, number];
type Loop = { loop: true; x: number; y: number; r: number; v: number; dir: 1 | -1 };
type ChainItem = Pt | Loop;

export type Box = { top: number; bottom: number; left: number; width: number; height: number };

export type WaypointSpec = { n: string; label: string; x: number; y: number };

export type RouteShape = {
  d: string;
  start: Pt;
  end: Pt;
  wps: WaypointSpec[];
  /** Length along the path where the sailed course should rest at page load. */
  loadCutY: number;
};

const f = (n: number) => n.toFixed(1);

/** Catmull-Rom through pts, as cubic Béziers (frame's cr()). */
function catmullRom(pts: Pt[], pre: Pt, post: Pt): string {
  const P = [pre, ...pts, post];
  let d = '';
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Vertical-tangent curves between chain points, with full-circle holding loops (frame's chain loop). */
function chainPath(chain: ChainItem[]): string {
  let d = '';
  let a = chain[0] as Pt;
  for (let i = 1; i < chain.length; i++) {
    const c = chain[i];
    const b: Pt = 'loop' in c ? [c.x, c.y] : c;
    const k = (b[1] - a[1]) * 0.5;
    d += `C${f(a[0])} ${f(a[1] + k)} ${f(b[0])} ${f(b[1] - k)} ${f(b[0])} ${f(b[1])}`;
    if ('loop' in c) {
      const cx = c.x + c.dir * c.r;
      for (let j = 1; j <= 64; j++) {
        const t = -Math.PI / 2 + (j / 64) * 2 * Math.PI;
        d += `L${f(cx + c.dir * c.r * Math.sin(t))} ${f(c.y + c.v * (t + Math.PI / 2) + c.r * Math.cos(t))}`;
      }
      a = [c.x, c.y + 2 * Math.PI * c.v];
    } else a = b;
  }
  return d;
}

export type DesktopInput = {
  vw: number;
  /** Section inner container (12-col grid) left edge and width. */
  containerLeft: number;
  containerWidth: number;
  heroMap: Box;
  arrMap: Box;
  runs: Record<'why' | 'share' | 'assess' | 'complete' | 'track' | 'support' | 'faq', Box>;
  wpY: Record<'01' | '02' | '03' | '04', number>;
  labels: Record<'01' | '02' | '03' | '04', string>;
};

/**
 * Desktop: frame x-values were authored at 1440 (container 120–1320).
 * Left-lane values (0–520) scale into [0, content start of left-lane
 * sections]; right-lane values (896–1440) into [content end, viewport].
 */
export function desktopRoute(inp: DesktopInput): RouteShape {
  const { vw, containerLeft: cl, containerWidth: cw } = inp;
  const gutter = 24;
  const col = (cw - 11 * gutter) / 12;
  const L1 = cl + 4 * (col + gutter);
  const R0 = cl + 8 * col + 7 * gutter;
  const X = (x: number) => (x < 720 ? (x * L1) / 520 : R0 + ((x - 896) * (vw - R0)) / (1440 - 896));
  // Waypoint labels sit to the right of the mark; keep them inside the viewport.
  const XW = (x: number) => (x < 720 ? X(x) : Math.min(X(x), vw - 190));

  const place = (k: 'hero' | 'arr', b: Box): Pt[] => {
    const s = b.width / MAPS[k].W;
    return routePoints(k).map(([x, y]) => [b.left + x * s, b.top + y * s]);
  };
  const H = place('hero', inp.heroMap);
  const A = place('arr', inp.arrMap);
  H[H.length - 1][1] = inp.heroMap.bottom;
  A[0][1] = inp.arrMap.top;

  const r = inp.runs;
  const at = (q: Box, t: number) => q.top + q.height * t;
  // Keep each holding loop fully inside the viewport.
  const L = (x: number, y: number, rad: number, dir: 1 | -1): Loop => {
    const lx = dir === -1 ? Math.max(X(x), 2 * rad + 12) : Math.min(X(x), vw - 2 * rad - 12);
    return { loop: true, x: lx, y, r: rad, v: 15, dir };
  };
  const wps: WaypointSpec[] = [
    { n: '01', label: inp.labels['01'], x: XW(270), y: inp.wpY['01'] },
    { n: '02', label: inp.labels['02'], x: XW(1220), y: inp.wpY['02'] },
    { n: '03', label: inp.labels['03'], x: XW(220), y: inp.wpY['03'] },
    { n: '04', label: inp.labels['04'], x: XW(1190), y: inp.wpY['04'] },
  ];
  const W = (w: WaypointSpec): Pt => [w.x, w.y];
  const P = (x: number, y: number): Pt => [X(x), y];

  const chain: ChainItem[] = [
    H[H.length - 1], P(1300, r.why.top), P(1110, at(r.why, 0.38)), L(1110, at(r.why, 0.48), 64, 1), P(1270, r.why.bottom),
    W(wps[0]), P(140, at(r.share, 0.62)), P(260, r.share.bottom),
    W(wps[1]), P(1330, at(r.assess, 0.55)), P(1170, r.assess.bottom),
    W(wps[2]), P(150, at(r.complete, 0.44)), L(150, at(r.complete, 0.52), 52, -1), P(310, r.complete.bottom),
    W(wps[3]), P(1320, r.track.bottom),
    P(190, r.support.top), P(330, at(r.support, 0.36)), L(330, at(r.support, 0.46), 54, 1), P(170, r.support.bottom),
    P(1090, r.faq.top), P(1100, at(r.faq, 0.36)), L(1100, at(r.faq, 0.46), 52, 1), P(1290, r.faq.bottom), A[0],
  ];

  const hn = H.length;
  const an = A.length;
  let d = `M${f(H[0][0])} ${f(H[0][1])}`;
  d += catmullRom(H, [2 * H[0][0] - H[1][0], 2 * H[0][1] - H[1][1]], [H[hn - 2][0], 2 * H[hn - 1][1] - H[hn - 2][1]]);
  d += chainPath(chain);
  d += catmullRom(A, [A[1][0], 2 * A[0][1] - A[1][1]], [2 * A[an - 1][0] - A[an - 2][0], 2 * A[an - 1][1] - A[an - 2][1]]);

  return { d, start: H[0], end: A[an - 1], wps, loadCutY: inp.heroMap.bottom - 40 };
}

export type MobileInput = {
  /** Gutter x positions: 22px in from the section container's edges. */
  gl: number;
  gr: number;
  startY: number;
  endY: number;
  runs: Record<'strip' | 'why' | 'share' | 'assess' | 'complete' | 'track' | 'support' | 'faq', { top: number; bottom: number }>;
  wpY: Record<'01' | '02' | '03' | '04', number>;
  /** Centre x of the page, for the S-curve loops in section gaps. */
  cx: number;
};

/** Mobile: the route runs down the active gutter with gentle bends; two loops. */
export function mobileRoute(inp: MobileInput): RouteShape {
  const G = { L: inp.gl, R: inp.gr };
  const B = { L: [inp.gl - 9, inp.gl + 9], R: [inp.gr - 9, inp.gr + 9] };
  const start: Pt = [G.L, inp.startY];
  const end: Pt = [G.L, inp.endY];
  const r = inp.runs;
  const runs: Array<{ s: 'L' | 'R'; top: number; bottom: number; w?: '01' | '02' | '03' | '04'; loop?: 1 | -1; next?: number }> = [
    { s: 'L', top: start[1], bottom: r.strip.bottom },
    { s: 'R', ...r.why, loop: 1, next: r.share.top },
    { s: 'L', ...r.share, w: '01' },
    { s: 'R', ...r.assess, w: '02' },
    { s: 'L', ...r.complete, w: '03' },
    { s: 'R', ...r.track, w: '04' },
    { s: 'L', ...r.support, loop: -1, next: r.faq.top },
    { s: 'R', ...r.faq },
  ];
  const wps: WaypointSpec[] = [];
  const chain: ChainItem[] = [];
  for (const run of runs) {
    const x = G[run.s];
    chain.push([x, run.top]);
    let from = run.top;
    if (run.w) {
      const y = inp.wpY[run.w];
      wps.push({ n: run.w, label: '', x, y });
      if (y - run.top > 4) chain.push([x, y]);
      from = y;
    }
    let side = 0;
    for (let y = from + 240; y < run.bottom - 120; y += 240) chain.push([B[run.s][side++ % 2], y]);
    chain.push([x, run.bottom]);
    if (run.loop && run.next !== undefined) {
      const rad = 40;
      const v = 6;
      const blk = 2 * rad + 2 * Math.PI * v;
      const y0 = run.bottom + (run.next - run.bottom - blk) / 2 + rad;
      chain.push({ loop: true, x: inp.cx - run.loop * rad, y: y0, r: rad, v, dir: run.loop });
    }
  }
  chain.push(end);
  const d = `M${f(start[0])} ${f(start[1])}` + chainPath(chain);
  return { d, start, end, wps, loadCutY: start[1] };
}
