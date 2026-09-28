'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ASSESS, COMPLETE, SHARE, TRACK } from '@/content/copy';
import { usePageState } from '@/components/state/PageState';
import { desktopRoute, mobileRoute, type Box, type RouteShape } from './geometry';
import { PaymentMarker, Waypoint } from './Waypoint';
import s from './Route.module.css';

type Sampled = RouteShape & {
  total: number;
  /** Samples every STEP px of length: x, y and running max of y. */
  xs: Float32Array;
  ys: Float32Array;
  maxY: Float32Array;
  wpLen: number[];
  loadLen: number;
  width: number;
  height: number;
  desktop: boolean;
};

const STEP = 4;
const LERP = 0.15;
/** Where on screen the marker is aimed: ~62% down the viewport. */
const ANCHOR = 0.62;

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
      labels: { '01': SHARE.waypoint, '02': ASSESS.waypoint, '03': COMPLETE.waypoint, '04': TRACK.waypoint },
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

/** Sample the path once so scrolling never touches layout. */
function sample(shape: RouteShape, pathEl: SVGPathElement, root: HTMLElement): Sampled {
  const total = pathEl.getTotalLength();
  const n = Math.max(2, Math.ceil(total / STEP) + 1);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  const maxY = new Float32Array(n);
  let m = -Infinity;
  for (let i = 0; i < n; i++) {
    const p = pathEl.getPointAtLength(Math.min(i * STEP, total));
    xs[i] = p.x;
    ys[i] = p.y;
    m = Math.max(m, p.y);
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
  const loadLen = lenAtY(maxY, shape.loadCutY, total);
  return {
    ...shape,
    total,
    xs,
    ys,
    maxY,
    wpLen: shape.wps.map((w) => nearest(w.x, w.y)),
    loadLen,
    width: root.clientWidth,
    height: root.scrollHeight,
    desktop: root.clientWidth >= 960,
  };
}

/** First length at which the path has reached y (binary search on running max). */
function lenAtY(maxY: Float32Array, y: number, total: number): number {
  let lo = 0;
  let hi = maxY.length - 1;
  if (y <= maxY[0]) return 0;
  if (y > maxY[hi]) return total;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (maxY[mid] >= y) hi = mid;
    else lo = mid + 1;
  }
  return Math.min(lo * STEP, total);
}

