"use client";

import Image, { type ImageProps } from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps extends Omit<ImageProps, "fill"> {
  wrapperClassName?: string;
}

/** A filled image that unveils with a soft clip + scale as it scrolls into view. */
export function ImageReveal({ wrapperClassName, className, alt, ...props }: ImageRevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={cn("relative overflow-hidden bg-cream-200", wrapperClassName)}
      initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8% round 24px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <m.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image fill alt={alt} className={cn("object-cover", className)} {...props} />
      </m.div>
    </m.div>
  );
}
