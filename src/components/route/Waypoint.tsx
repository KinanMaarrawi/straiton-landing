/**
 * Waypoint mark for the page-level route SVG (DESIGN.md §8).
 * Upcoming: white ring. Passed: teal fill + check glyph + heavier label,
 * so state never relies on colour alone. Renders an SVG <g>.
 */
type WaypointProps = {
  x: number;
  y: number;
  passed: boolean;
  /** Desktop shows the place name beside the mark; mobile shows it in the eyebrow. */
  label?: string;
  variant?: 'desktop' | 'mobile';
};

export function Waypoint({ x, y, passed, label, variant = 'desktop' }: WaypointProps) {
  if (variant === 'mobile') {
    return (
      <g data-passed={passed}>
        <circle cx={x} cy={y} r={8} fill={passed ? 'var(--teal-500)' : 'var(--white)'} stroke={passed ? 'var(--white)' : 'var(--ink-500)'} strokeWidth={passed ? 2 : 1.5} />
        {passed && (
          <path d={`M${x - 3.5} ${y} l2.5 2.5 l4.5 -5`} fill="none" stroke="var(--navy-900)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </g>
    );
  }

  return (
    <g data-passed={passed}>
      <circle cx={x} cy={y} r={5} fill={passed ? 'var(--teal-500)' : 'var(--white)'} stroke={passed ? 'var(--white)' : 'var(--ink-500)'} strokeWidth={passed ? 2 : 1.5} />
      {passed && (
        <path d={`M${x + 15} ${y} l3 3 l6 -6`} fill="none" stroke="var(--navy-900)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      )}
      {label && (
        <text
          x={passed ? x + 30 : x + 18}
          y={y + 5}
          style={{
            font: `${passed ? 600 : 400} 14px var(--font-sans)`,
            fill: passed ? 'var(--navy-900)' : 'var(--ink-700)',
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Payment marker at the head of the sailed course, with its mono label chip. */
export function PaymentMarker({
  x,
  y,
  label,
  labelSide = 'right',
  labelWidth,
}: {
  x: number;
  y: number;
  label?: string;
  labelSide?: 'left' | 'right';
  labelWidth?: number;
}) {
  const w = label ? (labelWidth ?? Math.max(104, label.length * 7.4 + 22)) : 0;
  const rx = labelSide === 'right' ? x + 12 : x - 12 - w;
  const isMoney = Boolean(label && /\d/.test(label));
  return (
    <g>
      {label && (
        <>
          <rect x={rx} y={y - 38} width={w} height={24} rx={4} fill="var(--navy-900)" />
          <text
            x={rx + w / 2}
            y={y - 22}
            textAnchor="middle"
            style={{
              font: `500 12px ${isMoney ? 'var(--font-mono)' : 'var(--font-sans)'}`,
              letterSpacing: isMoney ? '0.02em' : 0,
              fill: 'var(--on-dark)',
            }}
          >
            {label}
          </text>
        </>
      )}
      <circle cx={x} cy={y} r={7} fill="var(--teal-500)" stroke="var(--navy-900)" strokeWidth={2} />
    </g>
  );
}
