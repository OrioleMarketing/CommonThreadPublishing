/*
 * DESIGN: Dark Academic Editorial — Home Page
 * Full-bleed dark hero with library background, featured books staggered grid,
 * parchment about panel, newsletter dark section
 */

import { Link } from 'wouter';
import { ArrowRight, BookOpen, Package, Download } from 'lucide-react';
import { getFeaturedBooks, books } from '@/lib/products';
import BookCard from '@/components/BookCard';
import { useState } from 'react';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/hero_bg_b8112d9c.jpg';
const ABOUT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/about_bg_665970ee.jpg';
const NEWSLETTER_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/newsletter_bg_afae4d46.jpg';

export default function Home() {
  const featuredBooks = getFeaturedBooks();
  const allBooks = books;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(13,13,26,0.92) 0%, rgba(13,13,26,0.75) 50%, rgba(13,13,26,0.45) 100%)',
          }}
        />

        {/* Crimson accent line left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: 'linear-gradient(to bottom, transparent, #C41E3A 30%, #C41E3A 70%, transparent)' }}
        />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Section label */}
            <div className="ctp-section-label mb-6 animate-fade-up">
              ◆ Common Thread Publishing LLC
            </div>

            {/* Main headline */}
            <h1
              className="font-black leading-none mb-6 animate-fade-up-delay-1"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                color: '#F5F0E8',
                lineHeight: 1.05,
              }}
            >
              Unleash
              <br />
              <span style={{ color: '#C41E3A' }}>Your</span>
              <br />
              Story.
            </h1>

            {/* Tagline */}
            <p
              className="text-lg leading-relaxed mb-8 animate-fade-up-delay-2"
              style={{
                fontFamily: 'Lora, serif',
                color: 'rgba(245,240,232,0.75)',
                maxWidth: '480px',
              }}
            >
              Faith-grounded books that challenge, inspire, and connect. From political fiction to biblical scholarship — stories that carry the thread of something greater.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <Link href="/books" className="ctp-btn-primary flex items-center gap-2">
                <BookOpen size={16} />
                Browse All Books
              </Link>
              <a
                href="https://store.commonthreadpublishing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ctp-btn-outline flex items-center gap-2"
              >
                <Package size={16} />
                Visit Our Store
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-12 animate-fade-up-delay-4">
              {[
                { value: '7+', label: 'Titles Published' },
                { value: '4', label: 'Authors' },
                { value: '150+', label: 'Countries Shipped' },
              ].map(stat => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#C41E3A' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.4)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#F5F0E8' }}
          >
            Scroll
          </div>
          <div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #F5F0E8, transparent)' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS — FORMAT BADGES
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-12"
        style={{ background: 'oklch(0.08 0.015 265)', borderBottom: '1px solid rgba(196,30,58,0.15)' }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Print Books',
                desc: 'Printed fresh and shipped directly to your door. Available to readers in over 150 countries within 3–5 business days.',
                label: 'Print on Demand',
              },
              {
                icon: Download,
                title: 'eBooks',
                desc: 'Instant digital delivery. Download your purchase immediately after checkout in PDF or ePub format.',
                label: 'Instant Download',
              },
              {
                icon: BookOpen,
                title: 'Worldwide Delivery',
                desc: 'No inventory, no waste. Every book is printed fresh and shipped directly to your door. Standard shipping rates apply.',
                label: 'Global Shipping',
              },
            ].map(item => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-6"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(196, 30, 58, 0.12)', border: '1px solid rgba(196,30,58,0.3)' }}
                >
                  <item.icon size={18} style={{ color: '#C41E3A' }} />
                </div>
                <div>
                  <div
                    className="text-xs mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', letterSpacing: '0.1em' }}
                  >
                    {item.label}
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8', fontSize: '1rem' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.5)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED BOOKS
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'oklch(0.10 0.015 265)' }}>
        <div className="container">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="ctp-section-label mb-3">◆ Featured Titles</div>
              <h2
                className="font-black"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: '#F5F0E8',
                  lineHeight: 1.1,
                }}
              >
                Stories Worth
                <br />
                <span style={{ color: '#C41E3A' }}>Reading</span>
              </h2>
            </div>
            <Link
              href="/books"
              className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.5)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.5)')}
            >
              View All Books <ArrowRight size={16} />
            </Link>
          </div>

          {/* Featured Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {featuredBooks.map((book, i) => (
              <div
                key={book.id}
                className={i === 0 ? 'md:col-span-1 lg:col-span-1' : ''}
              >
                <BookCard book={book} size={i === 0 ? 'large' : 'default'} />
              </div>
            ))}
          </div>

          {/* View All Link (mobile) */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/books" className="ctp-btn-outline inline-flex items-center gap-2">
              View All Books <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ALL BOOKS PREVIEW
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'oklch(0.12 0.015 265)' }}>
        <div className="container">
          <div className="ctp-section-label mb-3">◆ Complete Catalog</div>
          <div className="flex items-end justify-between mb-10">
            <h2
              className="font-black"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: '#F5F0E8',
              }}
            >
              All Titles
            </h2>
            <span
              className="text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.35)' }}
            >
              {allBooks.length} books available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {allBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ABOUT TEASER — PARCHMENT PANEL
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: `url(${ABOUT_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(13,13,26,0.82)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-xl">
            <div className="ctp-section-label mb-4">◆ Our Mission</div>
            <h2
              className="font-black mb-6"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F5F0E8',
                lineHeight: 1.1,
              }}
            >
              One Thread.
              <br />
              <span style={{ color: '#C41E3A' }}>Countless Stories.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.75)' }}
            >
              Common Thread Publishing LLC was founded on the belief that every story — whether of faith, history, or conviction — carries a thread that connects us to something greater than ourselves.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.65)' }}
            >
              We publish books that challenge readers to think deeply, believe boldly, and live with purpose. Our authors write from the trenches of real faith and real history.
            </p>
            <Link href="/about" className="ctp-btn-primary inline-flex items-center gap-2">
              Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${NEWSLETTER_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(13,13,26,0.88)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-lg mx-auto text-center">
            <div className="ctp-section-label mb-4 justify-center">◆ Stay Connected</div>
            <h2
              className="font-black mb-4"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                color: '#F5F0E8',
              }}
            >
              New Releases &
              <br />
              <span style={{ color: '#C41E3A' }}>Author Updates</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.6)' }}
            >
              Be the first to know about new titles, author events, and exclusive offers from Common Thread Publishing.
            </p>

            {subscribed ? (
              <div
                className="py-4 px-6 text-center"
                style={{
                  border: '1px solid rgba(196,30,58,0.4)',
                  background: 'rgba(196,30,58,0.08)',
                }}
              >
                <p
                  className="font-medium"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
                >
                  Thank you for subscribing!
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.6)' }}
                >
                  You'll hear from us soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{
                    background: 'rgba(245,240,232,0.08)',
                    border: '1px solid rgba(245,240,232,0.2)',
                    borderRight: 'none',
                    color: '#F5F0E8',
                    fontFamily: 'Lora, serif',
                  }}
                />
                <button type="submit" className="ctp-btn-primary px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
