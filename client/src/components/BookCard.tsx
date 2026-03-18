/*
 * DESIGN: Dark Academic Editorial — Book Card
 * Dark ink card with cover image, lift on hover, crimson badge
 * Used in catalog grid and featured sections
 */

import { Link } from 'wouter';
import { Book, getAuthorsByIds } from '@/lib/products';
import { BookOpen, ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  size?: 'default' | 'large';
}

export default function BookCard({ book, size = 'default' }: BookCardProps) {
  const authors = getAuthorsByIds(book.authorIds);
  const authorNames = authors.map(a => a.name).join(' & ');

  return (
    <Link href={`/books/${book.slug}`} className="block group">
      <div className="book-card h-full flex flex-col">
        {/* Cover Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '2/3', background: 'oklch(0.12 0.015 265)' }}
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to a placeholder if cover image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:oklch(0.14 0.015 265);padding:1.5rem;text-align:center;">
                    <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#F5F0E8;margin-bottom:0.5rem;">${book.title}</div>
                    <div style="font-family:'Montserrat',sans-serif;font-size:0.65rem;color:rgba(245,240,232,0.5);letter-spacing:0.1em;text-transform:uppercase;">${authorNames}</div>
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
            style={{ background: 'rgba(13, 13, 26, 0.75)' }}
          >
            <div className="flex flex-col items-center gap-2">
              <BookOpen size={24} style={{ color: '#C41E3A' }} />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#F5F0E8' }}
              >
                View Book
              </span>
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="flex flex-col flex-1 p-4">
          {/* Series label */}
          {book.series && (
            <div
              className="text-xs mb-1"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: 'rgba(196, 30, 58, 0.8)',
                letterSpacing: '0.08em',
              }}
            >
              {book.series} {book.seriesNumber ? `· Book ${book.seriesNumber}` : ''}
            </div>
          )}

          <h3
            className="font-bold leading-snug mb-1 line-clamp-2"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: size === 'large' ? '1.1rem' : '0.95rem',
              color: '#F5F0E8',
            }}
          >
            {book.title}
          </h3>

          {book.subtitle && (
            <p
              className="text-xs mb-2 line-clamp-1"
              style={{
                fontFamily: 'Lora, serif',
                fontStyle: 'italic',
                color: 'rgba(245,240,232,0.5)',
              }}
            >
              {book.subtitle}
            </p>
          )}

          <p
            className="text-xs mb-3"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              color: 'rgba(245,240,232,0.45)',
              letterSpacing: '0.05em',
            }}
          >
            {authorNames}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span
              className="font-bold"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '1rem',
                color: '#F5F0E8',
              }}
            >
              ${book.price.toFixed(2)}
            </span>
            <a
              href={book.shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
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
          </div>
        </div>
      </div>
    </Link>
  );
}
