import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "default" | "wide" | "narrow";
} & ComponentPropsWithoutRef<T>;

const sizes = {
  narrow: "max-w-5xl",
  default: "max-w-[1320px]",
  wide: "max-w-[1560px]",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", sizes[size], className)} {...props} />;
}
