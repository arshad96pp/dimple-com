import type { SocialPost } from "@/types";
import { IMAGES } from "./images";

const INSTAGRAM = "https://instagram.com";

export const socialPosts: SocialPost[] = [
  {
    id: "s-1",
    handle: "@deskdiaries.nik",
    image: { src: IMAGES.socialWashi, alt: "Washi tape and scissors on a teal desk" },
    likes: 2140,
    href: INSTAGRAM,
  },
  {
    id: "s-2",
    handle: "@mochi.and.me",
    image: { src: IMAGES.socialPuppy, alt: "Golden puppy holding a plush toy" },
    likes: 5872,
    href: INSTAGRAM,
  },
  {
    id: "s-3",
    handle: "@sundaysips",
    image: { src: IMAGES.socialLattes, alt: "Friends holding latte art cups together" },
    likes: 1320,
    href: INSTAGRAM,
  },
  {
    id: "s-4",
    handle: "@bakedbyaisha",
    image: { src: IMAGES.socialCupcakes, alt: "Row of cupcakes with mint frosting" },
    likes: 3408,
    href: INSTAGRAM,
  },
  {
    id: "s-5",
    handle: "@plantmom.priya",
    image: { src: IMAGES.socialCactus, alt: "Small cactus in a terracotta pot on pink" },
    likes: 987,
    href: INSTAGRAM,
  },
  {
    id: "s-6",
    handle: "@bloomsforyou",
    image: { src: IMAGES.socialFlowers, alt: "Hands holding a heart-shaped bouquet on pink" },
    likes: 4210,
    href: INSTAGRAM,
  },
];
