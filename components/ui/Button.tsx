import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "soft" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-ink-soft hover:shadow-[0_10px_24px_-14px_rgba(37,37,37,0.55)]",
  outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-paper",
  soft: "bg-paper/85 text-ink shadow-[0_1px_0_rgba(37,37,37,0.04)] backdrop-blur-sm hover:bg-paper",
  link: "h-auto! px-0! text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px] sm:h-[52px] sm:px-8",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Shows an arrow that nudges forward on hover. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  const { variant, size, withArrow, className, children, ...rest } = props;
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
  const classes = buttonClasses({ variant, size, className });

  if (typeof rest.href === "string") {
    return (
      <Link {...(rest as ButtonAsLink)} className={classes}>
        {content}
      </Link>
    );
  }
  const { type = "button", ...buttonRest } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} {...buttonRest} className={classes}>
      {content}
    </button>
  );
}
