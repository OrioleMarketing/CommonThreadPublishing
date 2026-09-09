/*
 * DESIGN: Light Editorial — Books Catalog Page
 * Banner keeps dark overlay on image; filter bar and grid use white/parchment.
 * Deep navy text, crimson accents, Playfair Display + Lora typography.
 */

import { useState } from 'react';
import { books, BookGenre } from '@/lib/products';
import BookCard from '@/components/BookCard';
import { siteAsset } from '@/lib/assets';

const BOOKSTORE_BANNER = siteAsset('assets/backgrounds/bookstore-banner.jpg', 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/bookstore_banner_5242e5fa.jpg');

const GENRE_FILTERS: { value: 'all' | BookGenre; label: string }[] = [
  { value: 'all', label: 'All Books' },
  { value: 'fiction', label: 'Fiction' },
  { value: 'nonfiction', label: 'Non-Fiction' },
  { value: 'biblical', label: 'Biblical' },
  { value: 'historical', label: 'Historical' },
  { value: 'devotional', label: 'Devotional' },
];

export default function Books() {
  const [activeFilter, setActiveFilter] = useState<'all' | BookGenre>('all');

  const filteredBooks = activeFilter === 'all'
    ? books
    : books.filter(b => b.genre.includes(activeFilter));

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Banner — dark overlay on image (intentional, text must be light) */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{
          backgroundImage: `url(${BOOKSTORE_BANNER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(13,13,26,0.85) 0%, rgba(13,13,26,0.7) 60%, rgba(13,13,26,0.95) 100%)' }}
        />
        <div className="container relative z-10">
          <div className="ctp-section-label mb-3">◆ Our Library</div>
          <h1
            className="font-black mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#F7F3ED',
              lineHeight: 1.05,
            }}
          >
            The Complete
            <br />
            <span style={{ color: '#C41E3A' }}>Catalog</span>
          </h1>
          <p
            className="text-base max-w-lg"
            style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.72)' }}
          >
            Every title published by Common Thread Publishing — available in print with worldwide delivery, with select titles available as instant eBook downloads.
          </p>
        </div>
      </section>

      {/* Filter Bar — light */}
      <div
        className="sticky top-16 md:top-20 z-30 py-4"
        style={{
          background: 'rgba(247, 243, 237, 0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(26,26,46,0.10)',
          boxShadow: '0 2px 8px rgba(26,26,46,0.05)',
        }}
      >
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span
              className="text-xs mr-2 whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.38)', letterSpacing: '0.1em' }}
            >
              FILTER:
            </span>
            {GENRE_FILTERS.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className="whitespace-nowrap px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 flex-shrink-0"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.08em',
                  background: activeFilter === filter.value ? '#C41E3A' : 'transparent',
                  color: activeFilter === filter.value ? '#fff' : 'rgba(26,26,46,0.55)',
                  border: activeFilter === filter.value ? '1px solid #C41E3A' : '1px solid rgba(26,26,46,0.18)',
                }}
              >
                {filter.label}
              </button>
            ))}
            <span
              className="ml-auto text-xs whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.35)' }}
            >
              {filteredBooks.length} title{filteredBooks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <section className="py-16" style={{ background: '#F0EBE3', borderTop: '1px solid rgba(184,150,12,0.22)' }}>
        <div className="container">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-lg"
                style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(26,26,46,0.4)' }}
              >
                No titles found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 items-stretch">
              {filteredBooks.map(book => (
                <div key={book.id} className="min-w-0">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shipping Note */}
      <section
        className="py-12"
        style={{ background: '#F0EBE3', borderTop: '1px solid rgba(26,26,46,0.07)' }}
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="ctp-section-label mb-3 justify-center">◆ Shipping & Delivery</div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}
            >
              All print orders ship directly to your door. We deliver to over 150 countries within 3–5 business days. Shipping rates are calculated at checkout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
