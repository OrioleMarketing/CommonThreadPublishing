/*
 * DESIGN: Dark Academic Editorial — Authors Page
 * Author cards with circular portraits, bio, and their books
 */

import { authors, getBooksByAuthor } from '@/lib/products';
import BookCard from '@/components/BookCard';
import { Link } from 'wouter';

export default function Authors() {
  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.10 0.015 265)' }}>
      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{
          background: 'oklch(0.08 0.015 265)',
          borderBottom: '1px solid rgba(196,30,58,0.15)',
        }}
      >
        <div className="container">
          <div className="ctp-section-label mb-3">◆ The Writers</div>
          <h1
            className="font-black"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#F5F0E8',
              lineHeight: 1.05,
            }}
          >
            Our
            <br />
            <span style={{ color: '#C41E3A' }}>Authors</span>
          </h1>
        </div>
      </section>

      {/* Authors */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-20">
            {authors.map((author, idx) => {
              const authorBooks = getBooksByAuthor(author.id);
              return (
                <div
                  key={author.id}
                  id={author.id}
                  className="scroll-mt-24"
                >
                  {/* Author Header */}
                  <div className="flex flex-col sm:flex-row gap-6 mb-10">
                    {author.photo && (
                      <div className="flex-shrink-0">
                        <img
                          src={author.photo}
                          alt={author.name}
                          className="w-24 h-24 rounded-full object-cover"
                          style={{ border: '3px solid rgba(196,30,58,0.5)' }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div
                        className="text-xs mb-1"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', letterSpacing: '0.1em' }}
                      >
                        ◆ Author
                      </div>
                      <h2
                        className="font-black mb-3"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                          color: '#F5F0E8',
                        }}
                      >
                        {author.name}
                      </h2>
                      <p
                        className="text-base leading-relaxed max-w-2xl"
                        style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.7)', lineHeight: 1.8 }}
                      >
                        {author.bio}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="ctp-divider mb-8">
                    <span style={{ fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.15em', color: 'rgba(196,30,58,0.6)' }}>
                      TITLES BY {author.name.toUpperCase()}
                    </span>
                  </div>

                  {/* Author's Books */}
                  {authorBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                      {authorBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  ) : (
                    <p
                      className="text-sm italic"
                      style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.4)' }}
                    >
                      No titles currently listed.
                    </p>
                  )}

                  {/* Separator between authors */}
                  {idx < authors.length - 1 && (
                    <div
                      className="mt-16"
                      style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
