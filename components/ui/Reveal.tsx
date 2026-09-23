"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px to travel upward while fading in. */
  y?: number;
  as?: "div" | "section" | "li";
}

/** Subtle fade-and-rise when an element first enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
