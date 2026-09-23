"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { actions } from "@/lib/store";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "error" | "success";

interface NewsletterFormProps {
  tone?: "light" | "dark";
  className?: string;
}

export function NewsletterForm({ tone = "light", className }: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const dark = tone === "dark";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    // Hook up to your email provider here.
    setStatus("success");
    setEmail("");
    actions.toast({ title: "You're on the list", description: "Watch your inbox for a little hello.", tone: "success" });
  };

  if (status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          dark ? "text-cream" : "text-ink",
          className,
        )}
      >
        <span className="grid size-7 place-items-center rounded-full bg-mint text-ink">
          <Check className="size-4" aria-hidden />
        </span>
        Thanks! Your first surprise is on its way.
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
          "flex items-center gap-1.5 rounded-full border p-1.5 transition-colors duration-300 focus-within:border-coral",
          dark ? "border-cream/20 bg-cream/5" : "border-ink/15 bg-white",
          status === "error" && "border-coral-dark",
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-error` : undefined}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent pl-4 text-[15px] outline-none",
            dark ? "text-cream placeholder:text-cream/40" : "text-ink placeholder:text-subtle",
          )}
        />
        <button
          type="submit"
          className={cn(
            "group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-300 sm:px-5",
            dark ? "bg-cream text-ink hover:bg-butter" : "bg-ink text-cream hover:bg-coral",
          )}
        >
          Subscribe
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className={cn("mt-2 pl-4 text-xs font-medium", dark ? "text-pink" : "text-coral-dark")}>
          That email doesn&apos;t look quite right — mind checking it?
        </p>
      )}
    </form>
  );
}
