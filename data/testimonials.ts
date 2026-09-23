import type { Testimonial } from "@/types";
import { images } from "./images";

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya R.",
    location: "Bengaluru",
    avatar: images.avatars.ananya,
    rating: 5,
    quote: "Sent the Little Joy box to my sister. She called me before she'd finished unwrapping it.",
    product: "Little Joy Gift Box",
  },
  {
    id: "t-2",
    name: "Kabir S.",
    location: "Pune",
    avatar: images.avatars.kabir,
    rating: 5,
    quote: "Bought one Midnight Ink pen for myself. Went back for three more as desk gifts for my team.",
    product: "Midnight Ink Pen",
  },
  {
    id: "t-3",
    name: "Meera J.",
    location: "Mumbai",
    avatar: images.avatars.meera,
    rating: 5,
    quote: "Arrived in two days with a handwritten note. The paper takes fountain pen ink with zero bleed.",
    product: "Cherry Bloom Journal",
  },
  {
    id: "t-4",
    name: "Ria D.",
    location: "Delhi",
    avatar: images.avatars.ria,
    rating: 4,
    quote: "Smells exactly like the description. Only wish it came in a bigger size — on my second one already.",
    product: "Slow Sunday Candle",
  },
  {
    id: "t-5",
    name: "Tara M.",
    location: "Hyderabad",
    avatar: images.avatars.tara,
    rating: 5,
    quote: "The pouch is even prettier in person. Fits my phone, keys and a lip balm — that's all I need.",
    product: "Pastel Dream Pouch",
  },
  {
    id: "t-6",
    name: "Nikhil & Aarav",
    location: "Chennai",
    rating: 5,
    quote: "Biscuit the Bear goes everywhere with our son now. Survived two washes and still looks new.",
    product: "Biscuit the Bear",
  },
];
