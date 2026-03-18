/*
 * DESIGN: Light Editorial — Navigation
 * White/parchment top bar with logo left, links right
 * Deep navy text, crimson active/hover state, crimson CTA button
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingBag } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/authors', label: 'Authors' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(247, 243, 237, 0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '1px solid rgba(196, 30, 58, 0.18)'
          : '1px solid rgba(26, 26, 46, 0.08)',
        boxShadow: scrolled ? '0 2px 16px rgba(26,26,46,0.07)' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — use the red/black version on light background */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/CTPLogo_5f9b1de2.png"
              alt="Common Thread Publishing"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
              >
                Common Thread
              </div>
              <div
                className="text-sm font-bold tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
              >
                Publishing LLC
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: location === link.href ? '#C41E3A' : 'rgba(26,26,46,0.7)',
                }}
                onMouseEnter={e => {
                  if (location !== link.href) (e.currentTarget as HTMLElement).style.color = '#C41E3A';
                }}
                onMouseLeave={e => {
                  if (location !== link.href) (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.7)';
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    background: '#C41E3A',
                    width: location === link.href ? '100%' : '0%',
                  }}
                />
              </Link>
            ))}
            <a
              href="https://store.commonthreadpublishing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ctp-btn-primary flex items-center gap-2 text-xs"
            >
              <ShoppingBag size={14} />
              Shop Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: '#1A1A2E' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(247, 243, 237, 0.99)',
            borderColor: 'rgba(196, 30, 58, 0.15)',
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-sm font-medium tracking-wide border-b transition-colors"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: location === link.href ? '#C41E3A' : 'rgba(26,26,46,0.75)',
                  borderColor: 'rgba(26,26,46,0.08)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://store.commonthreadpublishing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ctp-btn-primary mt-3 text-center flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} />
              Shop Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
