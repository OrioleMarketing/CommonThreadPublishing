/*
 * DESIGN: Light Editorial — Authors Page
 * White/parchment backgrounds, dark navy text, crimson accents.
 * Each author section has: photo + bio block, then a dedicated
 * "Published Works" list with cover thumbnail, title, genre tags,
 * price, and Add to Cart — styled as a horizontal book-list row.
 */

import { Link } from 'wouter';
import { ShoppingCart, BookOpen } from 'lucide-react';
import { authors, getBooksByAuthor, type Book } from '@/lib/products';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';
import { toast } from 'sonner';

function AuthorBookRow({ book }: { book: Book }) {
  const { addToCart } = useShopifyCart();

  const handleAddToCart = async () => {
    if (!book.shopifyVariantId) {
      toast.error('This title is not available for purchase online yet.');
      return;
    }
    try {
      await addToCart(book.shopifyVariantId, book.title, book.price, book.coverImage);
      toast.success(`"${book.title}" added to cart`);
    } catch {
      toast.error('Could not add to cart. Please try again.');
    }
  };

  return (
    <div
      className="flex gap-5 items-start py-6"
      style={{ borderBottom: '1px solid rgba(26,26,46,0.07)' }}
    >
      {/* Cover thumbnail */}
      <Link href={`/books/${book.slug}`}>
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{ width: 72, height: 108, background: '#E8E2D9' }}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Book info */}
      <div className="flex-1 min-w-0">
        {/* Genre tags */}
        <div className="flex flex-wrap gap-1 mb-1">
          {book.genre.map(g => (
            <span
              key={g}
              className="text-xs uppercase"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.08em',
                color: '#C41E3A',
                opacity: 0.75,
              }}
            >
              {g}
            </span>
          ))}
          {book.series && (
            <span
              className="text-xs uppercase"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.08em',
                color: 'rgba(26,26,46,0.4)',
              }}
            >
              · {book.series}{book.seriesNumber ? ` #${book.seriesNumber}` : ''}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/books/${book.slug}`}>
          <h3
            className="font-bold leading-tight mb-1 hover:underline"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#1A1A2E',
              textDecorationColor: '#C41E3A',
            }}
          >
            {book.title}
            {book.subtitle && (
              <span
                className="block font-normal text-sm mt-0.5"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}
              >
                {book.subtitle}
              </span>
            )}
          </h3>
        </Link>

        {/* Description excerpt */}
        <p
          className="text-sm leading-relaxed mb-3 line-clamp-2"
          style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
        >
          {book.description}
        </p>

        {/* Price + actions */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="font-bold"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '1rem',
              color: '#1A1A2E',
            }}
          >
            ${book.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 text-xs uppercase transition-all duration-200"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.08em',
              background: '#C41E3A',
              color: '#ffffff',
              border: 'none',
              padding: '0.45rem 1rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#A01830')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C41E3A')}
          >
            <ShoppingCart size={12} />
            Add to Cart
          </button>

          <Link href={`/books/${book.slug}`}>
            <span
              className="flex items-center gap-1 text-xs uppercase transition-colors duration-200"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.08em',
                color: 'rgba(26,26,46,0.5)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C41E3A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(26,26,46,0.5)')}
            >
              <BookOpen size={12} />
              View Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Authors() {
  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Page Header */}
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

      {/* Authors list */}
      <section className="py-16" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="space-y-24">
            {authors.map((author, idx) => {
              const authorBooks = getBooksByAuthor(author.id);
              return (
                <div key={author.id} id={author.id} className="scroll-mt-24">

                  {/* ── Author bio block ── */}
                  <div
                    className="flex flex-col sm:flex-row gap-8 mb-12 pb-10"
                    style={{ borderBottom: '2px solid rgba(196,30,58,0.12)' }}
                  >
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      {author.photo ? (
                        <img
                          src={author.photo}
                          alt={author.name}
                          className="object-cover"
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            border: '3px solid rgba(196,30,58,0.4)',
                          }}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: '#F0EBE3',
                            border: '3px solid rgba(196,30,58,0.25)',
                          }}
                        >
                          <span
                            className="text-3xl font-black"
                            style={{ fontFamily: 'Playfair Display, serif', color: '#C41E3A' }}
                          >
                            {author.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name + bio */}
                    <div className="flex-1">
                      <div
                        className="text-xs mb-1"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', letterSpacing: '0.1em' }}
                      >
                        ◆ Author
                      </div>
                      <h2
                        className="font-black mb-4"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                          color: '#1A1A2E',
                        }}
                      >
                        {author.name}
                      </h2>
                      <p
                        className="text-base leading-relaxed max-w-2xl"
                        style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.7)', lineHeight: 1.85 }}
                      >
                        {author.bio}
                      </p>
                    </div>
                  </div>

                  {/* ── Published Works section ── */}
                  <div>
                    {/* Section heading */}
                    <div className="flex items-center gap-4 mb-6">
                      <h3
                        className="font-bold"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '1.25rem',
                          color: '#1A1A2E',
                        }}
                      >
                        Published Works
                      </h3>
                      <div style={{ flex: 1, height: 1, background: 'rgba(26,26,46,0.1)' }} />
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          letterSpacing: '0.1em',
                          color: 'rgba(26,26,46,0.35)',
                        }}
                      >
                        {authorBooks.length} {authorBooks.length === 1 ? 'TITLE' : 'TITLES'}
                      </span>
                    </div>

                    {/* Book rows */}
                    {authorBooks.length > 0 ? (
                      <div>
                        {authorBooks.map(book => (
                          <AuthorBookRow key={book.id} book={book} />
                        ))}
                      </div>
                    ) : (
                      <p
                        className="text-sm italic py-4"
                        style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.4)' }}
                      >
                        No titles currently listed.
                      </p>
                    )}
                  </div>

                  {/* Separator between authors */}
                  {idx < authors.length - 1 && (
                    <div
                      className="mt-20"
                      style={{ height: '1px', background: 'rgba(26,26,46,0.06)' }}
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
