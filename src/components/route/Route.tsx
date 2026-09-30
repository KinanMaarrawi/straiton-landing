'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WAYPOINT_PLACES } from '@/content/copy';
import { usePageState } from '@/components/state/PageState';
import { desktopRoute, mobileRoute, sampleSegments, type Box, type RouteShape } from './geometry';
import { RouteMarker, RouteWaypoint } from './RouteMarks';
import s from './Route.module.css';

type Sampled = RouteShape & {
  total: number;
  /** Samples every STEP px of length: x, y and running max of y. */
  xs: Float32Array;
  ys: Float32Array;
  maxY: Float32Array;
  wpLen: number[];
  width: number;
  height: number;
  desktop: boolean;
};

const STEP = 4;
/**
 * How the marker follows the reader: a critically damped spring. It eases
 * in and out (no lunge, no overshoot) and arrives where the reader is
 * ~1.5s later, scrolling down or up: 80% there after 1s, 94% after 1.5s,
 * 98% after 2s. Lower = lazier.
 */
const FOLLOW = 3;
/** Where on screen the marker is aimed once the reader is underway: ~62% down the viewport. */
const ANCHOR = 0.62;
/**
 * At the top of the page the marker rests on the start (Dubai), whatever
 * the window height. As the reader scrolls, the aim moves CATCHUP times
 * faster than the page until it reaches the ANCHOR line, then rides it.
 */
const CATCHUP = 2;

/** Offset-chain position relative to root (ignores transforms, like the frames). */
function boxOf(el: HTMLElement, root: HTMLElement): Box {
  let top = 0;
  let left = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    top += n.offsetTop;
    left += n.offsetLeft;
    n = n.offsetParent as HTMLElement | null;
  }
  return { top, left, bottom: top + el.offsetHeight, width: el.offsetWidth, height: el.offsetHeight };
}

/** A section's content box: its rect minus vertical padding. */
function contentBox(el: HTMLElement, root: HTMLElement): Box {
  const b = boxOf(el, root);
  const cs = getComputedStyle(el);
  const pt = parseFloat(cs.paddingTop);
  const pb = parseFloat(cs.paddingBottom);
  return { ...b, top: b.top + pt, bottom: b.bottom - pb, height: b.height - pt - pb };
}

function measure(root: HTMLElement): RouteShape | null {
  const q = (sel: string) => root.querySelector<HTMLElement>(sel);
  const run = (k: string) => {
    const el = q(`[data-run="${k}"]`);
    return el ? contentBox(el, root) : null;
  };
  const wpMid = (n: string, mobile: boolean) => {
    const el = q(`[data-wp="${n}"]`);
    if (!el) return 0;
    const b = boxOf(el, root);
    return mobile ? b.top + 10 : b.top + b.height / 2;
  };
  const keys = ['strip', 'why', 'share', 'assess', 'complete', 'track', 'support', 'faq'] as const;
  const runs = Object.fromEntries(keys.map((k) => [k, run(k)])) as Record<(typeof keys)[number], Box | null>;
  if (keys.some((k) => !runs[k])) return null;
  const R = runs as Record<(typeof keys)[number], Box>;
  const vw = root.clientWidth;

  if (vw >= 960) {
    const hm = q('[data-map="hero"]');
    const am = q('[data-map="arr"]');
    const inner = q('[data-run="share"] > div');
    if (!hm || !am || !inner) return null;
    const ib = boxOf(inner, root);
    return desktopRoute({
      vw,
      containerLeft: ib.left,
      containerWidth: ib.width,
      heroMap: boxOf(hm, root),
      arrMap: boxOf(am, root),
      runs: R,
      wpY: { '01': wpMid('01', false), '02': wpMid('02', false), '03': wpMid('03', false), '04': wpMid('04', false) },
    });
  }

  const inner = q('[data-run="share"] > div');
  const startEl = q('[data-pt="start"]');
  const endEl = q('[data-pt="end"]');
  if (!inner || !startEl || !endEl) return null;
  const ib = boxOf(inner, root);
  const mid = (el: HTMLElement) => {
    const b = boxOf(el, root);
    return b.top + Math.min(b.height, 22) / 2;
  };
  return mobileRoute({
    gl: ib.left + 22,
    gr: ib.left + ib.width - 22,
    cx: ib.left + ib.width / 2,
    startY: mid(startEl),
    endY: mid(endEl),
    runs: R,
    wpY: { '01': wpMid('01', true), '02': wpMid('02', true), '03': wpMid('03', true), '04': wpMid('04', true) },
  });
}

