import type { SocialPost } from "@/types";
import { images } from "./images";

const INSTAGRAM = "https://instagram.com";

export const socialPosts: SocialPost[] = [
  { id: "s-1", handle: "@bloomsforyou", image: images.social.flowers, likes: 4210, href: INSTAGRAM },
  { id: "s-2", handle: "@mochi.and.me", image: images.social.puppy, likes: 5872, href: INSTAGRAM },
  { id: "s-3", handle: "@bakedbyaisha", image: images.social.cupcakes, likes: 3408, href: INSTAGRAM },
  { id: "s-4", handle: "@deskdiaries.nik", image: images.social.washi, likes: 2140, href: INSTAGRAM },
  { id: "s-5", handle: "@plantmom.priya", image: images.social.cactus, likes: 987, href: INSTAGRAM },
  { id: "s-6", handle: "@tinyhands.club", image: images.social.toys, likes: 1650, href: INSTAGRAM },
];
