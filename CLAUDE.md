# My Portfolio - 榊原昌和 ポートフォリオサイト

## 概要
建築・アート作品のポートフォリオサイト。Next.js (App Router) + Tailwind CSS v4 で構築。

## 技術スタック
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **TypeScript**
- **デプロイ**: Vercel（GitHub `main` ブランチへの push で自動デプロイ）

## ディレクトリ構成
```
app/
  layout.tsx          # 共通レイアウト（Header, Footer, LocaleProvider）
  page.tsx            # トップページ（HeroSlider + ProjectGrid）
  fonts.ts            # Noto Sans JP 定義
  globals.css         # グローバルCSS、Futura フォントクラス定義
  about/page.tsx      # About ページ
  projects/[slug]/page.tsx  # プロジェクト詳細ページ

components/
  Header.tsx          # 固定ヘッダー（ロゴ、言語切替、ハンバーガーメニュー）
  Footer.tsx          # フッター（メール、Instagram リンク）
  HeroSlider.tsx      # トップのフルスクリーンスライダー（featured プロジェクト）
  ProjectGrid.tsx     # プロジェクト一覧グリッド
  ProjectCard.tsx     # プロジェクトカード（4カラムグリッド内）
  ProjectDetailContent.tsx  # プロジェクト詳細の Client Component
  DevGridOverlay.tsx  # 開発用グリッドオーバーレイ

contexts/
  LocaleContext.tsx   # 日英切替コンテキスト（localStorage に保存）

data/
  projects.json       # プロジェクトデータ（JSON）
  projects.ts         # Project 型定義 + エクスポート
  about.ts            # About ページテキスト（日英）
  translations.ts     # 共通翻訳文字列
```

## レイアウトシステム
- **4カラムグリッド**が基本レイアウト
- 余白: `px-6`(SP) / `px-8`(md) / `px-16`(lg)
- gap: `gap-x-6`(SP) / `gap-x-8`(md) / `gap-x-16`(lg)

## フォント設計
- **Futura Light (`font-futura-light`)**: タイトル、ナビ、ロゴなど目立つ英語テキスト
- **Futura (`font-futura`)**: カテゴリ、年、ラベルなど小さい英語テキスト
- **Noto Sans JP（デフォルト）**: 日本語本文
- Futura は Adobe Fonts (TypeKit) 経由で読み込み: `https://use.typekit.net/uqa5hvt.css`
- フォントクラスは `globals.css` で定義（Tailwind ユーティリティではなくカスタムCSS）

## 多言語対応
- `LocaleContext` で `ja` / `en` を管理
- Header の言語切替ボタンでトグル
- `LocalizedString` 型: `{ ja: string; en: string }`
- プロジェクトの `category`, `description` が多言語対応済み
- `title` は英語固定（切替なし）

## プロジェクトの追加方法
1. `public/projects/<slug>/` に画像を配置（`hero.jpg` + 詳細画像）
2. `data/projects.json` にエントリを追加:
```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "category": { "ja": "カテゴリ", "en": "Category" },
  "year": "2025",
  "thumbnail": "/projects/project-slug/hero.jpg",
  "featured": false,
  "focus": "center",
  "images": ["/projects/project-slug/01.jpg"],
  "description": { "ja": "説明文", "en": "Description" }
}
```
3. `featured: true` にするとトップのスライダーに表示される
4. `focus` はスライダー画像の表示位置: `"center"` / `"top"` / `"bottom"` / `"bottom-zoom"`

## デプロイ手順
1. 変更をコミット: `git add <files> && git commit -m "メッセージ"`
2. push: `git push origin main`
3. Vercel が自動でビルド・デプロイ（通常1〜2分）
4. デプロイ状況は Vercel ダッシュボードで確認

## 注意事項
- `DevGridOverlay` は開発用。本番で非表示にするには `app/layout.tsx` の `SHOW_DEV_GRID` を `false` に
- `nul` ファイル（ルート直下）は Windows の誤生成ファイル、削除可
