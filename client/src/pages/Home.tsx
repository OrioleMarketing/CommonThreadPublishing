/*
 * DESIGN: Light Editorial — Home Page
 * Hero keeps dark overlay (text on image), all other sections use warm parchment/white backgrounds.
 * Deep navy text, crimson accents, Playfair Display + Lora typography.
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
          HERO SECTION — dark overlay on image (intentional)
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay — text must be light on dark image */}
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
            <div className="ctp-section-label mb-6 animate-fade-up">
              ◆ Common Thread Publishing LLC
            </div>

            <h1
              className="font-black leading-none mb-6 animate-fade-up-delay-1"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                color: '#F7F3ED',
                lineHeight: 1.05,
              }}
            >
              Unleash
              <br />
              <span style={{ color: '#C41E3A' }}>Your</span>
              <br />
              Story.
            </h1>

            <p
              className="text-lg leading-relaxed mb-8 animate-fade-up-delay-2"
              style={{
                fontFamily: 'Lora, serif',
                color: 'rgba(247,243,237,0.78)',
                maxWidth: '480px',
              }}
            >
              Faith-grounded books that challenge, inspire, and connect. From political fiction to biblical scholarship — stories that carry the thread of something greater.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <Link href="/books" className="ctp-btn-primary flex items-center gap-2">
                <BookOpen size={16} />
                Browse All Books
              </Link>

            </div>

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
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(247,243,237,0.45)' }}
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
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#F7F3ED' }}
          >
            Scroll
          </div>
          <div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #F7F3ED, transparent)' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FORMAT BADGES — light warm panel
      ═══════════════════════════════════════════════════ */}
      <section
        className="py-12"
        style={{ background: '#F0EBE3', borderBottom: '1px solid rgba(196,30,58,0.12)' }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Print Books',
                desc: 'High-quality paperback and hardcover editions shipped directly to your door. Available to readers in over 150 countries.',
                label: 'Physical Books',
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
                desc: 'We ship to readers in over 150 countries. Whether you\'re in the USA or overseas, your order arrives with the same quality and care.',
                label: 'Global Shipping',
              },
            ].map(item => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-6"
                style={{ border: '1px solid rgba(26,26,46,0.08)', background: '#fff' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(196, 30, 58, 0.08)', border: '1px solid rgba(196,30,58,0.2)' }}
                >
                  <item.icon size={18} style={{ color: '#C41E3A' }} />
                </div>
                <div>
                  <div
                    className="text-xs mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {item.label}
                  </div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1rem' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}
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
          FEATURED BOOKS — white background
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="ctp-section-label mb-3">◆ Featured Titles</div>
              <h2
                className="font-black"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: '#1A1A2E',
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
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.45)')}
            >
              View All Books <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {featuredBooks.map((book, i) => (
              <div key={book.id} className={i === 0 ? 'md:col-span-1 lg:col-span-1' : ''}>
                <BookCard book={book} size={i === 0 ? 'large' : 'default'} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/books" className="ctp-btn-outline inline-flex items-center gap-2">
              View All Books <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ALL BOOKS — warm parchment background
      ═══════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#F7F3ED' }}>
        <div className="container">
          <div className="ctp-section-label mb-3">◆ Complete Catalog</div>
          <div className="flex items-end justify-between mb-10">
            <h2
              className="font-black"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: '#1A1A2E',
              }}
            >
              All Titles
            </h2>
            <span
              className="text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)' }}
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
          ABOUT TEASER — dark overlay on image (intentional)
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
                color: '#F7F3ED',
                lineHeight: 1.1,
              }}
            >
              One Thread.
              <br />
              <span style={{ color: '#C41E3A' }}>Countless Stories.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.78)' }}
            >
              Common Thread Publishing LLC was founded on the belief that every story — whether of faith, history, or conviction — carries a thread that connects us to something greater than ourselves.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.65)' }}
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
          NEWSLETTER — dark overlay on image (intentional)
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
                color: '#F7F3ED',
              }}
            >
              New Releases &
              <br />
              <span style={{ color: '#C41E3A' }}>Author Updates</span>
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.6)' }}
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
                  style={{ fontFamily: 'Playfair Display, serif', color: '#F7F3ED' }}
                >
                  Thank you for subscribing!
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.6)' }}
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
                    background: 'rgba(247,243,237,0.1)',
                    border: '1px solid rgba(247,243,237,0.25)',
                    borderRight: 'none',
                    color: '#F7F3ED',
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
