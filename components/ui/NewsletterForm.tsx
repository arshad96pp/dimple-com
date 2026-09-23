"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { actions } from "@/lib/store";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "error" | "success";

interface NewsletterFormProps {
  /** `large` for the home-page section, `compact` for the footer. */
  size?: "large" | "compact";
  className?: string;
}

export function NewsletterForm({ size = "compact", className }: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const large = size === "large";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    // Hook up to your email provider here.
    setStatus("success");
    setEmail("");
    actions.toast({ title: "You're in the loop", description: "Watch your inbox for a little hello.", tone: "success" });
  };

  if (status === "success") {
    return (
      <p role="status" className={cn("flex items-center gap-2.5 text-sm font-medium text-ink", className)}>
        <span className="grid size-8 place-items-center rounded-full bg-mint">
          <Check className="size-4" aria-hidden />
        </span>
        Thank you! A little hello is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border bg-paper p-1.5 transition-[border-color,box-shadow] duration-300 focus-within:border-ink/40 focus-within:shadow-[0_0_0_4px_rgba(37,37,37,0.04)]",
          status === "error" ? "border-berry" : "border-ink/10",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-error` : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent pl-4 text-ink outline-none placeholder:text-subtle focus-visible:outline-none",
            large ? "h-11 text-[15px] sm:h-12" : "h-10 text-sm",
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={cn(
            "group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink font-medium text-cream transition-colors duration-300 hover:bg-ink-soft",
            large ? "h-11 px-4 text-sm sm:h-12 sm:px-6" : "size-10",
          )}
        >
          {large && <span className="hidden min-[400px]:inline">Subscribe</span>}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-4 text-xs font-medium text-berry">
          That email doesn&apos;t look quite right — mind checking it?
        </p>
      )}
    </form>
  );
}
