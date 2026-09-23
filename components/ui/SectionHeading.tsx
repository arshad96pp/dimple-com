import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5 sm:mb-12",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
            <span aria-hidden className="h-px w-6 bg-current" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-[2rem] leading-[1.05] font-semibold text-ink sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-ink md:self-auto"
        >
          <span className="relative">
            {action.label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-500 ease-out-soft group-hover:scale-x-0" />
          </span>
          <span className="grid size-8 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </Link>
      )}
    </div>
  );
}
