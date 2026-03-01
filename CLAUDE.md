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
- プロジェクトの `title`, `category`, `description` が多言語対応済み

## プロジェクトの追加方法
1. `public/projects/<slug>/` に画像を配置（`hero.jpg` + 詳細画像）
2. `data/projects.json` にエントリを追加:
```json
{
  "slug": "project-slug",
  "title": { "ja": "プロジェクト名", "en": "Project Title" },
  "category": { "ja": "カテゴリ", "en": "Category" },
  "year": "2025",
  "thumbnail": "/projects/project-slug/hero.jpg",
  "featured": false,
  "focus": "center",
  "images": ["/projects/project-slug/01.jpg"],
  "description": { "ja": "説明文", "en": "Description" },
  "collaborators": [{ "ja": "共同設計者名", "en": "Collaborator Name" }],
  "assistants": [{ "ja": "制作補助者名", "en": "Assistant Name" }]
}
```
3. `featured: true` にするとトップのスライダーに表示される
4. `focus` は画像の表示位置（スライダー＋詳細ページ）: `"center"` / `"top"` / `"top-zoom"` / `"bottom"` / `"bottom-zoom"`
5. `collaborators`（共同設計者）、`assistants`（制作補助者）はオプション。詳細ページで年の下に表示される
6. `visible: false` でグリッド・スライダーから非表示にできる（詳細ページは直接URLでアクセス可能）

## デプロイ手順
1. 変更をコミット: `git add <files> && git commit -m "メッセージ"`
2. push: `git push origin main`
3. Vercel が自動でビルド・デプロイ（通常1〜2分）
4. デプロイ状況は Vercel ダッシュボードで確認

## ヘッダーの挙動
- トップページおよびプロジェクト詳細ページでは、ヒーロー画像の範囲内でヘッダーが透明＋白文字になる
- スクロールしてヒーロー画像を過ぎると白背景＋黒文字に切り替わる
- それ以外のページ（About 等）では常に白背景＋黒文字

## 動画の追加方法
- `images` 配列は文字列（画像パス）に加えて `{ "src": "URL", "credit": { "ja": "...", "en": "..." } }` 形式のオブジェクトも対応
- `.mp4` で終わるパスは自動的に `<video>` タグで表示される
- 100MBを超える動画ファイルはGitHubの制限でpushできないため、**GitHub Releases** にアップロードしてURLで参照する
  - リポジトリの Releases (`assets-v1` タグ) にファイルをアップロード
  - `"src": "https://github.com/masakkaa3zu/my-portfolio/releases/download/assets-v1/<filename>"` で参照
- `credit` を指定すると動画の下にクレジットが小さく表示される
- **大容量動画（100MB超）は YouTube（限定公開可）を推奨**
  - YouTube にアップロードし、`youtu.be/XXXX` または `youtube.com/watch?v=XXXX` のURLをそのまま `images` に記載
  - `ProjectDetailContent.tsx` が YouTube URL を自動検出し、16:9のiframeで埋め込む

## 注意事項
- `DevGridOverlay` は開発用。本番で非表示にするには `app/layout.tsx` の `SHOW_DEV_GRID` を `false` に
- `nul` ファイル（ルート直下）は Windows の誤生成ファイル、削除可
- 画像は必ず **RGB** カラーモードで配置すること（CMYKだとブラウザで色がおかしくなる）
- リポジトリは **public** に設定済み（GitHub Releasesの動画URLに外部からアクセスするため）
