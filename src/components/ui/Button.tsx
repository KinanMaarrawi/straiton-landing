import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary';

type CommonProps = {
  variant?: Variant;
  /** md = 48px (default), lg = 56px (hero, mobile menu). */
  size?: 'md' | 'lg';
  /** Surface the button sits on. Dark swaps the secondary border and the focus ring. */
  tone?: 'light' | 'dark';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
    /** Replaces the label with a spinner and "Sending…"; width stays locked. */
    loading?: boolean;
    loadingLabel?: string;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function cx(...names: Array<string | false | undefined>) {
  return names.filter(Boolean).join(' ');
}

/** "Compare it with us →" → text plus an arrow that nudges on hover (motion.css). */
function withNudge(children: ReactNode): ReactNode {
  if (typeof children !== 'string' || !children.endsWith('→')) return children;
  return (
    <>
      {`${children.slice(0, -1).trimEnd()}\u00a0`}
      <span className="nudge" aria-hidden="true">
        →
      </span>
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', tone = 'light', fullWidth, children, className } = props;
  const classes = cx(
    styles.btn,
    styles[variant],
    size === 'lg' && styles.lg,
    tone === 'dark' && styles.dark,
    fullWidth && styles.full,
    className,
  );

  if (props.href !== undefined) {
    const { variant: _v, size: _s, tone: _t, fullWidth: _f, children: _c, className: _cn, ...rest } = props;
    return (
      <a {...rest} className={classes}>
        {withNudge(children)}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    tone: _t,
    fullWidth: _f,
    children: _c,
    className: _cn,
    loading = false,
    loadingLabel = 'Sending…',
    type = 'button',
    onClick,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      className={cx(classes, loading && styles.loading)}
      aria-disabled={loading || undefined}
      onClick={loading ? (e) => e.preventDefault() : onClick}
    >
      {/* Both labels share one grid cell so the width never changes. */}
      <span className={styles.label} aria-hidden={loading || undefined}>
        {withNudge(children)}
      </span>
      {loading && (
        <span className={styles.loadingLabel}>
          <span className={styles.spinner} aria-hidden="true" />
          {loadingLabel}
        </span>
      )}
    </button>
  );
}
