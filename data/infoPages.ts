export interface InfoPage {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const infoPages: InfoPage[] = [
  {
    slug: "shipping",
    title: "Shipping",
    intro: "Every order is packed by hand in our Bengaluru studio and usually leaves within 24 hours.",
    sections: [
      { heading: "Delivery times", body: "Metro cities: 2–4 working days. Everywhere else: 4–7 working days. You'll get a tracking link by email and SMS the moment your parcel ships." },
      { heading: "Costs", body: "Free on orders above ₹1,499. Below that, a flat ₹79 anywhere in India." },
      { heading: "Gift orders", body: "Shipping straight to someone special? Add a note at checkout — we'll handwrite it and leave prices out of the box." },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    intro: "If something isn't quite right, we'll make it right.",
    sections: [
      { heading: "7-day returns", body: "Return unused items in original packaging within 7 days of delivery for a full refund to your original payment method." },
      { heading: "How to start", body: "Email hello@dimple.example.com with your order number. We'll arrange a free pickup within 48 hours." },
      { heading: "Exceptions", body: "For hygiene reasons, opened beauty products and personalised items can't be returned unless they arrived damaged." },
    ],
  },
  {
    slug: "faq",
    title: "FAQ",
    intro: "Quick answers to the questions we hear most.",
    sections: [
      { heading: "Do you offer gift wrapping?", body: "Yes — every order arrives gift-ready, and you can add a handwritten note for free at checkout." },
      { heading: "Is cash on delivery available?", body: "COD is available on orders up to ₹5,000 across most pin codes." },
      { heading: "Do you ship internationally?", body: "Not yet! We're working on it — join the newsletter to hear first." },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    intro: "Real humans, happy to help. We reply within one working day.",
    sections: [
      { heading: "Email", body: "hello@dimple.example.com" },
      { heading: "WhatsApp", body: "+91 98765 43210 · Mon–Sat, 10am–7pm IST" },
      { heading: "Studio", body: "12, 4th Cross, Indiranagar, Bengaluru 560038 (by appointment)" },
    ],
  },
  {
    slug: "our-story",
    title: "Our Story",
    intro: "Dimple started with a shoebox of stickers and a belief that small things can make a big difference to a day.",
    sections: [
      { heading: "Why little things", body: "A good pen, a pretty notebook, a candle that smells like Sunday — they're tiny, but they show up for you every single day." },
      { heading: "How we make them", body: "We design in-house and work with small makers across India, choosing better materials and fewer, more thoughtful products." },
      { heading: "What's next", body: "More colours, more collaborations and, one day, a little shop you can visit in person." },
    ],
  },
  {
    slug: "journal",
    title: "Journal",
    intro: "Gift guides, desk tours and small rituals — our journal is coming soon.",
    sections: [
      { heading: "Coming up", body: "The Under-₹999 Gift Guide · A Week of Slow Mornings · Five Desks We Love." },
    ],
  },
];
