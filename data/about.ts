// data/about.ts

export type AboutText = {
  profile: string[];
  activities: string[];
  awards: string[];
};

export const aboutText: AboutText = {
  profile: [
    `榊原 正和 / Masakazu Sakakibara。神奈川県在住。
建築、環境工学、デジタルファブリケーションを横断しながら、
物理現象と空間体験を結びつけるプロジェクトを行っています。
慶應義塾大学湘南藤沢キャンパス（SFC）にて環境情報学を専攻し、
熱や空気の流れといった見えにくい環境現象を扱う
建築・インスタレーションに取り組んでいます。`,
  ],

  activities: [
    `建築設計事務所やファッションブランドのプロジェクトに携わりながら、
ヒートポンプを用いた温熱環境装置の制作、環境シミュレーション、
CLO3D を用いた衣服設計とパターン最適化などを行ってきました。
Algorithmic Design Lab や Algorithmic Couture Lab では、
建築とファッションを横断するリサーチと実装に関わっています。`,
  ],

  awards: [
    `学内外の建築・デザインコンペティションやワークショップに参加し、
環境現象をテーマにした提案や、デジタルツールを活用した制作プロセスが
評価されてきました。受賞歴や成果物は、本サイト内のプロジェクトページで
順次整理していく予定です。`,
  ],
};
