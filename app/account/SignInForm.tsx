"use client";

import { useState, type FormEvent } from "react";
import { actions } from "@/lib/store";
import { isValidEmail } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function SignInForm() {
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // Replace with your auth provider (magic link / OTP).
    actions.toast({ title: "Check your inbox", description: `We sent a sign-in link to ${email} (demo).`, tone: "success" });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
      <div>
        <label htmlFor="account-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="account-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!error}
          aria-describedby={error ? "account-email-error" : undefined}
          className="h-12 w-full rounded-xl border border-ink/15 bg-cream px-4 text-[15px] outline-none transition-colors focus:border-coral aria-invalid:border-coral-dark"
        />
        {error && (
          <p id="account-email-error" role="alert" className="mt-1.5 text-xs font-medium text-coral-dark">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full">
        Email me a sign-in link
      </Button>
      <p className="text-center text-xs text-muted">No passwords to remember. We&apos;ll never share your email.</p>
    </form>
  );
}
