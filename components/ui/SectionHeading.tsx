import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  /** Extra controls on the right (e.g. carousel arrows); sits beside `action`. */
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  aside,
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
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2
          id={id}
          className="text-[2rem] leading-[1.05] text-ink min-[400px]:text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]"
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-3 max-w-md text-[15px] leading-relaxed text-muted sm:text-base", centered && "mx-auto")}>
            {description}
          </p>
        )}
      </div>
      {(action || aside) && (
        <div className="flex shrink-0 items-center gap-5">
          {action && (
            <Link
              href={action.href}
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              <span className="underline decoration-ink/20 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-ink">
                {action.label}
              </span>
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          )}
          {aside}
        </div>
      )}
    </div>
  );
}
