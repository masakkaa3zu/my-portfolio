"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aboutText } from "@/data/about";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/data/translations";

export default function AboutPage() {
  const { locale } = useLocale();
  const localAbout = aboutText[locale];
  const summaryRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState(0); // デスクトップ用：テキストブロックの margin-top
  const [isOpen, setIsOpen] = useState(false); // トグル開閉
  const [isHover, setIsHover] = useState(false); // hover 状態（PC・タブレット）
  const [isSmallScreen, setIsSmallScreen] = useState(false); // スマホ幅かどうか

  // ===========================
  // デスクトップ用：「Masakazu Sakakibara」を 1/3 線にロック
  // ===========================
  useEffect(() => {
    let frame: number | null = null;

    const alignToOneThird = (iter: number = 0) => {
      if (!summaryRef.current) return;

      const width = window.innerWidth;
      if (width < 1024) {
        // モバイル・タブレットでは JS 位置合わせをオフ
        if (offset !== 0) setOffset(0);
        return;
      }

      const rect = summaryRef.current.getBoundingClientRect();
      const target = window.innerHeight / 3; // 上から 1/3 の線
      const delta = target - rect.top;

      if (Math.abs(delta) < 0.5 || iter > 5) return;

      setOffset((prev) => prev + delta);
      frame = window.requestAnimationFrame(() => alignToOneThird(iter + 1));
    };

    const handleResize = () => {
      if (frame != null) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => alignToOneThird(0));
    };

    frame = window.requestAnimationFrame(() => alignToOneThird(0));
    window.addEventListener("resize", handleResize);

    return () => {
      if (frame != null) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===========================
  // スマホ幅判定（〜767px をスマホ扱い）
  // ===========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 767px)");
    const listener = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
    };

    // 初期値
    setIsSmallScreen(mq.matches);
    mq.addEventListener("change", listener);

    return () => {
      mq.removeEventListener("change", listener);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // モバイル〜タブレットでの写真表示条件
  // スマホ：isOpen だけで制御（閉じたら必ず閉じる）
  // タブレット：isHover || isOpen（近づいたら出て、開いても出る）
  const showPhotoMobile = isSmallScreen ? isOpen : isHover || isOpen;

  return (
    <main className="w-full min-h-screen">
      {/* ============================= */}
      {/* モバイル〜タブレット用レイアウト */}
      {/* ============================= */}
      <section
        className="
          block lg:hidden
          w-full
          px-6 md:px-8
          pt-[10vh] md:pt-[30vh]   /* SP: 1/4, md: 1/3 付近 */
          pb-24
        "
      >
        {/* ABOUT ＋ ボタン（1/4〜1/3 あたり） */}
        <div className="space-y-3">
          <p className="text-[10px] font-futura tracking-[0.3em] uppercase text-neutral-500">
            ABOUT
          </p>

          <div className="group">
            <button
              onClick={handleToggle}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className="
                flex items-center justify-between gap-4
                cursor-pointer select-none
                w-full text-left
                bg-transparent border-none p-0
              "
              aria-expanded={isOpen}
              type="button"
            >
              <span
                className={`
                  text-2xl font-futura-light tracking-[0.12em]
                  transition-transform duration-300 ease-out origin-left
                  ${isOpen ? "scale-[1.03]" : "scale-100"}
                `}
              >
                {t.name[locale]}
              </span>
              <span
                className={`
                  text-[10px] text-neutral-400
                  transition-transform duration-300 ease-out
                  ${isOpen ? "rotate-45 scale-110" : "rotate-0 scale-100"}
                `}
              >
                +
              </span>
            </button>
          </div>
        </div>

        {/* 写真：ボタンのすぐ下（SP/タブレット） */}
        <div
          className={`
            mt-8
            overflow-hidden
            transition-[max-height,opacity] duration-500 ease-out
            ${showPhotoMobile ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex md:block">
            <div
              className="
                relative
                w-full
                max-w-[500px] md:max-w-[300px]  /* SP: 最大360px, md以上: 最大480px */
                aspect-square                    /* 常に正方形 */
                bg-neutral-100
                overflow-hidden
              "
            >
              <Image
                src="/about/profile.jpg"
                alt="Masakazu Sakakibara portrait"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* テキスト：写真のさらに下にトグルで表示 */}
        <div
          className={`
            overflow-hidden
            transition-[max-height] duration-500 ease-out
            ${isOpen ? "max-h-[1000px] mt-8" : "max-h-0 mt-0"}
          `}
        >
          <div
            className={`
              space-y-3
              text-[13px] leading-relaxed text-neutral-700
              transition-all duration-500 ease-out
              ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
            `}
          >
            {localAbout.profile.map((paragraph, i) => (
              <p key={`profile-sp-${i}`}>{paragraph}</p>
            ))}
            {localAbout.activities.map((paragraph, i) => (
              <p key={`activities-sp-${i}`}>{paragraph}</p>
            ))}
            {localAbout.awards.map((paragraph, i) => (
              <p key={`awards-sp-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* デスクトップ用レイアウト（4カラムグリッド） */}
      {/* ============================= */}
      <section
        className="
          hidden lg:grid
          w-full
          px-16
          min-h-screen
          grid-cols-4
          gap-y-12
          gap-x-16
          items-start
        "
      >
        {/* 1列目：余白 */}
        <div />

        {/* 2–3列目：ABOUT + 名前トグル + テキスト */}
        <div
          className="
            col-span-2
            space-y-3
          "
          style={{ marginTop: offset }} // 1/3 線にロック
        >
          <p className="text-[10px] font-futura tracking-[0.3em] uppercase text-neutral-500">
            ABOUT
          </p>

          <div className="group">
            <button
              ref={summaryRef}
              onClick={handleToggle}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className="
                flex items-center justify-between gap-4
                cursor-pointer select-none
                w-full text-left
                bg-transparent border-none p-0
              "
              aria-expanded={isOpen}
              type="button"
            >
              <span
                className={`
                  text-2xl md:text-[28px] font-futura-light tracking-[0.12em]
                  transition-transform duration-300 ease-out origin-left
                  ${isHover || isOpen ? "scale-[1.05]" : "scale-100"}
                `}
              >
                {t.name[locale]}
              </span>
              <span
                className={`
                  text-[10px] text-neutral-400
                  transition-transform duration-300 ease-out
                  ${isOpen ? "rotate-45" : "rotate-0"}
                  ${isHover || isOpen ? "scale-110" : "scale-100"}
                `}
              >
                +
              </span>
            </button>

            {/* テキスト（デスクトップ用） */}
            <div
              className={`
                mt-12
                overflow-hidden
                transition-[max-height] duration-500 ease-out
                ${isOpen ? "max-h-[1000px]" : "max-h-0"}
              `}
            >
              <div
                className={`
                  space-y-3
                  text-[13px] leading-relaxed text-neutral-700
                  transition-all duration-500 ease-out
                  ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                `}
              >
                {localAbout.profile.map((paragraph, i) => (
                  <p key={`profile-lg-${i}`}>{paragraph}</p>
                ))}
                {localAbout.activities.map((paragraph, i) => (
                  <p key={`activities-lg-${i}`}>{paragraph}</p>
                ))}
                {localAbout.awards.map((paragraph, i) => (
                  <p key={`awards-lg-${i}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4列目：写真（デスクトップ） */}
        <div>
          <div className="flex justify-end">
            <div
              className={`
                relative
                w-full
                max-w-none
                overflow-hidden
                bg-neutral-100
                aspect-[3/4]
                lg:h-[33.333vh]
                lg:mt-[33.333vh]
                transition-opacity duration-500 ease-out
                ${isHover || isOpen ? "opacity-100" : "opacity-0"}
              `}
            >
              <Image
                src="/about/profile.jpg"
                alt="Masakazu Sakakibara portrait"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
