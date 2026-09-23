import { HeartDoodle, SparkleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="py-20 sm:py-28">
      <Container>
        <Reveal
          scale
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-lavender-50 to-lavender px-5 py-16 text-center sm:rounded-[40px] sm:px-10 sm:py-24"
        >
          {/* A few tiny marks — scattered, not a pattern */}
          <StarDoodle aria-hidden className="absolute top-10 left-[8%] size-7 animate-drift-slow text-paper sm:size-10" />
          <HeartDoodle
            aria-hidden
            className="absolute right-[9%] bottom-12 size-6 animate-drift text-[#ef9fb2] [--drift-rotate:12deg] sm:size-8"
          />
          <SparkleDoodle aria-hidden className="absolute top-12 right-[14%] hidden size-6 text-ink/50 sm:block" />
          <StarDoodle aria-hidden className="absolute bottom-16 left-[16%] hidden size-4 text-butter lg:block" />
          <span aria-hidden className="absolute -bottom-24 -left-16 size-64 rounded-full bg-blush/60 blur-3xl" />
          <span aria-hidden className="absolute -top-24 -right-10 size-64 rounded-full bg-paper/60 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow">The newsletter</p>
            <h2
              id="newsletter-title"
              className="mt-5 text-[2.4rem] leading-[1.02] tracking-[-0.05em] text-ink sm:text-6xl lg:text-[4.2rem]"
            >
              Stay In The
              <br /> Cute Loop.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              New drops, thoughtful gifts and little finds — delivered occasionally.
            </p>
            <NewsletterForm size="large" className="mx-auto mt-9 max-w-md" />
            <p className="mt-4 text-xs text-muted">One or two emails a month. Unsubscribe anytime.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
