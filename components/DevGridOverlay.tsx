// components/DevGridOverlay.tsx

export default function DevGridOverlay() {
  // 本番では非表示
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* 本体と同じ左右paddingの「コンテンツ領域」 */}
      <div
        className="
          absolute inset-y-0
          left-6 right-6
          md:left-8 md:right-8
          lg:left-16 lg:right-16
        "
      >
        <div className="relative w-full h-full">
          {/* ===== 横ライン（高さ方向）※前と同じ ===== */}
          {/* 2等分（真ん中） */}
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-black/20" />
          {/* 3等分（1/3, 2/3） */}
          <div className="absolute inset-x-0 top-[33.333%] border-t border-dashed border-black/15" />
          <div className="absolute inset-x-0 top-[66.666%] border-t border-dashed border-black/15" />

          {/* ===== 縦方向：4列＋列間マージン ===== */}
          <div
            className="
              grid h-full
              grid-cols-4
              gap-x-6 md:gap-x-8 lg:gap-x-16  /* ★ 列間マージン（ガター） */
            "
          >
            {/* col 1 */}
            <div className="relative h-full">
              <div className="absolute inset-y-0 left-0 border-l border-dashed border-black/15" />
              <div className="absolute inset-y-0 right-0 border-r border-dashed border-black/15" />
            </div>
            {/* col 2 */}
            <div className="relative h-full">
              <div className="absolute inset-y-0 left-0 border-l border-dashed border-black/15" />
              <div className="absolute inset-y-0 right-0 border-r border-dashed border-black/15" />
            </div>
            {/* col 3 */}
            <div className="relative h-full">
              <div className="absolute inset-y-0 left-0 border-l border-dashed border-black/15" />
              <div className="absolute inset-y-0 right-0 border-r border-dashed border-black/15" />
            </div>
            {/* col 4 */}
            <div className="relative h-full">
              <div className="absolute inset-y-0 left-0 border-l border-dashed border-black/15" />
              <div className="absolute inset-y-0 right-0 border-r border-dashed border-black/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
