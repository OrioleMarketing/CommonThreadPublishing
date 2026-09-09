/*
 * DESIGN: Light Editorial — Book Card
 * White card with cover image, lift on hover, crimson badge.
 * Dark navy text, crimson accents, clean border.
 * Add to Cart uses Shopify Buy SDK — no redirect to store.
 */

import { Link } from 'wouter';
import { Book, getAuthorsByIds } from '@/lib/products';
import { BookOpen, ShoppingCart, Loader2 } from 'lucide-react';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';
import { useShopifyPricing } from '@/contexts/ShopifyPricingContext';

interface BookCardProps {
  book: Book;
  size?: 'default' | 'large';
}

export default function BookCard({ book, size = 'default' }: BookCardProps) {
  const authors = getAuthorsByIds(book.authorIds);
  const authorNames = authors.map(a => a.name).join(' & ');
  const { addToCart, addingId } = useShopifyCart();
  const { getPrice } = useShopifyPricing();
  const isAdding = addingId === book.shopifyVariantId;
  const livePrice = getPrice(book.shopifyVariantId, book.price);

  const handleAddToCart = () => {
    if (!book.shopifyVariantId) return;
    addToCart(book.shopifyVariantId, book.title, livePrice, book.coverImage);
  };

  return (
    <div className="book-card h-full flex flex-col group">
      {/* Cover Image — wrapped in Link for navigation */}
      <Link href={`/books/${book.slug}`} className="block">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '2/3', background: '#F0EBE3' }}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#EDE7DD;padding:1.5rem;text-align:center;">
                    <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#1A1A2E;margin-bottom:0.5rem;">${book.title}</div>
                    <div style="font-family:'Montserrat',sans-serif;font-size:0.65rem;color:rgba(26,26,46,0.5);letter-spacing:0.1em;text-transform:uppercase;">${authorNames}</div>
                  </div>
                `;
              }
            }}
          />

          {/* Badge */}
          {book.badge && (
            <div
              className="absolute top-3 left-3 px-2 py-1 text-white"
              style={{
                background: '#C41E3A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}
            >
              {book.badge}
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(13, 13, 26, 0.65)' }}
          >
            <div className="flex flex-col items-center gap-2">
              <BookOpen size={24} style={{ color: '#C41E3A' }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#F7F3ED' }}
              >
                View Book
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Book Info */}
      <div className="flex flex-col flex-1 p-4">
        {/* Series label */}
        {book.series && (
          <div
            className="text-xs mb-1"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              color: 'rgba(196, 30, 58, 0.85)',
              letterSpacing: '0.08em',
            }}
          >
            {book.series} {book.seriesNumber ? `· Book ${book.seriesNumber}` : ''}
          </div>
        )}

        {/* Title links to detail page */}
        <Link href={`/books/${book.slug}`}>
          <h3
            className="font-bold leading-snug mb-1 line-clamp-2 cursor-pointer transition-colors duration-200"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: size === 'large' ? '1.1rem' : '0.95rem',
              color: '#1A1A2E',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#1A1A2E')}
          >
            {book.title}
          </h3>
        </Link>

        {book.subtitle && (
          <p
            className="text-xs mb-2 line-clamp-1"
            style={{
              fontFamily: 'Lora, serif',
              fontStyle: 'italic',
              color: 'rgba(26,26,46,0.5)',
            }}
          >
            {book.subtitle}
          </p>
        )}

        <p
          className="text-xs mb-3"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            color: 'rgba(26,26,46,0.45)',
            letterSpacing: '0.05em',
          }}
        >
          {authorNames}
        </p>

        {/* Price & Add to Cart */}
        <div
          className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}
        >
          {book.comingSoon ? (
            <>
              <span
                className="font-bold"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: '#C41E3A' }}
              >
                Coming Soon
              </span>
              <Link
                href={`/books/${book.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-white transition-colors duration-200"
                style={{
                  background: '#C41E3A',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#a01830')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#C41E3A')}
              >
                Notify Me
              </Link>
            </>
          ) : (
            <>
              <span
                className="font-bold"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem',
                  color: '#1A1A2E',
                }}
              >
                ${livePrice.toFixed(2)}
              </span>

              {/* Add to Cart button — standalone, NOT inside any <a> */}
              {book.shopifyVariantId ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white transition-colors duration-200 disabled:opacity-70"
                  style={{
                    background: '#C41E3A',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => { if (!isAdding) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
                  onMouseLeave={e => { if (!isAdding) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
                >
                  {isAdding ? <Loader2 size={11} className="animate-spin" /> : <ShoppingCart size={11} />}
                  {isAdding ? 'Adding…' : 'Add to Cart'}
                </button>
              ) : (
                <a
                  href={book.shopifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-white transition-colors duration-200"
                  style={{
                    background: '#C41E3A',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#a01830')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#C41E3A')}
                >
                  <ShoppingCart size={11} />
                  Buy
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
