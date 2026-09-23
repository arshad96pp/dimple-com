import type { SVGProps } from "react";

/** Hand-drawn decorative marks used sparingly across the site. */
type DoodleProps = SVGProps<SVGSVGElement>;

export const StarDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 48 48" aria-hidden {...props}>
    <path
      d="M24 3.5c1.6 8.8 4.3 13.3 8 15.4 3 1.7 7.4 2.5 12.5 3.1-5.1.8-9.4 1.9-12.2 3.8-3.6 2.4-6.4 7-8.3 18.7-1.6-11.2-4.1-16-7.9-18.5C13 24 8.6 23 3.5 22c5.3-.6 9.6-1.5 12.5-3.3C19.7 16.4 22.3 12 24 3.5Z"
      fill="currentColor"
    />
  </svg>
);

export const HeartDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 48 48" aria-hidden {...props}>
    <path
      d="M24 41.5C10.5 33 4.5 25.6 4.5 17.8 4.5 11.8 9 7 14.8 7c4 0 7.2 2.2 9.2 5.6C26 9.2 29.2 7 33.2 7 39 7 43.5 11.8 43.5 17.8c0 7.8-6 15.2-19.5 23.7Z"
      fill="currentColor"
    />
  </svg>
);

export const SparkleDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden {...props}>
    <path d="M16 3v7M16 22v7M3 16h7M22 16h7M7 7l3.5 3.5M21.5 21.5 25 25M25 7l-3.5 3.5M10.5 21.5 7 25" />
  </svg>
);

export const SquiggleDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 220 18" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" aria-hidden preserveAspectRatio="none" {...props}>
    <path d="M3 12c18-8 30-8 44 0s28 8 42 0 28-8 42 0 28 8 42 0 28-8 44 0" />
  </svg>
);

export const GiftDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 64 64" aria-hidden {...props}>
    <rect x="9" y="26" width="46" height="31" rx="4" fill="var(--color-coral)" />
    <rect x="6" y="18" width="52" height="11" rx="3.5" fill="var(--color-coral-dark)" />
    <rect x="28.5" y="18" width="7" height="39" fill="var(--color-butter)" />
    <path d="M32 18c-3-7-12-11-14-6-1.6 3.8 6 6 14 6Zm0 0c3-7 12-11 14-6 1.6 3.8-6 6-14 6Z" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const PencilDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 80 20" aria-hidden {...props}>
    <rect x="12" y="4" width="56" height="12" rx="2" fill="var(--color-lavender)" />
    <rect x="62" y="4" width="10" height="12" rx="2" fill="var(--color-pink)" />
    <rect x="58" y="4" width="5" height="12" fill="var(--color-cream-200)" />
    <path d="M12 4 2 10l10 6Z" fill="#f3d7b0" />
    <path d="M5.5 8 2 10l3.5 2Z" fill="var(--color-ink)" />
  </svg>
);

export const SmileDoodle = (props: DoodleProps) => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
    <circle cx="24" cy="24" r="21" fill="currentColor" />
    <circle cx="17" cy="20" r="2.6" fill="var(--color-ink)" />
    <circle cx="31" cy="20" r="2.6" fill="var(--color-ink)" />
    <path d="M15.5 28.5c4.6 5.2 12.4 5.2 17 0" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
