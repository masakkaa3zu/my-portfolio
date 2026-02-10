// data/about.ts

export type AboutText = {
  profile: string[];
  activities: string[];
  awards: string[];
};

export const aboutText: Record<"ja" | "en", AboutText> = {
  ja: {
    profile: [
      `2002年 神奈川県生まれ。2025年 慶應義塾大学環境情報学部卒業。
`,
    ],
    activities: [
      ` 自然が作り出す環境と人間が作り出す環境の関係に着目した建築設計・作品制作を行う。`,
    ],
    awards: [
      `2024年 GOOD DESIGN NEW HOPE AWORD 2024 入選。
2025年3月 せんだいデザインリーグ 100 選 / 梱包最優秀賞。
2025年5月 SICF 26 EXHIBITION 出展。`,
    ],
  },
  en: {
    profile: [
      `Born in Kanagawa, Japan, 2002. Graduated from Keio University, Faculty of Environment and Information Studies, 2025.
`,
    ],
    activities: [
      `Focuses on architectural design and artwork exploring the relationship between natural and human-made environments.`,
    ],
    awards: [
      `2024 GOOD DESIGN NEW HOPE AWARD 2024 Selected.
March 2025 Sendai Design League Top 100 / Best Packaging Award.
May 2025 SICF 26 EXHIBITION.`,
    ],
  },
};
