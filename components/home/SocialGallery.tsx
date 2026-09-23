import Image from "next/image";
import { Heart } from "lucide-react";
import { site } from "@/data/site";
import type { SocialPost } from "@/types";
import { formatCompact } from "@/lib/utils";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SocialGallery({ posts }: { posts: SocialPost[] }) {
  return (
    <section aria-labelledby="social-title" className="bg-cream-100 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading id="social-title" eyebrow="@dimple.goods" title="Spotted On The Feed" description="Little things worth sharing." />
        </Reveal>
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.id} delay={i * 0.05} className={i % 2 === 1 ? "lg:translate-y-8" : undefined}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-cream-200"
              >
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 32vw, 48vw"
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.08]"
                />
                <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition-opacity duration-300 lg:opacity-0">
                  <InstagramIcon className="size-4" />
                </span>
                <span className="absolute inset-0 hidden flex-col items-center justify-center gap-2 bg-ink/45 text-cream opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex">
                  <InstagramIcon className="size-7" />
                  <span className="text-xs font-medium">{post.handle}</span>
                  <span className="mt-1 rounded-full bg-cream px-4 py-1.5 text-xs font-semibold text-ink">View post</span>
                </span>
                <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-ink/55 px-2 py-1 text-[11px] font-medium text-cream backdrop-blur-sm lg:hidden">
                  <Heart className="size-3 fill-current" aria-hidden />
                  {formatCompact(post.likes)}
                </span>
                <span className="sr-only">
                  View post by {post.handle}, {post.likes} likes (opens Instagram)
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <div className="mt-14 flex justify-center lg:mt-20">
          <Button href={site.instagram} target="_blank" rel="noreferrer" variant="outline" size="lg">
            <InstagramIcon className="size-4" /> Follow @dimple.goods
          </Button>
        </div>
      </Container>
    </section>
  );
}
