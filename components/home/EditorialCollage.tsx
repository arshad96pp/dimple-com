import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { collageTiles } from "@/data/merchandising";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Tile = (typeof collageTiles)[number];

/** Magazine layout: tall lead image, two portraits, two landscape strips. */
const layout = [
  { className: "col-span-2 row-span-2 lg:col-span-5 lg:row-span-3", sizes: "(min-width: 1024px) 40vw, 100vw", big: true },
  { className: "row-span-2 lg:col-span-4 lg:row-span-2", sizes: "(min-width: 1024px) 32vw, 50vw" },
  { className: "lg:col-span-3 lg:row-span-2", sizes: "(min-width: 1024px) 24vw, 50vw" },
  { className: "lg:col-span-4", sizes: "(min-width: 1024px) 32vw, 50vw" },
  { className: "col-span-2 lg:col-span-3", sizes: "(min-width: 1024px) 24vw, 100vw" },
];

export function EditorialCollage({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <section aria-labelledby="collage-title" className="pt-4 pb-20 sm:pt-8 sm:pb-28">
      <Container>
        <Reveal className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-12 lg:items-end">
          <h2 id="collage-title" className="text-[2.4rem] leading-[1] font-semibold sm:text-6xl lg:col-span-7 lg:text-7xl">
            The little joy <span className="text-coral">edit</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg lg:col-span-5 lg:justify-self-end">
            Moodboards, desk tours and treat-yourself lists — our favourite corners of the shop, styled the way we&apos;d use them.
          </p>
        </Reveal>

        <ul className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[200px] lg:grid-cols-12 xl:auto-rows-[230px]">
          {tiles.map((tile, i) => {
            const slot = layout[i % layout.length];
            return (
              <Reveal as="li" key={tile.id} delay={i * 0.07} className={cn("min-h-0", slot.className)}>
                <Link href={tile.href} className="group relative flex size-full overflow-hidden rounded-2xl bg-cream-200">
                  <Image
                    src={tile.image.src}
                    alt={tile.image.alt}
                    fill
                    sizes={slot.sizes}
                    className="object-cover transition-transform duration-[1100ms] ease-out-soft group-hover:scale-[1.07]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur-sm sm:top-4 sm:left-4 sm:text-[11px]">
                    {tile.kicker}
                  </span>
                  <span className="relative mt-auto flex w-full items-end justify-between gap-3 p-4 text-white sm:p-5">
                    <span
                      className={cn(
                        "font-display leading-[0.95] font-semibold tracking-[-0.04em] transition-transform duration-500 ease-out-soft group-hover:-translate-y-1",
                        slot.big ? "text-3xl sm:text-5xl" : "text-lg sm:text-3xl",
                      )}
                    >
                      {tile.caption}
                    </span>
                    <ArrowUpRight
                      className="size-6 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
