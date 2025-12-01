// app/fonts.ts
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";

// ラテン文字用：Inter
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// 日本語用：Noto Sans JP
export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // よく使いそうなウェイトだけ
  display: "swap",
  variable: "--font-noto-sans-jp",
});
