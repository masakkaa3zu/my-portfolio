// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import DevGridOverlay from "@/components/DevGridOverlay";
import { notoSansJp } from "./fonts";

const SHOW_DEV_GRID = true;

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
        <Header />
        {SHOW_DEV_GRID && <DevGridOverlay />}
        {children}
      </body>
    </html>
  );
}
