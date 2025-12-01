"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import projects from "@/data/projects.json";

export default function HeroSlider() {
  const featured = projects.filter((p) => p.featured);

  // クローン方式で無限ループ
  const slides = [
    featured[featured.length - 1], // 末尾クローン
    ...featured,
    featured[0],                   // 先頭クローン
  ];

  const [index, setIndex] = useState(1); // 最初は実スライド0
  const [animating, setAnimating] = useState(true);

  const DURATION = 1000;   // スライドアニメーション
  const INTERVAL = 10000;  // 停止時間

  // =====================================
  //    自動スライド
  // =====================================
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [index]);

  // 次へ
  const nextSlide = () => {
    setIndex((prev) => prev + 1);
    setAnimating(true);
  };

  // インジケータクリック
  const goTo = (realIndex: number) => {
    setIndex(realIndex + 1); // クローン分 +1
    setAnimating(true);
  };

  // ループ調整（クローン → 実スライドへ瞬間移動）
  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setAnimating(false);
      setIndex(1);
    }
    if (index === 0) {
      setAnimating(false);
      setIndex(featured.length);
    }
  };

  // =====================================
  //    focusMode によって構図を変える
  // =====================================
  const getImageStyle = (slide: any): React.CSSProperties => {
    const mode = slide.focus || "center";

    if (mode === "bottom-zoom") {
      return {
        objectPosition: "center bottom",
        transformOrigin: "bottom center",
        transform: "scale(1.2)",
      };
    }

    if (mode === "top") {
      return {
        objectPosition: "center top",
      };
    }

    if (mode === "bottom") {
      return {
        objectPosition: "center bottom",
      };
    }

    return {
      objectPosition: "center center",
    };
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none">

      {/* ===================================== */}
      {/*           スライドトラック                */}
      {/* ===================================== */}
      <div
        className="absolute inset-0 flex"
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${index * 100}vw)`,
          transition: animating
            ? `transform ${DURATION}ms ease-in-out`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((p, i) => (
          <div key={i} className="relative w-screen h-screen flex-shrink-0">

            {/* 画像 */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                className="object-cover"
                style={getImageStyle(p)}
                priority={i === 1}
              />
            </div>

            {/* タイトル（クローンを除外） */}
            {i !== 0 && i !== slides.length - 1 && (
              <div className="absolute bottom-10 left-6 md:left-8 lg:left-16 text-white z-20">
                <p className="text-[8px] opacity-80 tracking-widest uppercase">
                  {p.category}
                </p>
                <h1 className="text-sm font-light mt-1">
                  {p.title}
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

      {/* ===================================== */}
      {/*           インジケータ（短い線）           */}
      {/* ===================================== */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {featured.map((_, realIndex) => {
          const displayIndex =
            index === 0
              ? featured.length - 1
              : index === slides.length - 1
              ? 0
              : index - 1;

          return (
            <button
              key={realIndex}
              onClick={() => goTo(realIndex)}
              className={`
                h-[2px] w-5 transition-all duration-300
                ${
                  displayIndex === realIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }
              `}
            />
          );
        })}
      </div>
    </section>
  );
}
