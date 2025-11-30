import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Masakazu Sakakibara Portfolio",
  description: "Architecture / Environmental Device / Installation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ja">
      <body className="max-w-[1600px] mx-auto px-6">
        <Header />
        <main className="mt-10">{children}</main>
      </body>
    </html>
  );
}
