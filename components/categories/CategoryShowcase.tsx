import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard, type CategoryCardVariant } from "./CategoryCard";

/**
 * Editorial slots, in the order of `data/categories.ts`:
 * one feature, two tall portraits, one wide band, four pastel chips.
 */
const slots: { variant: CategoryCardVariant; className: string; sizes: string }[] = [
  {
    variant: "feature",
    className: "col-span-2 row-span-2 md:col-span-4 lg:col-span-6 lg:row-span-3",
    sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw",
  },
  {
    variant: "tall",
    className: "row-span-2 md:col-span-2 lg:col-span-3",
    sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  },
  {
    variant: "tall",
    className: "row-span-2 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-2",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    variant: "wide",
    className: "col-span-2 md:col-span-3 lg:col-span-6",
    sizes: "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw",
  },
  { variant: "chip", className: "md:col-span-3 lg:col-span-3", sizes: "" },
  { variant: "chip", className: "md:col-span-3 lg:col-span-3", sizes: "" },
  { variant: "chip", className: "md:col-span-3 lg:col-span-3", sizes: "" },
  { variant: "chip", className: "md:col-span-3 lg:col-span-3", sizes: "" },
];

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section aria-labelledby="categories-title" className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="categories-title"
            eyebrow="Categories"
            title="Shop By Mood"
            description="Find something lovely for every little moment."
            action={{ label: "Browse all", href: "/shop" }}
          />
        </Reveal>

        <ul className="grid auto-rows-[136px] grid-cols-2 gap-2.5 min-[480px]:auto-rows-[168px] sm:gap-4 md:auto-rows-[172px] md:grid-cols-6 lg:auto-rows-[168px] lg:grid-cols-12 xl:auto-rows-[184px]">
          {categories.slice(0, slots.length).map((category, i) => {
            const slot = slots[i];
            return (
              <Reveal as="li" key={category.slug} delay={(i % 4) * 0.06} scale className={cn("min-h-0", slot.className)}>
                <CategoryCard category={category} variant={slot.variant} sizes={slot.sizes} />
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
