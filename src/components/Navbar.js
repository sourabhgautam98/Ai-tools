"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { text: "Text To Speech", route: "/tools/textToSpeech" },
    { text: "Text To Image", route: "/tools/textToImage" },
    { text: "BackGround Remover", route: "/tools/backGroundRemover" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-yellow-400 transition-all duration-300"
        >
          AI Tools
        </Link>

        <div className="flex space-x-4">
          {pathname !== "/" &&
            navLinks.map(
              (link) =>
                pathname !== link.route && (
                  <Link
                    key={link.route}
                    href={link.route}
                    className="hover:text-yellow-400 transition-all duration-300"
                  >
                    {link.text}
                  </Link>
                )
            )}
        </div>
      </div>
    </nav>
  );
}
