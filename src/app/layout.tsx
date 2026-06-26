import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MAISON — Crafted Architectural House Plans",
  description:
    "Discover premium, construction-ready architectural designs. A curated catalog of modern villas, luxury homes, bungalows, maisonettes & small homes — designed for modern living.",
  keywords: [
    "house plans",
    "architectural designs",
    "luxury homes",
    "modern villas",
    "maisonettes",
    "bungalows",
    "premium house designs",
  ],
  authors: [{ name: "Maison Studio" }],
  openGraph: {
    title: "MAISON — Crafted Architectural House Plans",
    description:
      "A curated catalog of premium house designs. Walk through designs before you read the specifications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
