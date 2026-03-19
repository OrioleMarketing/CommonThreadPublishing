/*
 * DESIGN: Light Editorial — Navigation
 * White/parchment top bar with logo left, links right
 * Deep navy text, crimson active/hover state, crimson CTA button
 * Cart icon with live item count badge from Shopify Buy SDK
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';

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
  const { cartCount, openCart } = useShopifyCart();

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/CommonThread1_a7f668c9.png"
              alt="Common Thread Publishing LLC"
              className="h-12 md:h-14 w-auto object-contain"
            />
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

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                background: '#C41E3A',
                color: '#ffffff',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#a01830')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#C41E3A')}
              aria-label="Open cart"
            >
              <ShoppingBag size={14} />
              Cart
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
                  style={{ background: '#1A1A2E', color: '#ffffff', fontSize: '0.65rem' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile: Cart icon + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2"
              aria-label="Open cart"
              style={{ color: '#1A1A2E' }}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute top-0 right-0 w-4 h-4 flex items-center justify-center text-xs font-bold rounded-full"
                  style={{ background: '#C41E3A', color: '#ffffff', fontSize: '0.6rem' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ color: '#1A1A2E' }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
            <button
              onClick={() => { openCart(); setMenuOpen(false); }}
              className="ctp-btn-primary mt-3 text-center flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} />
              View Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
