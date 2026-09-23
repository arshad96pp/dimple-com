import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  illustration: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ illustration, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-6 py-12 text-center", className)}>
      <div className="mb-6">{illustration}</div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
