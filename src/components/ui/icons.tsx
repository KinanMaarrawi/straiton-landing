import type { SVGProps } from 'react';

/**
 * Inline SVG icons. All decorative (aria-hidden) unless a label is passed
 * by the caller; state is always carried by adjacent text as well.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function base({ size = 16, ...rest }: IconProps): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
    ...rest,
  };
}

/** Circle with exclamation: errors and the error summary. */
export function ErrorIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={2.6}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base({ size: 14, ...props })} strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base({ size: 20, ...props })} strokeWidth={2}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...base({ size: 20, ...props })} strokeWidth={1.6}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base({ size: 18, ...props })} strokeWidth={1.8}>
      <path d="M12 16V5M7.5 9.5L12 5l4.5 4.5M5 19h14" />
    </svg>
  );
}
