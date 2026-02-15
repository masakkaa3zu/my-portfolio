// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DevGridOverlay from "@/components/DevGridOverlay";
import { notoSansJp } from "./fonts";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Metadata } from "next";

const SHOW_DEV_GRID = true;

const siteUrl = "https://masakazusakakibara.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Masakazu Sakakibara | 榊原昌和",
    template: "%s | Masakazu Sakakibara",
  },
  description:
    "建築・アート作品のポートフォリオ / Portfolio of architecture and art works by Masakazu Sakakibara",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Masakazu Sakakibara | 榊原昌和",
    description:
      "建築・アート作品のポートフォリオ / Portfolio of architecture and art works",
    url: siteUrl,
    siteName: "Masakazu Sakakibara Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "oGUE8IxHYKtRZwA8VmaLNd7bEj-c8sPrfdSyvR20UP8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Adobe Fonts（Futura）のCSS */}
        <link rel="stylesheet" href="https://use.typekit.net/uqa5hvt.css" />
      </head>
      <body className={`${notoSansJp.variable} w-full m-0 p-0`}>
        <LocaleProvider>
          <Header />
          {SHOW_DEV_GRID && <DevGridOverlay />}
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
