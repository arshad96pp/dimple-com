import { Gift, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

const benefits: { icon: LucideIcon; title: string; detail: string; tone: string }[] = [
  { icon: Truck, title: "Free Shipping", detail: `On orders above ${formatPrice(site.freeShippingThreshold)}`, tone: "group-hover:bg-butter" },
  { icon: RotateCcw, title: "Easy Returns", detail: "7 days, no awkward questions", tone: "group-hover:bg-mint" },
  { icon: ShieldCheck, title: "Secure Payments", detail: "UPI, cards & COD", tone: "group-hover:bg-lavender" },
  { icon: Gift, title: "Gift Ready Packaging", detail: "Wrapped with a handwritten note", tone: "group-hover:bg-pink" },
];

export function BenefitsStrip() {
  return (
    <section aria-label="Why shop with us" className="border-y border-line bg-cream-100">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, detail, tone }, i) => (
            <li
              key={title}
              className={[
                "group flex flex-col gap-3 border-line py-6 sm:flex-row sm:items-center sm:gap-4 sm:py-7 lg:justify-center",
                i % 2 === 0 ? "pr-3 sm:pr-6" : "border-l border-line pl-4 sm:pl-6",
                i < 2 ? "border-b border-line lg:border-b-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full border border-ink/10 bg-cream text-ink transition-[background-color,transform,border-color] duration-500 ease-out-soft group-hover:-rotate-6 group-hover:border-transparent ${tone}`}
              >
                <Icon className="size-5" strokeWidth={1.7} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">{title}</span>
                <span className="block text-[13px] leading-snug text-muted">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
