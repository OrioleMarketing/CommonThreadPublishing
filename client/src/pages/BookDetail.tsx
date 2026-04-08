/*
 * DESIGN: Light Editorial — Book Detail Page
 * Split layout: cover left, details right. White/parchment backgrounds, navy text, crimson accents.
 */

import { useParams, Link } from 'wouter';
import { ArrowLeft, ShoppingCart, Download, Package, ExternalLink, Loader2 } from 'lucide-react';
import { getBookBySlug, getAuthorsByIds, books } from '@/lib/products';
import BookCard from '@/components/BookCard';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F7F3ED' }}>
        <div className="text-center">
          <h1
            className="text-4xl font-black mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
          >
            Book Not Found
          </h1>
          <Link href="/books" className="ctp-btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const authors = getAuthorsByIds(book.authorIds);
  const { addToCart, addingId } = useShopifyCart();
  const isAdding = addingId === book.shopifyVariantId;

  const handleAddToCart = () => {
    if (!book.shopifyVariantId) return;
    addToCart(book.shopifyVariantId, book.title, book.price, book.coverImage);
  };

  const relatedBooks = books
    .filter(b => b.id !== book.id && b.genre.some(g => book.genre.includes(g)))
    .slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Back Navigation */}
      <div className="pt-24 pb-4" style={{ background: '#F7F3ED', borderBottom: '1px solid rgba(26,26,46,0.07)' }}>
        <div className="container">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.45)')}
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>
      </div>

      {/* Main Book Section */}
      <section className="py-12" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Cover Image — Left */}
            <div className="lg:col-span-2">
              <div
                className="relative overflow-hidden shadow-xl"
                style={{ aspectRatio: '2/3', maxWidth: '380px' }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = '#F0EBE3';
                      parent.innerHTML = `
                        <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;">
                          <div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#1A1A2E;margin-bottom:1rem;">${book.title}</div>
                          <div style="font-family:'Montserrat',sans-serif;font-size:0.7rem;color:rgba(26,26,46,0.5);letter-spacing:0.1em;text-transform:uppercase;">${authors.map(a => a.name).join(' & ')}</div>
                        </div>
                      `;
                    }
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(196,30,58,0.15)' }}
                />
              </div>
            </div>

            {/* Book Details — Right */}
            <div className="lg:col-span-3">
              {book.series && (
                <div
                  className="text-xs mb-2"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  {book.series} {book.seriesNumber ? `· Book ${book.seriesNumber}` : ''}
                </div>
              )}

              {book.badge && (
                <div
                  className="inline-block px-2 py-0.5 text-white text-xs font-bold tracking-widest mb-3"
                  style={{ background: '#C41E3A', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {book.badge}
                </div>
              )}

              <h1
                className="font-black mb-2 leading-tight"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#1A1A2E',
                }}
              >
                {book.title}
              </h1>

              {book.subtitle && (
                <p
                  className="text-lg mb-4 italic"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}
                >
                  {book.subtitle}
                </p>
              )}

              {/* Authors */}
              <div className="flex flex-wrap gap-3 mb-6">
                {authors.map(author => (
                  <Link
                    key={author.id}
                    href={`/authors#${author.id}`}
                    className="flex items-center gap-2 transition-colors duration-200"
                    style={{ color: 'rgba(26,26,46,0.55)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.55)')}
                  >
                    {author.photo && (
                      <img
                        src={author.photo}
                        alt={author.name}
                        className="w-7 h-7 rounded-full object-cover"
                        style={{ border: '1px solid rgba(196,30,58,0.35)' }}
                      />
                    )}
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {author.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="ctp-divider mb-6">
                <span style={{ fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>◆</span>
              </div>

              {/* Description */}
              <p
                className="text-base leading-relaxed mb-8"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.72)', lineHeight: 1.8 }}
              >
                {book.description}
              </p>

              {/* Price & Buy Options */}
              <div
                className="p-6 mb-6"
                style={{
                  background: '#F7F3ED',
                  border: '1px solid rgba(196,30,58,0.18)',
                }}
              >
                <div className="flex flex-wrap items-baseline gap-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl font-black"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
                    >
                      ${book.price.toFixed(2)}
                    </span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                    >
                      USD · Print
                    </span>
                  </div>
                  {book.ebookPrice && (
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-black"
                        style={{ fontFamily: 'Playfair Display, serif', color: '#C41E3A' }}
                      >
                        ${book.ebookPrice.toFixed(2)}
                      </span>
                      <span
                        className="text-xs"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                      >
                        USD · eBook
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {book.shopifyVariantId ? (
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className="ctp-btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-70"
                    >
                      {isAdding ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />}
                      {isAdding ? 'Adding to Cart…' : 'Add to Cart'}
                    </button>
                  ) : (
                    <a
                      href={book.shopifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctp-btn-primary flex items-center justify-center gap-2 flex-1"
                    >
                      <ShoppingCart size={16} />
                      Buy Print Edition
                    </a>
                  )}
                  {book.format === 'ebook' || book.format === 'both' ? (
                    <a
                      href={book.fulfillmentUrl || book.shopifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctp-btn-outline flex items-center justify-center gap-2 flex-1"
                    >
                      <Download size={16} />
                      Buy eBook{book.ebookPrice ? ` — $${book.ebookPrice.toFixed(2)}` : ''}
                    </a>
                  ) : (
                    <a
                      href={book.shopifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctp-btn-outline flex items-center justify-center gap-2 flex-1"
                    >
                      <ExternalLink size={16} />
                      View in Store
                    </a>
                  )}
                </div>

                {/* Shipping note */}
                <div className="flex items-start gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}>
                  <Package size={13} style={{ color: '#C41E3A', marginTop: '2px', flexShrink: 0 }} />
                  <p
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.45)' }}
                  >
                    Print editions ship to 150+ countries and are normally printed within 3–5 business days. Shipping rates are calculated at checkout. eBook editions are available for immediate download.
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Publisher', value: 'Common Thread Publishing LLC' },
                  { label: 'Format', value: book.format === 'both' ? 'Print & eBook' : book.format === 'ebook' ? 'eBook' : 'Print' },
                  ...(book.publishedYear ? [{ label: 'Year', value: String(book.publishedYear) }] : []),
                  ...(book.genre.length ? [{ label: 'Genre', value: book.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ') }] : []),
                ].map(item => (
                  <div key={item.label}>
                    <div
                      className="text-xs mb-0.5"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-sm"
                      style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.65)' }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bios */}
      {authors.length > 0 && (
        <section
          className="py-16"
          style={{ background: '#F7F3ED', borderTop: '1px solid rgba(26,26,46,0.07)' }}
        >
          <div className="container">
            <div className="ctp-section-label mb-8">◆ About the Author{authors.length > 1 ? 's' : ''}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {authors.map(author => (
                <div key={author.id} className="flex gap-5">
                  {author.photo && (
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      style={{ border: '2px solid rgba(196,30,58,0.35)' }}
                    />
                  )}
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.1rem' }}
                    >
                      {author.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
                    >
                      {author.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="py-16" style={{ background: '#ffffff' }}>
          <div className="container">
            <div className="ctp-section-label mb-4">◆ You May Also Like</div>
            <h2
              className="font-black mb-8"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.8rem' }}
            >
              Related Titles
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {relatedBooks.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
