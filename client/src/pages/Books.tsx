/*
 * DESIGN: Dark Academic Editorial — Books Catalog Page
 * Bookstore banner, filter tabs, staggered grid
 */

import { useState } from 'react';
import { books, BookGenre } from '@/lib/products';
import BookCard from '@/components/BookCard';

const BOOKSTORE_BANNER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/bookstore_banner_5242e5fa.jpg';

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
    <div className="min-h-screen" style={{ background: 'oklch(0.10 0.015 265)' }}>
      {/* Banner */}
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
              color: '#F5F0E8',
              lineHeight: 1.05,
            }}
          >
            The Complete
            <br />
            <span style={{ color: '#C41E3A' }}>Catalog</span>
          </h1>
          <p
            className="text-base max-w-lg"
            style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.7)' }}
          >
            Every title published by Common Thread Publishing — available in print with worldwide delivery, with select titles available as instant eBook downloads.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div
        className="sticky top-16 md:top-20 z-30 py-4"
        style={{
          background: 'rgba(13,13,26,0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span
              className="text-xs mr-2 whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.1em' }}
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
                  color: activeFilter === filter.value ? '#fff' : 'rgba(245,240,232,0.55)',
                  border: activeFilter === filter.value ? '1px solid #C41E3A' : '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {filter.label}
              </button>
            ))}
            <span
              className="ml-auto text-xs whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.3)' }}
            >
              {filteredBooks.length} title{filteredBooks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <section className="py-16">
        <div className="container">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-lg"
                style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(245,240,232,0.4)' }}
              >
                No titles found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shipping Note */}
      <section
        className="py-12"
        style={{ background: 'oklch(0.08 0.015 265)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="ctp-section-label mb-3 justify-center">◆ Shipping & Delivery</div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.5)' }}
            >
              All print orders ship directly to your door. We deliver to over 150 countries within 3–5 business days. Shipping rates are calculated at checkout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