/** Sample the path once, in JS, so scrolling never touches layout or SVG APIs. */
function sample(shape: RouteShape, root: HTMLElement): Sampled {
  const { xs, ys, total } = sampleSegments(shape.segs, STEP);
  const n = xs.length;
  const maxY = new Float32Array(n);
  let m = -Infinity;
  for (let i = 0; i < n; i++) {
    m = Math.max(m, ys[i]);
    maxY[i] = m;
  }
  const nearest = (x: number, y: number) => {
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < n; i++) {
      const dd = (xs[i] - x) ** 2 + (ys[i] - y) ** 2;
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    }
    return best * STEP;
  };
  return {
    ...shape,
    total,
    xs,
    ys,
    maxY,
    wpLen: shape.wps.map((w) => nearest(w.x, w.y)),
    width: root.clientWidth,
    height: root.scrollHeight,
    desktop: root.clientWidth >= 960,
  };
}

/** First length at which the path has reached y (binary search on running max). */
function lenAtY(maxY: Float32Array, y: number, total: number): number {
  let lo = 0;
  let hi = maxY.length - 1;
  // Samples are Float32: allow for rounding, or an aim exactly at the start
  // would skip ahead to the next point the course returns to that height.
  if (y <= maxY[0] + 0.5) return 0;
  if (y > maxY[hi]) return total;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (maxY[mid] >= y) hi = mid;
    else lo = mid + 1;
  }
  return Math.min(lo * STEP, total);
}

/** Position at a length, interpolated between samples so the marker glides. */
function pointAt(r: Sampled, len: number): [number, number] {
  const f = Math.min(r.xs.length - 1, Math.max(0, len / STEP));
  const i = Math.floor(f);
  const j = Math.min(r.xs.length - 1, i + 1);
  const t = f - i;
  return [r.xs[i] + (r.xs[j] - r.xs[i]) * t, r.ys[i] + (r.ys[j] - r.ys[i]) * t];
}

/** Dot spacing of the course (matches stroke-dasharray "0 8"). */
const DOT = 8;

/**
 * The sailed dots. Rendered once per route shape and memoised, so React
 * never re-renders ~2,000 circles; the animation loop toggles a class on
 * the few dots that change each frame. Each dot fades in on its own, so
 * the course grows smoothly instead of the whole path repainting.
 */
/** Band height for tiling the course: only bands on screen get painted. */
const BAND = 1024;
/** How long a newly sailed dot animates before it settles into its chunk's path. */
const SETTLE_MS = 280;
/** Settled dots are grouped in chunks of this many, so a repaint stays small. */
const CHUNK = 32;

type Tiles = {
  /** Band index and page position of every dot, in course order. */
  band: Int32Array;
  x: Float32Array;
  y: Float32Array;
  /** Per band: its dots' subpath strings (band-relative), in course order, and their indices. */
  strs: string[][];
  ks: number[][];
  count: number;
};

/**
 * Dot centres every DOT px of length (the charted and sailed courses share
 * them), grouped into horizontal bands. Each band is its own small SVG,
 * so the browser only rasterises the one or two bands in view.
 */
