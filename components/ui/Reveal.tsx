"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px to travel upward while fading in. */
  y?: number;
  /** Start slightly smaller — for images and cards, not text. */
  scale?: boolean;
  as?: "div" | "section" | "li" | "ul";
  id?: string;
}

/**
 * The one scroll-reveal used across the site: a soft fade-and-rise the first
 * time an element is ~15% visible. Reduced motion is handled by MotionConfig.
 */
export function Reveal({ children, className, delay = 0, y = 20, scale = false, as = "div", id }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
