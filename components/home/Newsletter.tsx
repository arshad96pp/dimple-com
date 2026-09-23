import { HeartDoodle, SmileDoodle, SparkleDoodle, StarDoodle } from "@/components/icons/Doodles";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[28px] bg-butter px-5 py-16 text-center sm:rounded-[36px] sm:px-10 sm:py-24">
          <StarDoodle aria-hidden className="absolute top-8 left-[7%] size-10 animate-float-slow text-coral sm:size-14" />
          <HeartDoodle aria-hidden className="absolute top-8 right-[8%] size-9 sm:top-auto sm:bottom-10 animate-float text-pink [--float-rotate:12deg] sm:size-12" />
          <SparkleDoodle aria-hidden className="absolute top-12 right-[14%] hidden size-7 text-ink sm:block" />
          <SmileDoodle aria-hidden className="absolute bottom-12 left-[12%] hidden size-12 -rotate-12 text-cream lg:block" />

          <div className="relative mx-auto max-w-4xl">
            <span className="inline-flex rotate-[-3deg] items-center rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-butter uppercase">
              10% off your first order
            </span>
            <h2 id="newsletter-title" className="mt-6 text-[2.1rem] leading-[1.02] font-semibold text-ink sm:text-5xl lg:text-[3.6rem]">
              Come For The Cute Stuff.
              <br className="hidden sm:block" /> <span className="text-coral-dark">Stay For The Good Stuff.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              New drops, limited finds and little surprises — straight to your inbox.
            </p>
            <NewsletterForm className="mx-auto mt-8 max-w-md" />
            <p className="mt-4 text-xs text-ink-soft/70">One or two emails a month. Unsubscribe anytime.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
