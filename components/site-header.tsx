"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Foxhounds", href: "/foxhounds" },
  { name: "Registered Litters", href: "/litters" },
  { name: "Friends of the Foxhound", href: "/friends" },
  { name: "Available Hounds", href: "/available" },
  { name: "Adopted Hounds", href: "/adopted" },
  { name: "Events", href: "/events" },
  { name: "Documents", href: "/documents" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500&family=IM+Fell+English:ital@0;1&display=swap');

        .hdr {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          transition: box-shadow 0.4s ease;
          background: #fff;
          
        }

        .hdr.scrolled {
          box-shadow: 0 1px 0 #e5e7eb, 0 4px 24px rgba(0,0,0,0.06);
        }

        .hdr-rule {
          height: 2px;
          background: linear-gradient(90deg, transparent, #dc2626 25%, #aaa 50%, #dc2626 75%, transparent);        }

        .hdr-inner {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hdr-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 0 0.55rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: inherit;
        }

        .hdr-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #111111;
          background: #ffffff;
          box-shadow:
            inset 0 0 0 3px #ffffff,
            inset 0 0 0 4px #cccccc;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .hdr-logo:hover .hdr-badge {
          transform: scale(1.07) rotate(-3deg);
        }

        .hdr-badge svg {
          width: 20px;
          height: 20px;
          color: #111111;
        }

        .hdr-wordmark {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .hdr-name {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: red;       
         }

        .hdr-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6b7280;
        }

        .hdr-ornament {
          font-family: 'IM Fell English', serif;
          font-size: 1.1rem;
          color: #bbbbbb;
          letter-spacing: 0.3em;
          user-select: none;
        }

        .hdr-cta {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.42rem 1.1rem;
          border: 1px solid #111111;
          border-radius: 2px;
          color: #111111;
          background: transparent;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
          white-space: nowrap;
        }

        .hdr-cta:hover {
          background: red;
          color: white;
        }

        .hdr-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #111111;
          padding: 0.2rem;
        }

        .hdr-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.38rem 0;
        }

        .hdr-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.875rem;
          letter-spacing: 0.06em;
          color: #6b7280;
          text-decoration: none;
          padding: 0.22rem 0.9rem;
          position: relative;
          transition: color 0.2s ease;
          white-space: nowrap;
          
        }

        .hdr-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: #111111;
          transition: width 0.28s ease;
        }

        .hdr-link:hover {
          color: red;
        }

        .hdr-link:hover::after {
          width: 55%;
        }

        .hdr-sep {
          color: #bbbbbb;
          font-size: 0.42rem;
          flex-shrink: 0;
          user-select: none;
        }

        .hdr-mobile {
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          overflow: hidden;
        }

        .hdr-mobile-inner {
          padding: 1.25rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .hdr-mobile-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: #6b7280;
          text-decoration: none;
          padding: 0.55rem 0;
          border-bottom: 1px solid #e5e7eb;
          letter-spacing: 0.03em;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hdr-mobile-link::before {
          content: '—';
          font-style: normal;
          font-size: 0.65rem;
          color: #111111;
          opacity: 0;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }

        .hdr-mobile-link:hover {
          color: #111111;
          padding-left: 0.4rem;
        }

        .hdr-mobile-link:hover::before {
          opacity: 1;
        }

        .hdr-mobile-cta {
          margin-top: 1.5rem;
          font-family: 'Cinzel', serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.75rem 2rem;
          border: 1px solid #111111;
          border-radius: 2px;
          color: #111111;
          background: transparent;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s ease, color 0.2s ease;
          display: block;
        }

        .hdr-mobile-cta:hover {
          background: #111111;
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .hdr-nav, .hdr-ornament, .hdr-cta { display: none; }
          .hdr-toggle { display: flex; }
        }

        @media (min-width: 901px) {
          .hdr-mobile { display: none !important; }
        }
      `}</style>

      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="hdr-rule" />

        <div className="hdr-inner">

          {/* TOP ROW */}
          <div className="hdr-top">

            <Link href="/" className="hdr-logo">
              <div className="hdr-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2.5-3.5 4.5C3 9 4 10 4 10H3v2h.5L5 21h3l1-5h2l1 5h3l.5-8.5c.5-.5 1.5-1.5 1.5-3s-1-2.5-1-2.5L16 6l-1.5-1-1 1.5L12 5l-2 .172Z"/>
                </svg>
              </div>
              <div className="hdr-wordmark">
                <span className="hdr-name">Bird Kennel</span>
                <span className="hdr-sub">Ruffin, NC</span>
              </div>
            </Link>

            <span className="hdr-ornament" aria-hidden>❧ ❧ ❧</span>

            <Link href="/friends#donate" className="hdr-cta">Donate</Link>

            <button
              className="hdr-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          {/* DESKTOP NAV */}
          <nav className="hdr-nav" aria-label="Main navigation">
            {navigation.map((item, i) => (
              <span key={item.name} style={{ display: "contents" }}>
                <Link href={item.href} className="hdr-link">{item.name}</Link>
                {i < navigation.length - 1 && (
                  <span className="hdr-sep" aria-hidden>●</span>
                )}
              </span>
            ))}
          </nav>

        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="hdr-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="hdr-mobile-inner">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22 }}
                  >
                    <Link
                      href={item.href}
                      className="hdr-mobile-link"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.36 }}
                >
                  <Link
                    href="/friends#donate"
                    className="hdr-mobile-cta"
                    onClick={() => setOpen(false)}
                  >
                    Donate
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  )
}
