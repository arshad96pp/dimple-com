import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CollageTile } from "@/data/merchandising";
import { cn } from "@/lib/utils";
import { SparkleDoodle } from "@/components/icons/Doodles";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Magazine spread on a 12-column grid (lg):
 *   large · tall portrait · square
 *   small · note          · wide
 * On mobile it reflows into a two-column stack with the portrait beside the square.
 */
const slots = [
  { className: "col-span-2 row-span-2 lg:col-span-5 lg:col-start-1 lg:row-start-1", sizes: "(min-width: 1024px) 42vw, 100vw", size: "lg" },
  { className: "row-span-3 lg:col-span-3 lg:col-start-6 lg:row-start-1", sizes: "(min-width: 1024px) 25vw, 50vw", size: "md" },
  { className: "row-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-1", sizes: "(min-width: 1024px) 33vw, 50vw", size: "md" },
  { className: "lg:col-span-2 lg:col-start-1 lg:row-start-3", sizes: "(min-width: 1024px) 17vw, 50vw", size: "sm" },
  { className: "col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-3", sizes: "(min-width: 1024px) 33vw, 100vw", size: "md" },
] as const;

export function EditorialCollage({ tiles }: { tiles: CollageTile[] }) {
  return (
    <section aria-labelledby="collage-title" className="pb-20 sm:pb-28">
      <Container>
        <ul className="grid auto-rows-[128px] grid-cols-2 gap-2.5 min-[480px]:auto-rows-[160px] sm:gap-4 lg:auto-rows-[184px] lg:grid-cols-12 xl:auto-rows-[204px]">
          {tiles.slice(0, slots.length).map((tile, i) => {
            const slot = slots[i];
            return (
              <Reveal as="li" key={tile.id} delay={i * 0.06} scale className={cn("min-h-0", slot.className)}>
                <Link href={tile.href} className="group relative flex size-full overflow-hidden rounded-[22px] bg-sand sm:rounded-[26px]">
                  <Image
                    src={tile.image.src}
                    alt={tile.image.alt}
                    fill
                    sizes={slot.sizes}
                    style={{ objectPosition: tile.image.position }}
                    className="object-cover transition-transform duration-[1100ms] ease-out-soft group-hover:scale-[1.04]"
                  />
                  <span className="relative mt-auto p-2.5 sm:p-3">
                    <span className="flex items-center gap-2 rounded-full bg-paper/92 py-1.5 pr-2.5 pl-3.5 backdrop-blur-md transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 sm:py-2 sm:pl-4">
                      <span className="flex flex-col leading-tight">
                        {slot.size !== "sm" && (
                          <span className="hidden text-[10px] tracking-[0.16em] text-muted uppercase sm:block">{tile.kicker}</span>
                        )}
                        <span className={cn("font-display tracking-[-0.03em] text-ink", slot.size === "lg" ? "text-base sm:text-xl" : "text-[13px] sm:text-base")}>
                          {tile.caption}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}

          {/* Editor's note — the only text tile, sits between small and wide on desktop */}
          <Reveal
            as="li"
            delay={0.3}
            className="order-first col-span-2 row-span-2 min-h-0 min-[480px]:row-span-1 lg:order-none lg:col-span-3 lg:col-start-3 lg:row-start-3"
          >
            <div className="relative flex size-full flex-col justify-between overflow-hidden rounded-[22px] bg-lavender-50 p-5 sm:rounded-[26px] lg:p-6">
              <SparkleDoodle aria-hidden className="absolute top-5 right-5 size-6 text-ink/60" />
              <p className="eyebrow">The little joy edit</p>
              <div>
                <h2 id="collage-title" className="text-2xl leading-[1.05] tracking-[-0.04em] sm:text-[1.75rem]">
                  Styled by us,
                  <br />
                  loved by you.
                </h2>
                <Link
                  href="/shop"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink underline decoration-ink/25 underline-offset-[5px] hover:decoration-ink"
                >
                  Shop the edit <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
