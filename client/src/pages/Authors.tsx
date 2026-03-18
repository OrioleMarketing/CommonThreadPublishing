/*
 * DESIGN: Light Editorial — Authors Page
 * White/parchment backgrounds, dark navy text, crimson accents.
 */

import { authors, getBooksByAuthor } from '@/lib/products';
import BookCard from '@/components/BookCard';

export default function Authors() {
  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{
          background: '#F7F3ED',
          borderBottom: '1px solid rgba(196,30,58,0.12)',
        }}
      >
        <div className="container">
          <div className="ctp-section-label mb-3">◆ The Writers</div>
          <h1
            className="font-black"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#1A1A2E',
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
      <section className="py-16" style={{ background: '#ffffff' }}>
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
                    {author.photo ? (
                      <div className="flex-shrink-0">
                        <img
                          src={author.photo}
                          alt={author.name}
                          className="w-24 h-24 rounded-full object-cover"
                          style={{ border: '3px solid rgba(196,30,58,0.4)' }}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center"
                        style={{ background: '#F0EBE3', border: '3px solid rgba(196,30,58,0.25)' }}
                      >
                        <span
                          className="text-2xl font-black"
                          style={{ fontFamily: 'Playfair Display, serif', color: '#C41E3A' }}
                        >
                          {author.name.charAt(0)}
                        </span>
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
                          color: '#1A1A2E',
                        }}
                      >
                        {author.name}
                      </h2>
                      <p
                        className="text-base leading-relaxed max-w-2xl"
                        style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.7)', lineHeight: 1.8 }}
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
                      style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.4)' }}
                    >
                      No titles currently listed.
                    </p>
                  )}

                  {/* Separator between authors */}
                  {idx < authors.length - 1 && (
                    <div
                      className="mt-16"
                      style={{ height: '1px', background: 'rgba(26,26,46,0.07)' }}
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