function tile(route: Sampled): Tiles {
  const n = Math.floor(route.total / DOT) + 1;
  const count = Math.max(1, Math.ceil(route.height / BAND));
  const t: Tiles = {
    band: new Int32Array(n),
    x: new Float32Array(n),
    y: new Float32Array(n),
    strs: Array.from({ length: count }, () => []),
    ks: Array.from({ length: count }, () => []),
    count,
  };
  for (let k = 0; k < n; k++) {
    const i = Math.min(route.xs.length - 1, (k * DOT) / STEP);
    const x = route.xs[i];
    const y = route.ys[i];
    const b = Math.min(count - 1, Math.max(0, Math.floor(y / BAND)));
    t.band[k] = b;
    t.x[k] = x;
    t.y[k] = y;
    t.strs[b].push(`M${x.toFixed(1)} ${(y - b * BAND).toFixed(1)}h0`);
    t.ks[b].push(k);
  }
  return t;
}

/** The distinct chunk numbers of a band's dots. */
function chunksOf(ks: number[]): number[] {
  const out: number[] = [];
  for (const k of ks) {
    const c = Math.floor(k / CHUNK);
    if (out[out.length - 1] !== c) out.push(c);
  }
  return out;
}

/**
 * Static structure of both courses, memoised per layout. Per band: the
 * charted course (never changes) and the sailed course (a path the loop
 * rewrites only when dots settle in that band). Dots that are still
 * fading in live briefly as circles in the head layer.
 */
const Course = memo(function Course({ route, tiles }: { route: Sampled; tiles: Tiles }) {
  return (
    <>
      {tiles.strs.map((strs, b) =>
        strs.length ? (
          <svg
            key={b}
            className={s.band}
            width={route.width}
            height={BAND}
            viewBox={`0 0 ${route.width} ${BAND}`}
            style={{ top: b * BAND }}
          >
            {chunksOf(tiles.ks[b]).map((c) => (
              <path key={c} className={s.sailed} data-band={b} data-chunk={c} d="" />
            ))}
          </svg>
        ) : null,
      )}
      <svg className={s.layer} width={route.width} height={route.height}>
        {!route.desktop && <circle className={s.start} cx={route.start[0]} cy={route.start[1]} r={5} />}
        <circle className={s.endRing} cx={route.end[0]} cy={route.end[1]} r={5} />
        <g className={s.head} data-head="" />
      </svg>
    </>
  );
});

/**
 * The page-level route (DESIGN.md §8), aria-hidden and pointer-events none.
 * Split into layers so scrolling repaints almost nothing:
 * - the charted course is a static SVG, drawn once per layout;
 * - the sailed course is individual dots, switched on as the marker passes;
 * - the marker and waypoints are small elements moved with transforms.
 * Recomputed from section rects on resize (debounced) and whenever the
 * page's height changes.
 */
