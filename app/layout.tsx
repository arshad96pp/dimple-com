import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { site } from "@/data/site";
import { getCategories, getProducts } from "@/lib/catalog";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { QuickViewModal } from "@/components/products/QuickViewModal";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cute stationery, thoughtful gifts & everyday joy`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["cute stationery", "gifts", "journals", "desk accessories", "gift boxes", "India"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Little things. Big smiles.`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "A gift wrapped in kraft paper and candy-stripe twine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Little things. Big smiles.`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf8",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, suggestions] = await Promise.all([
    getCategories(),
    getProducts({ collection: "best-sellers", limit: 4 }),
  ]);

  return (
    <html lang="en-IN" className={`${dmSans.variable} ${sora.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[80] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Header categories={categories} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay suggestions={suggestions} />
          <QuickViewModal />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
