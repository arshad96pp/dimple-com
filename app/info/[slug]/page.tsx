import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { infoPages } from "@/data/infoPages";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const dynamicParams = false;

export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/info/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = infoPages.find((p) => p.slug === slug);
  return page ? { title: page.title, description: page.intro } : {};
}

export default async function InfoPage({ params }: PageProps<"/info/[slug]">) {
  const { slug } = await params;
  const page = infoPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <Container size="narrow" className="py-16 sm:py-24">
      <p className="mb-3 eyebrow">Help &amp; info</p>
      <h1 className="text-[2.8rem] leading-none sm:text-7xl">{page.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{page.intro}</p>
      <dl className="mt-12 divide-y divide-line border-y border-line">
        {page.sections.map((s) => (
          <div key={s.heading} className="grid gap-2 py-7 sm:grid-cols-3 sm:gap-8">
            <dt className="font-display text-lg font-semibold">{s.heading}</dt>
            <dd className="text-[15px] leading-relaxed text-muted sm:col-span-2">{s.body}</dd>
          </div>
        ))}
      </dl>
      <Button href="/shop" variant="outline" className="mt-12" withArrow>
        Back to shopping
      </Button>
    </Container>
  );
}
