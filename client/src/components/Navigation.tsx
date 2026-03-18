/*
 * DESIGN: Dark Academic Editorial — Navigation
 * Slim dark top bar with logo left, links right
 * Red underline slide-in on hover, crimson CTA button
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
        background: scrolled
          ? 'rgba(13, 13, 26, 0.97)'
          : 'rgba(13, 13, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(196, 30, 58, 0.2)' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/CTPRedandWhite_f08ff46d.png"
              alt="Common Thread Publishing"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.5)' }}
              >
                Common Thread
              </div>
              <div
                className="text-sm font-bold tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
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
                className="relative text-sm font-medium tracking-wide transition-colors duration-200 group"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: location === link.href ? '#C41E3A' : 'rgba(245,240,232,0.8)',
                }}
                onMouseEnter={e => {
                  if (location !== link.href) (e.currentTarget as HTMLElement).style.color = '#C41E3A';
                }}
                onMouseLeave={e => {
                  if (location !== link.href) (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.8)';
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
            style={{ color: '#F5F0E8' }}
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
            background: 'rgba(13, 13, 26, 0.98)',
            borderColor: 'rgba(196, 30, 58, 0.2)',
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
                  color: location === link.href ? '#C41E3A' : 'rgba(245,240,232,0.8)',
                  borderColor: 'rgba(255,255,255,0.06)',
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
