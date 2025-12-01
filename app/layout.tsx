import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="w-full m-0 p-0">
        <Header />
        {children}
      </body>
    </html>
  );
}
