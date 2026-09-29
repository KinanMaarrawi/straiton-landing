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
  segs: Seg[];
  start: Pt;
  end: Pt;
  wps: WaypointSpec[];
};

const f = (n: number) => n.toFixed(1);

/** A path segment, kept alongside the d string so we can sample in JS. */
export type Seg = { c: [Pt, Pt, Pt, Pt] } | { l: [Pt, Pt] };

/** Builds a path string and its segment list at the same time. */
class PathBuilder {
  d = '';
  segs: Seg[] = [];
  private at: Pt = [0, 0];
  move(p: Pt) {
    this.d += `M${f(p[0])} ${f(p[1])}`;
    this.at = p;
  }
  curve(c1: Pt, c2: Pt, p: Pt) {
    this.d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p[0])} ${f(p[1])}`;
    this.segs.push({ c: [this.at, c1, c2, p] });
    this.at = p;
  }
  line(p: Pt) {
    this.d += `L${f(p[0])} ${f(p[1])}`;
    this.segs.push({ l: [this.at, p] });
    this.at = p;
  }
}

/** Catmull-Rom through pts, as cubic Béziers (frame's cr()). */
function catmullRom(b: PathBuilder, pts: Pt[], pre: Pt, post: Pt) {
  const P = [pre, ...pts, post];
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    b.curve(
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      [p2[0], p2[1]],
    );
  }
}

/** Vertical-tangent curves between chain points, with full-circle holding loops (frame's chain loop). */
function chainPath(b: PathBuilder, chain: ChainItem[]) {
  let a = chain[0] as Pt;
  for (let i = 1; i < chain.length; i++) {
    const c = chain[i];
    const t: Pt = 'loop' in c ? [c.x, c.y] : c;
    const k = (t[1] - a[1]) * 0.5;
    b.curve([a[0], a[1] + k], [t[0], t[1] - k], t);
    if ('loop' in c) {
      const cx = c.x + c.dir * c.r;
      for (let j = 1; j <= 64; j++) {
        const th = -Math.PI / 2 + (j / 64) * 2 * Math.PI;
        b.line([cx + c.dir * c.r * Math.sin(th), c.y + c.v * (th + Math.PI / 2) + c.r * Math.cos(th)]);
      }
      a = [c.x, c.y + 2 * Math.PI * c.v];
    } else a = t;
  }
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
    // FAQ: fixed offsets from the section top (not fractions of its height),
    // so opening an answer only stretches the tail, never moves the loop.
    P(1090, r.faq.top), P(1100, r.faq.top + 250), L(1100, r.faq.top + 320, 52, 1), P(1290, r.faq.bottom), A[0],
  ];

  const hn = H.length;
  const an = A.length;
  const b = new PathBuilder();
  b.move(H[0]);
  catmullRom(b, H, [2 * H[0][0] - H[1][0], 2 * H[0][1] - H[1][1]], [H[hn - 2][0], 2 * H[hn - 1][1] - H[hn - 2][1]]);
  chainPath(b, chain);
  catmullRom(b, A, [A[1][0], 2 * A[0][1] - A[1][1]], [2 * A[an - 1][0] - A[an - 2][0], 2 * A[an - 1][1] - A[an - 2][1]]);

  return { d: b.d, segs: b.segs, start: H[0], end: A[an - 1], wps };
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
  const b = new PathBuilder();
  b.move(start);
  chainPath(b, chain);
  return { d: b.d, segs: b.segs, start, end, wps };
}

/**
 * Resample the path at a fixed arc-length step, in JS. (Firefox's
 * getPointAtLength walks the path from the start on every call, so
 * sampling a page-long path with it takes seconds.)
 */
export function sampleSegments(segs: Seg[], step: number): { xs: Float32Array; ys: Float32Array; total: number } {
  // 1. Flatten to a fine polyline with cumulative length.
  const px: number[] = [];
  const py: number[] = [];
  const pl: number[] = [];
  let len = 0;
  const push = (x: number, y: number) => {
    if (px.length) len += Math.hypot(x - px[px.length - 1], y - py[py.length - 1]);
    px.push(x);
    py.push(y);
    pl.push(len);
  };
  for (const sg of segs) {
    if ('l' in sg) {
      if (!px.length) push(sg.l[0][0], sg.l[0][1]);
      push(sg.l[1][0], sg.l[1][1]);
      continue;
    }
    const [p0, p1, p2, p3] = sg.c;
    if (!px.length) push(p0[0], p0[1]);
    const chord = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) + Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) + Math.hypot(p3[0] - p2[0], p3[1] - p2[1]);
    const n = Math.max(4, Math.ceil(chord / 2));
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const a = u * u * u;
      const b = 3 * u * u * t;
      const c = 3 * u * t * t;
      const d = t * t * t;
      push(a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]);
    }
  }
  // 2. Walk the polyline, emitting a point every `step`.
  const n = Math.max(2, Math.floor(len / step) + 1);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  let j = 1;
  for (let k = 0; k < n; k++) {
    const target = k * step;
    while (j < pl.length - 1 && pl[j] < target) j++;
    const span = pl[j] - pl[j - 1] || 1;
    const t = Math.min(1, Math.max(0, (target - pl[j - 1]) / span));
    xs[k] = px[j - 1] + (px[j] - px[j - 1]) * t;
    ys[k] = py[j - 1] + (py[j] - py[j - 1]) * t;
  }
  return { xs, ys, total: len };
}
