import Link from "next/link";
import { footerColumns, site } from "@/data/site";
import { socialLinks } from "@/components/icons/BrandIcons";
import { HeartDoodle } from "@/components/icons/Doodles";
import { PaymentMarks } from "@/components/icons/PaymentMarks";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-shell">
      <Container className="pt-16 pb-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo className="text-[2rem]" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              Small, happy things for desks, bags, shelves and the people you love. Designed in Bengaluru, wrapped by hand.
            </p>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-sm font-medium text-ink">Little letters, now and then</p>
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow mb-4 font-sans">{column.title}</h2>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] text-ink-soft underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${site.name} on ${label}`}
                className="grid size-10 place-items-center rounded-full border border-ink/10 bg-paper text-ink transition-colors duration-300 hover:border-ink/30"
              >
                <Icon className="size-[17px]" />
              </a>
            ))}
          </div>
          <PaymentMarks />
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-1.5 text-xs text-muted">
          © 2026 {site.legalName}. Made with
          <HeartDoodle className="inline size-3 text-[#ef9fb2]" />
          <span className="sr-only">love</span>
          in India.
        </p>
      </Container>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.26em] text-center font-display text-[26vw] leading-[0.8] font-semibold tracking-[-0.08em] text-blush/70 select-none"
      >
        dimple
      </p>
    </footer>
  );
}
