// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const { locale, toggleLocale } = useLocale();

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 1;
      setIsOnHero(window.scrollY < heroHeight);
    };

    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    } else {
      setIsOnHero(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const color = isHome && isOnHero ? "text-white" : "text-black";
  // ★ 追加：背景色を切り替えるクラス
  const headerBg = isHome && isOnHero ? "bg-transparent" : "bg-white";

  return (
    <>
      {/* ===== Fixed Header ===== */}
      <header
        className={`
          fixed top-0 left-0 w-full 
          flex items-center justify-between
          px-6 md:px-8 lg:px-16
          py-5 
          text-sm tracking-wide 
          z-50
          transition-colors duration-500
          ${color}
          ${headerBg}  /* ★ ここで背景を適用 */
        `}
      >
        {/* 左：ホームリンク */}
        <Link
          href="/"
          className={`font-futura-light hover:opacity-70 transition-opacity ${color}`}
        >
          Masakazu Sakakibara
        </Link>

        {/* 右：言語切替 + ハンバーガー */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className={`text-[10px] font-futura-light opacity-50 hover:opacity-100 transition-opacity ${color}`}
          >
            {locale === "ja" ? "EN" : "JP"}
          </button>
        <button onClick={() => setOpen(!open)} className="relative w-6 h-5">
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "rotate-45 -translate-y-1/2" : "-translate-y-2"}
            `}
          />
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "opacity-0" : "-translate-y-1/2"}
            `}
          />
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "-rotate-45 -translate-y-1/2" : "translate-y-2"}
            `}
          />
        </button>
        </div>
      </header>

      {/* ===== Fullscreen Menu ===== */}
      <div
        className={`
          fixed inset-0 bg-black/30 text-white 
          flex flex-col items-center justify-center
          space-y-10 text-sm tracking-widest
          transform transition-all duration-500
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          z-40
        `}
      >
        <Link
          href="/about"
          onClick={() => setOpen(false)}
          className="font-futura-light hover:opacity-60"
        >
          ABOUT
        </Link>

        <a
          href="/#projects"
          onClick={(e) => {
            setOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="font-futura-light hover:opacity-60"
        >
          PROJECTS
        </a>

        <a
          href="/#contact"
          onClick={(e) => {
            setOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="font-futura-light hover:opacity-60"
        >
          CONTACT
        </a>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-white/50 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