export function Route() {
  const { amountLabel, arrived } = usePageState();
  const rootRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<Sampled | null>(null);
  const tiles = useMemo(() => (route ? tile(route) : null), [route]);
  const [passed, setPassed] = useState(0);
  const [reduced, setReduced] = useState(false);

  const live = useRef({
    current: 0,
    velocity: 0,
    target: 0,
    lit: 0,
    settled: 0,
    raf: 0,
    last: 0,
    started: false,
    arrived: false,
    reduced: false,
  });
  live.current.arrived = arrived;
  live.current.reduced = reduced;

  // Reduced motion: full route drawn, marker at arrival, all waypoints passed.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Measure → sample. Skipped when the layout produced the same course.
  const lastKey = useRef('');
  const recompute = useCallback(() => {
    const root = rootRef.current?.parentElement;
    if (!root) return;
    const next = measure(root);
    if (!next) return;
    const key = `${next.d}|${root.clientWidth}x${root.scrollHeight}`;
    if (key === lastKey.current) return;
    lastKey.current = key;
    setRoute(sample(next, root));
  }, []);

  useEffect(() => {
    recompute();
    // Follow layout changes frame by frame (an FAQ answer opening, the form
    // changing step), so the route stretches with the page instead of
    // snapping into place after it settles.
    let frame = 0;
    const onLayout = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        recompute();
      });
    };
    const root = rootRef.current?.parentElement;
    const ro = new ResizeObserver(onLayout);
    if (root) ro.observe(root);
    window.addEventListener('resize', onLayout);
    document.fonts?.ready.then(recompute).catch(() => {});
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('resize', onLayout);
    };
  }, [recompute]);

  // Drive the sailed course.
  useEffect(() => {
    if (!route || !tiles) return;
    const L = live.current;
    const root = rootRef.current;
    // Sailed paths keyed by "band:chunk".
    const chunkPaths = new Map<string, SVGPathElement>();
    root?.querySelectorAll<SVGPathElement>('path[data-chunk]').forEach((p) => {
      chunkPaths.set(`${p.dataset.band}:${p.dataset.chunk}`, p);
    });
    const head = root?.querySelector('g[data-head]');
    const ns = 'http://www.w3.org/2000/svg';
    const animating = new Map<number, { el: SVGCircleElement; at: number }>();
    const n = tiles.x.length;
    let vh = window.innerHeight;
    let maxScroll = document.documentElement.scrollHeight - vh;
    // Route coordinates are relative to <main>; scroll positions are page
    // coordinates. The prototype notice and header sit between the two.
    let mainTop = (rootRef.current?.parentElement?.getBoundingClientRect().top ?? 0) + window.scrollY;
    // A new layout means new dots: relight from scratch.
    L.lit = 0;
    L.settled = 0;
    head?.replaceChildren();

    /** Rewrite only the sailed chunk paths touched by dots [from, to). */
    const rebuildBands = (from: number, to: number) => {
      const touched = new Set<string>();
      for (let k = Math.max(0, from); k < Math.min(n, to); k++) touched.add(`${tiles.band[k]}:${Math.floor(k / CHUNK)}`);
      touched.forEach((key) => {
        const [b, c] = key.split(':').map(Number);
        const ks = tiles.ks[b];
        const strs = tiles.strs[b];
        let d = '';
        for (let i = 0; i < ks.length; i++) {
          if (Math.floor(ks[i] / CHUNK) === c && ks[i] < L.settled) d += strs[i];
        }
        chunkPaths.get(key)?.setAttribute('d', d);
      });
    };

    /** Dots between settled and lit animate in as circles; then settle into their band's path. */
    const updateDots = (len: number, now: number, instant: boolean) => {
      const want = Math.min(n, Math.floor(len / DOT) + 1);
      if (want > L.lit) {
        for (let k = L.lit; k < want; k++) {
          if (instant || !head) continue;
          const el = document.createElementNS(ns, 'circle');
          el.setAttribute('cx', tiles.x[k].toFixed(1));
          el.setAttribute('cy', tiles.y[k].toFixed(1));
          el.setAttribute('r', '1.75');
          head.appendChild(el);
          animating.set(k, { el, at: now });
        }
      } else if (want < L.lit) {
        // Sailing back up the page: drop dots past the head at once.
        for (let k = want; k < L.lit; k++) {
          animating.get(k)?.el.remove();
          animating.delete(k);
        }
        const before = L.settled;
        L.settled = Math.min(L.settled, want);
        if (L.settled < before) rebuildBands(L.settled, before);
      }
      L.lit = want;
      // Settle finished dots, in order.
      const before = L.settled;
      while (L.settled < L.lit) {
        const a = animating.get(L.settled);
        if (a && !instant && now - a.at < SETTLE_MS) break;
        if (a) {
          a.el.remove();
          animating.delete(L.settled);
        }
        L.settled++;
      }
      if (L.settled > before) rebuildBands(before, L.settled);
      return animating.size > 0;
    };

    const targetNow = () => {
      if (L.reduced || L.arrived) return route.total;
      const scrolled = window.scrollY;
      if (scrolled >= maxScroll - 2) return route.total;
      const anchorLine = scrolled - mainTop + vh * ANCHOR; // in route coordinates
      const aim = Math.max(route.start[1], Math.min(anchorLine, route.start[1] + scrolled * CATCHUP));
      return lenAtY(route.maxY, aim, route.total);
    };

    /** Returns true while dots are still animating in. */
    const paint = (len: number, now = performance.now(), instant = L.reduced) => {
      const busy = updateDots(len, now, instant);
      const [x, y] = pointAt(route, len);
      const m = markerRef.current;
      if (m) {
        m.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        m.dataset.side = x < route.width - 150 ? 'right' : 'left';
      }
      let p = 0;
      for (const wl of route.wpLen) if (len >= wl - 2) p++;
      setPassed((prev) => (prev === p ? prev : p));
      return busy;
    };

    const tick = (now: number) => {
      L.raf = 0;
      const dt = Math.min(64, L.last ? now - L.last : 16.7);
      L.last = now;
      L.target = targetNow();
      // Critically damped spring, stepped exactly (stable at any frame rate).
      const d = L.current - L.target;
      if (Math.abs(d) < 0.3 && Math.abs(L.velocity) < 2) {
        L.current = L.target;
        L.velocity = 0;
      } else {
        const t = dt / 1000;
        const e = Math.exp(-FOLLOW * t);
        const tmp = (L.velocity + FOLLOW * d) * t;
        L.current = L.target + (d + tmp) * e;
        L.velocity = (L.velocity - FOLLOW * tmp) * e;
      }
      const busy = paint(L.current, now);
      if (L.current !== L.target || busy) L.raf = requestAnimationFrame(tick);
      else L.last = 0;
    };

    const kick = () => {
      if (!L.raf) L.raf = requestAnimationFrame(tick);
    };

    if (L.reduced) {
      L.current = route.total;
      paint(route.total);
    } else if (!L.started) {
      // First draw: place the marker where the reader is, without animating.
      // At the top that is the start point (Dubai); on a shared deep link it
      // is the course sailed up to that section.
      L.started = true;
      L.current = targetNow();
      paint(L.current, performance.now(), true);
      kick();
    } else {
      // Re-measured (resize, an FAQ opening): relight what was already
      // sailed without replaying it, and keep the marker's momentum.
      L.current = Math.min(L.current, route.total);
      paint(L.current, performance.now(), true);
      kick();
    }

    const onResize = () => {
      vh = window.innerHeight;
      maxScroll = document.documentElement.scrollHeight - vh;
      mainTop = (rootRef.current?.parentElement?.getBoundingClientRect().top ?? 0) + window.scrollY;
    };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      if (L.raf) cancelAnimationFrame(L.raf);
      L.raf = 0;
      L.last = 0;
    };
  }, [route, tiles]);

  // Arrival and reduced-motion changes retarget the loop.
  useEffect(() => {
    if (!route) return;
    window.dispatchEvent(new Event('scroll'));
  }, [arrived, reduced, route]);

  const label = amountLabel ?? 'Your payment';

  return (
    <div
      ref={rootRef}
      className={s.route}
      data-reduced={reduced || undefined}
      style={{ width: route?.width ?? 0, height: route?.height ?? 0 }}
      aria-hidden="true"
    >
      {route && (
        <>
          {tiles && <Course route={route} tiles={tiles} />}
          {route.wps.map((w, i) => (
            <RouteWaypoint
              key={w.n}
              x={w.x}
              y={w.y}
              passed={reduced || i < passed}
              // Desktop only: the lane beside the route has room for the name.
              label={route.desktop ? WAYPOINT_PLACES[w.n as keyof typeof WAYPOINT_PLACES] : undefined}
            />
          ))}
          <RouteMarker ref={markerRef} start={route.start} label={route.desktop ? label : undefined} arrived={arrived} />
        </>
      )}
    </div>
  );
}
