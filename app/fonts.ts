// app/fonts.ts
import { Noto_Sans_JP } from "next/font/google";

// 日本語用：Noto Sans JP
export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});
