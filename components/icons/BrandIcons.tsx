import type { SVGProps } from "react";

// Lucide no longer ships brand marks, so these are drawn locally.
type IconProps = SVGProps<SVGSVGElement>;

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const InstagramIcon = (props: IconProps) => (
  <svg {...base} aria-hidden {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const PinterestIcon = (props: IconProps) => (
  <svg {...base} aria-hidden {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.5 20.5 12 14m0 0c.3 1 1.2 1.6 2.3 1.6 2 0 3.4-1.9 3.4-4.4 0-2.6-2.2-4.5-5-4.5-3.2 0-5.2 2.2-5.2 4.6 0 1.2.5 2.3 1.4 2.8M12 14l1-4.2" />
  </svg>
);

export const YoutubeIcon = (props: IconProps) => (
  <svg {...base} aria-hidden {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" />
  </svg>
);

export const ThreadsIcon = (props: IconProps) => (
  <svg {...base} aria-hidden {...props}>
    <path d="M16.5 11.2c-.4-2.4-2-3.7-4.3-3.7-2.6 0-4.2 1.9-4.2 4.5s1.6 4.6 4.4 4.6c2 0 3.6-1 3.6-2.8 0-1.6-1.4-2.5-3.2-2.5-1.5 0-2.6.8-2.6 2 0 1 .9 1.6 2 1.6" />
    <path d="M19.5 8.5C18.3 5.2 15.6 3.5 12 3.5c-5 0-8 3.4-8 8.5s3 8.5 8 8.5c3.2 0 5.7-1.3 7-3.7" />
  </svg>
);

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Pinterest", href: "https://pinterest.com", Icon: PinterestIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
  { label: "Threads", href: "https://threads.net", Icon: ThreadsIcon },
];
