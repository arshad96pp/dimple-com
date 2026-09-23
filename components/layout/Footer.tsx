import Link from "next/link";
import { footerColumns, site } from "@/data/site";
import { socialLinks } from "@/components/icons/BrandIcons";
import { PaymentMarks } from "@/components/icons/PaymentMarks";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="cream" className="text-3xl" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-cream/65">
              Small, happy things for desks, bags, shelves and the people you love. Designed in Bengaluru, wrapped by hand.
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors duration-300 hover:border-butter hover:bg-butter hover:text-ink"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 font-sans text-[11px] font-semibold tracking-[0.18em] text-cream/45 uppercase">
                  {column.title}
                </h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-cream/80 transition-colors duration-300 hover:text-butter"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-4 lg:pl-6">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Little letters, now and then.</h2>
            <p className="mt-2 mb-5 text-sm text-cream/60">New drops and member-only surprises. No spam, ever.</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center md:justify-between">
          <PaymentMarks />
          <p className="text-xs text-cream/45">
            © {year} {site.legalName}. Made with a lot of love and a little glitter.
          </p>
        </div>
      </Container>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.28em] text-center font-display text-[27vw] leading-[0.8] font-bold tracking-[-0.07em] text-cream/[0.04] select-none"
      >
        dimple
      </p>
    </footer>
  );
}
