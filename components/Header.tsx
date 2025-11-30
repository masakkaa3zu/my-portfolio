import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 flex justify-between items-center border-b border-neutral-200">
      <Link href="/" className="text-lg font-medium">
        MASAKAZU SAKAKIBARA
      </Link>

      <nav className="flex gap-6 text-sm">
        <Link href="/projects" className="hover:underline">Projects</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>
    </header>
  );
}
