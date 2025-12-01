"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // ================================
  // Hero 上かどうか判定
  // ================================
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 1; // 90%までをHero扱い
      setIsOnHero(window.scrollY < heroHeight);
    };

    // ホームのときだけスクロール監視
    if (isHome) {
      window.addEventListener("scroll", handleScroll);
      // 初期位置でも判定しておく
      handleScroll();
    } else {
      // ホーム以外は常に「Heroの外」扱いにしておく
      setIsOnHero(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  // 文字色（白→黒）
  // ホーム("/")では Hero上だけ白、それ以外のページは常に黒
  const color = isHome && isOnHero ? "text-white" : "text-black";

  return (
    <>
      {/* ===== Fixed Header ===== */}
      <header
        className={`
          fixed top-0 left-0 w-full 
          flex items-center justify-between
          px-8 py-5 
          text-sm tracking-wide 
          z-50
          transition-colors duration-500
          ${color}
        `}
      >
        {/* 左：ホームリンク */}
        <Link
          href="/"
          className={`font-light hover:opacity-70 transition-opacity ${color}`}
        >
          MASAKAZU SAKAKIBARA
        </Link>

        {/* 右：ハンバーガー → X */}
        <button onClick={() => setOpen(!open)} className="relative w-6 h-5">
          {/* line 1 */}
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "rotate-45 -translate-y-1/2" : "-translate-y-2"}
            `}
          />

          {/* line 2 */}
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "opacity-0" : "-translate-y-1/2"}
            `}
          />

          {/* line 3 */}
          <span
            className={`
              absolute left-0 top-1/2 w-6 h-[1px] transition-all duration-300 bg-current
              ${open ? "-rotate-45 -translate-y-1/2" : "translate-y-2"}
            `}
          />
        </button>
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
          className="hover:opacity-60"
        >
          ABOUT
        </Link>

        <Link
          href="/projects"
          onClick={() => setOpen(false)}
          className="hover:opacity-60"
        >
          PROJECTS
        </Link>

        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="hover:opacity-60"
        >
          CONTACT
        </Link>
      </div>

      {/* ===== Background overlay ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-white/50 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
