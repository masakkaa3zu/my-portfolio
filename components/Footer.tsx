// components/Footer.tsx
export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-6 md:px-8 lg:px-16 py-16 font-futura-light text-sm tracking-wide"
    >
      <div className="space-y-3">
        <p>
          <a
            href="mailto:sakakibaramasakazu@gmail.com"
            className="hover:opacity-60 transition-opacity"
          >
            sakakibaramasakazu@gmail.com
          </a>
        </p>
        <p>
          <a
            href="https://www.instagram.com/masakkaa3zu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}
