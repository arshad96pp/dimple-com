"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { site } from "@/data/site";
import type { SocialPost } from "@/types";
import { formatCompact } from "@/lib/utils";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Swipeable on phones and tablets; on desktop all six fit, so Swiper locks
 * itself (watchOverflow) and it reads as a staggered grid.
 */
export function SocialSection({ posts }: { posts: SocialPost[] }) {
  return (
    <section aria-labelledby="social-title" className="overflow-hidden pb-20 sm:pb-28">
      <Container size="wide">
        <Reveal>
          <Carousel
            label="Instagram posts"
            slideClassName="w-[64%] pr-2.5 min-[480px]:w-[42%] sm:w-[30%] sm:pr-4 lg:w-1/6 lg:pr-4 lg:even:pt-10"
            renderHeader={() => (
              <SectionHeading
                id="social-title"
                eyebrow={site.handle}
                title="Made To Be Shared"
                description="Little things that deserve a little attention."
                aside={
                  <Button href={site.instagram} target="_blank" rel="noreferrer" variant="outline" size="sm">
                    <InstagramIcon className="size-4" /> Follow us
                  </Button>
                }
              />
            )}
          >
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-sand"
              >
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 64vw"
                  style={{ objectPosition: post.image.position }}
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10"
                >
                  <span className="grid size-12 scale-90 place-items-center rounded-full bg-paper/90 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-out-soft group-hover:scale-100 group-hover:opacity-100">
                    <InstagramIcon className="size-5" />
                  </span>
                </span>
                <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 text-[11px] font-medium">
                  <span className="truncate rounded-full bg-paper/88 px-2.5 py-1 text-ink backdrop-blur-sm">{post.handle}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-paper/88 px-2 py-1 text-ink backdrop-blur-sm">
                    <Heart className="size-3 fill-berry text-berry" aria-hidden />
                    {formatCompact(post.likes)}
                  </span>
                </span>
                <span className="sr-only">
                  View post by {post.handle}, {post.likes} likes (opens Instagram)
                </span>
              </a>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