function pointAt(r: Sampled, len: number): [number, number] {
  const i = Math.min(r.xs.length - 1, Math.max(0, Math.round(len / STEP)));
  return [r.xs[i], r.ys[i]];
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * The page-level route (DESIGN.md §8). One absolutely positioned SVG,
 * aria-hidden, pointer-events none. The charted course is always visible;
 * the sailed course is revealed through a mask whose stroke-dashoffset
 * follows scroll with light smoothing. Recomputed from section rects on
 * resize (debounced) and whenever the page's height changes.
 */
export function Route() {
  const { amountLabel, arrived } = usePageState();
  const svgRef = useRef<SVGSVGElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const [route, setRoute] = useState<Sampled | null>(null);
  const [passed, setPassed] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [markerRight, setMarkerRight] = useState(true);

  const live = useRef({ current: 0, target: 0, raf: 0, intro: null as null | { t0: number; to: number }, arrived: false, reduced: false });
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

  // Measure → path string (render) → sample (layout effect below).
  const [shape, setShape] = useState<RouteShape | null>(null);
  const recompute = useCallback(() => {
    const root = svgRef.current?.parentElement;
    if (!root) return;
    const next = measure(root);
    if (next) setShape(next);
  }, []);

  useLayoutEffect(() => {
    const root = svgRef.current?.parentElement;
    if (!shape || !measureRef.current || !root) return;
    setRoute(sample(shape, measureRef.current, root));
  }, [shape]);

  useEffect(() => {
    recompute();
    let t = 0;
    const debounced = () => {
      window.clearTimeout(t);
      t = window.setTimeout(recompute, 150);
    };
    const root = svgRef.current?.parentElement;
    const ro = new ResizeObserver(debounced);
    if (root) ro.observe(root);
    window.addEventListener('resize', debounced);
    document.fonts?.ready.then(recompute).catch(() => {});
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', debounced);
    };
  }, [recompute]);

  // Drive the sailed course.
  useEffect(() => {
    if (!route) return;
    const L = live.current;
    let vh = window.innerHeight;
    let maxScroll = document.documentElement.scrollHeight - vh;

    const targetNow = () => {
      if (L.reduced || L.arrived) return route.total;
      const y = window.scrollY;
      if (y >= maxScroll - 2) return route.total;
      return Math.max(route.loadLen, lenAtY(route.maxY, y + vh * ANCHOR, route.total));
    };

    const paint = (len: number) => {
      const mask = maskPathRef.current;
      const marker = markerRef.current;
      if (mask) mask.style.strokeDashoffset = String(route.total - len);
      const [x, y] = pointAt(route, len);
      if (marker) marker.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      let p = 0;
      route.wpLen.forEach((wl) => {
        if (len >= wl - 2) p++;
      });
      setPassed((prev) => (prev === p ? prev : p));
      const right = x < route.width - 140;
      setMarkerRight((prev) => (prev === right ? prev : right));
    };

    const tick = (now: number) => {
      L.raf = 0;
      L.target = targetNow();
      if (L.intro) {
        const t = Math.min(1, (now - L.intro.t0) / 1200);
        L.current = easeInOut(t) * L.intro.to;
        if (t >= 1) L.intro = null;
        paint(L.current);
        L.raf = requestAnimationFrame(tick);
        return;
      }
      const diff = L.target - L.current;
      L.current = Math.abs(diff) < 0.5 ? L.target : L.current + diff * LERP;
      paint(L.current);
      if (L.current !== L.target) L.raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!L.raf) L.raf = requestAnimationFrame(tick);
    };

    if (L.reduced) {
      L.current = route.total;
      paint(route.total);
    } else if (L.current === 0) {
      // First draw: the hero's first stretch sails once on load.
      L.intro = { t0: performance.now(), to: targetNow() };
      kick();
    } else {
      // Re-measured: keep the same proportion of the course.
      L.current = Math.min(L.current, route.total);
      kick();
    }

    const onResize = () => {
      vh = window.innerHeight;
      maxScroll = document.documentElement.scrollHeight - vh;
    };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      if (L.raf) cancelAnimationFrame(L.raf);
      L.raf = 0;
    };
  }, [route]);

  // Arrival and reduced-motion changes retarget the loop.
  useEffect(() => {
    if (!route) return;
    window.dispatchEvent(new Event('scroll'));
  }, [arrived, reduced, route]);

  const label = amountLabel ?? 'Your payment';
  const labelW = Math.max(104, label.length * 7.6 + 22);

  return (
    <svg
      ref={svgRef}
      className={s.route}
      width={route?.width ?? 0}
      height={route?.height ?? 0}
      aria-hidden="true"
      focusable="false"
    >
      {/* Hidden path used only to measure a freshly computed shape. */}
      {shape && <path ref={measureRef} d={shape.d} fill="none" stroke="none" />}
      {route && (
        <>
          <defs>
            <mask id="route-sailed" maskUnits="userSpaceOnUse" x={0} y={0} width={route.width} height={route.height}>
              <path
                ref={maskPathRef}
                d={route.d}
                fill="none"
                stroke="#fff"
                strokeWidth={14}
                strokeDasharray={`${route.total} ${route.total + 10}`}
                style={{ strokeDashoffset: route.total - (reduced ? route.total : live.current.current) }}
              />
            </mask>
          </defs>
          <path className={s.charted} d={route.d} />
          <path className={s.sailed} d={route.d} mask="url(#route-sailed)" />

          {/* Desktop's start point is drawn on the hero map (works without JS). */}
          {!route.desktop && <circle className={s.start} cx={route.start[0]} cy={route.start[1]} r={5} />}

          {route.wps.map((w, i) => (
            <Waypoint
              key={w.n}
              x={w.x}
              y={w.y}
              passed={reduced || i < passed}
              label={route.desktop ? w.label : undefined}
              variant={route.desktop ? 'desktop' : 'mobile'}
            />
          ))}

          {/* Endpoint ring: the marker settles on it. */}
          <circle className={s.endRing} cx={route.end[0]} cy={route.end[1]} r={5} />

          <g ref={markerRef} transform={`translate(${route.start[0]} ${route.start[1]})`}>
            <PaymentMarker
              x={0}
              y={0}
              label={route.desktop ? label : undefined}
              labelSide={markerRight ? 'right' : 'left'}
              labelWidth={labelW}
            />
          </g>
        </>
      )}
    </svg>
  );
}
