import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StarDoodle } from "@/components/icons/Doodles";
import { SignInForm } from "./SignInForm";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to track orders and keep your wishlist in sync.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-16">
      <div className="relative w-full max-w-md rounded-3xl border border-line bg-white p-7 sm:p-10">
        <StarDoodle className="absolute -top-5 -right-3 size-10 rotate-12 text-butter" aria-hidden />
        <h1 className="text-3xl sm:text-4xl">Welcome back</h1>
        <p className="mt-2 text-[15px] text-muted">Sign in to track orders and sync your wishlist across devices.</p>
        <SignInForm />
      </div>
    </Container>
  );
}
