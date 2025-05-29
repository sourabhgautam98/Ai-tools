"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { text: "Text To Speech", route: "/tools/textToSpeech" },
    { text: "Text To Image", route: "/tools/textToImage" },
    { text: "BackGround Remover", route: "/tools/backGroundRemover" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-yellow-400 transition-all duration-300"
        >
          AI Tools
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:space-x-4">
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-black flex flex-col items-center space-y-4 py-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {pathname !== "/" &&
            navLinks.map(
              (link) =>
                pathname !== link.route && (
                  <Link
                    key={link.route}
                    href={link.route}
                    className="hover:text-yellow-400 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
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