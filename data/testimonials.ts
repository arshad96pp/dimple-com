import type { Testimonial } from "@/types";
import { IMAGES } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya R.",
    location: "Bengaluru",
    avatar: IMAGES.avatarAnanya,
    rating: 5,
    quote:
      "Ordered the Little Joy box for my sister's birthday and she called me before she'd even finished unwrapping it. The packaging alone felt like a present.",
    product: "Little Joy Gift Box",
  },
  {
    id: "t-2",
    name: "Kabir S.",
    location: "Pune",
    avatar: IMAGES.avatarKabir,
    rating: 5,
    quote:
      "I'm not a stationery person. Or I wasn't. The Midnight Ink pen is now the only pen I use and I've bought three more as desk gifts for my team.",
    product: "Midnight Ink Pen",
  },
  {
    id: "t-3",
    name: "Meera J.",
    location: "Mumbai",
    avatar: IMAGES.avatarMeera,
    rating: 5,
    quote:
      "Arrived in two days, beautifully wrapped, with a handwritten note. The Cherry Bloom journal paper is thick enough for my fountain pens — no bleed at all.",
    product: "Cherry Bloom Journal",
  },
  {
    id: "t-4",
    name: "Ria D.",
    location: "Delhi",
    avatar: IMAGES.avatarRia,
    rating: 4,
    quote:
      "The Slow Sunday candle smells exactly like the description promised. Only wish it came in a bigger size — I'm already on my second one.",
    product: "Slow Sunday Candle",
  },
];
