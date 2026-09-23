import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Editorial bento layout: the tile pattern repeats every eight categories,
 * mirrored between the top and bottom halves so the grid never feels uniform.
 */
const tileLayout = [
  { className: "col-span-2 md:col-span-4 md:row-span-2 lg:col-span-6 lg:row-span-2", large: true, sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw" },
  { className: "md:col-span-2 lg:col-span-3", sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" },
  { className: "row-span-2 md:row-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2", sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" },
  { className: "md:col-span-3 lg:col-span-3", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { className: "md:col-span-3 lg:col-span-3 lg:row-span-2", sizes: "(min-width: 1024px) 25vw, 50vw" },
  { className: "md:col-span-2 lg:col-span-3", sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" },
  { className: "md:col-span-4 lg:col-span-6 lg:row-span-2", large: true, sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 50vw" },
  { className: "md:col-span-6 lg:col-span-3", sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 100vw, 50vw" },
];

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categories-title" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="categories-title"
            eyebrow="Categories"
            title="Shop Your Mood"
            description="Eight little worlds to wander through — from inky pens to cloud-soft cushions."
            action={{ label: "All categories", href: "/shop" }}
          />
        </Reveal>

        <ul className="grid auto-rows-[172px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:gap-4 md:grid-cols-6 lg:auto-rows-[220px] lg:grid-cols-12 xl:auto-rows-[248px]">
          {categories.map((category, i) => {
            const layout = tileLayout[i % tileLayout.length];
            return (
              <Reveal as="li" key={category.slug} delay={(i % 4) * 0.06} className={cn("min-h-0", layout.className)}>
                <CategoryTile category={category} large={layout.large} sizes={layout.sizes} />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

function CategoryTile({ category, large, sizes }: { category: Category; large?: boolean; sizes: string }) {
  return (
    <Link
      href={category.href}
      className="group relative flex size-full overflow-hidden rounded-2xl bg-cream-200 text-white"
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.06]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-90"
      />
      <span
        aria-hidden
        className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-cream text-ink transition-[transform,opacity] duration-500 ease-out-soft sm:top-4 sm:right-4 lg:translate-y-2 lg:scale-75 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:scale-100 lg:group-hover:opacity-100"
      >
        <ArrowUpRight className="size-5" />
      </span>
      <span className="relative mt-auto flex flex-col p-4 transition-transform duration-500 ease-out-soft sm:p-5 lg:group-hover:-translate-y-1.5">
        <span className="text-[11px] font-medium tracking-[0.14em] text-white/75 uppercase">
          {category.productCount} pieces
        </span>
        <span
          className={cn(
            "mt-1 font-display leading-[1.05] font-semibold tracking-[-0.03em]",
            large ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl",
          )}
        >
          {category.name}
        </span>
        {large && <span className="mt-1.5 hidden text-sm text-white/80 sm:block">{category.blurb}</span>}
      </span>
    </Link>
  );
}
