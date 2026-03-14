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
    { text: "Background Remover", route: "/tools/backGroundRemover" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <style jsx global>{`
        .navbar-glass {
          background: ${isHome ? "rgba(0, 0, 0, 0.25)" : "rgba(10, 10, 20, 0.85)"};
          backdrop-filter: blur(16px) saturate(1.6);
          -webkit-backdrop-filter: blur(16px) saturate(1.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .nav-link {
          position: relative;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }
        .nav-link.active {
          color: #a78bfa;
          background: rgba(167, 139, 250, 0.1);
        }
        .nav-logo {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.3s ease;
        }
        .nav-logo:hover {
          opacity: 0.85;
        }
        .nav-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, #a78bfa, #38bdf8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .hamburger-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
        }
        .hamburger-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(10, 10, 20, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          animation: slideDown 0.25s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu .nav-link {
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          border-radius: 10px;
        }
      `}</style>

      <nav
        className="navbar-glass"
        style={{
          position: isHome ? "fixed" : "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0.75rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon">AI</span>
            <span>AI Tools</span>
          </Link>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
            className="hidden md:flex"
          >
            {!isHome &&
              navLinks.map(
                (link) => (
                  <Link
                    key={link.route}
                    href={link.route}
                    className={`nav-link ${pathname === link.route ? "active" : ""}`}
                  >
                    {link.text}
                  </Link>
                )
              )}
          </div>

          {/* Hamburger – mobile only */}
          {!isHome && (
            <button
              className="hamburger-btn md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isOpen && !isHome && (
          <div className="mobile-menu md:hidden">
            {navLinks.map(
              (link) => (
                <Link
                  key={link.route}
                  href={link.route}
                  className={`nav-link ${pathname === link.route ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </>
  );
}