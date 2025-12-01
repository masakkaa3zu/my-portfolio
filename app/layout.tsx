import "./globals.css";
import Header from "@/components/Header";
import DevGridOverlay from "@/components/DevGridOverlay"; // ← とりあえず残してOK
import { inter, notoSansJp } from "./fonts";

const SHOW_DEV_GRID = true; // ← ここで ON/OFF 切り替え

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJp.variable} w-full m-0 p-0`}
      >
        <Header />
        {SHOW_DEV_GRID && <DevGridOverlay />}  {/* ← false なので今は表示されない */}
        {children}
      </body>
    </html>
  );
}
