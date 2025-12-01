"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aboutText } from "@/data/about";

export default function AboutPage() {
  const summaryRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState(0);      // テキストブロックの margin-top
  const [isOpen, setIsOpen] = useState(false);  // トグル開閉
  const [isHover, setIsHover] = useState(false); // hover 状態

  // ===========================
  // 「Masakazu Sakakibara」を 1/3 線にロック
  // ===========================
  useEffect(() => {
    let frame: number | null = null;

    const alignToOneThird = (iter: number = 0) => {
      if (!summaryRef.current) return;

      const width = window.innerWidth;
      if (width < 1024) {
        // モバイルは自然なフロー
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

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <main
      className="
        w-full
        px-6 md:px-8 lg:px-16
        min-h-screen
        pt-24 md:pt-28 pb-32
        lg:pt-0 lg:pb-0
      "
    >
      <section
        className="
          w-full
          grid
          grid-cols-1
          lg:grid-cols-4
          gap-y-12
          gap-x-6 md:gap-x-8 lg:gap-x-16
          items-start
        "
      >
        {/* 1列目：PC では余白 */}
        <div className="hidden lg:block" />

        {/* 2–3列目：ABOUT + 名前トグル + テキスト */}
        <div
          className="
            lg:col-span-2
            space-y-3 md:space-y-4
          "
          style={{ marginTop: offset }}  // 1/3 線にロック
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
            ABOUT
          </p>

          {/* ===== トグル（hoverで写真＆文字スケール / clickで開く） ===== */}
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
                  text-2xl md:text-[28px] font-light tracking-[0.12em]
                  transition-transform duration-300 ease-out origin-left
                  ${isHover || isOpen ? "scale-[1.05]" : "scale-100"}
                `}
              >
                Masakazu Sakakibara
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

            {/* 高さ & フェード & 上下アニメーション付き本文 */}
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
                {/* profile 段落 */}
                {aboutText.profile.map((paragraph, i) => (
                  <p key={`profile-${i}`}>{paragraph}</p>
                ))}

                {/* activities 段落 */}
                {aboutText.activities.map((paragraph, i) => (
                  <p key={`activities-${i}`}>{paragraph}</p>
                ))}

                {/* awards 段落 */}
                {aboutText.awards.map((paragraph, i) => (
                  <p key={`awards-${i}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4列目：写真（hover or open でフェードイン） */}
        <div className="mt-10 lg:mt-0">
          <div className="flex justify-start lg:justify-end">
            <div
              className={`
                relative
                w-full
                max-w-[320px] lg:max-w-none
                overflow-hidden
                bg-neutral-100
                h-auto
                lg:h-[33.333vh]
                lg:mt-[33.333vh]
                transition-opacity duration-500 ease-out
                ${isHover || isOpen ? "opacity-100" : "opacity-0"}
              `}
            >
              <Image
                src="/about/profile.jpg"   // 実際のパスに合わせて
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
