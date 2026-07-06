/*
 * DESIGN: Light Editorial — Home Page
 * Hero keeps dark overlay (text on image), all other sections use warm parchment/white backgrounds.
 * Deep navy text, crimson accents, Playfair Display + Lora typography.
 */

import { Link } from 'wouter';
import { ArrowRight, BookOpen, Package, Download, BookText, ShoppingBag, Bell, CheckCircle } from 'lucide-react';
import { books, authors } from '@/lib/products';
import BookCard from '@/components/BookCard';
import { useState, useRef } from 'react';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/hero_bg_b8112d9c.jpg';
const ABOUT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/about_bg_665970ee.jpg';
const NEWSLETTER_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/newsletter_bg_afae4d46.jpg';

// ── Featured Spotlight ──────────────────────────────────────────────────────

const BIBLE_BOOK = books.find(b => b.id === 'the-bible-finally-makes-sense')!;
const BIBLE_EBOOK_VARIANT_ID = 'gid://shopify/ProductVariant/48304285548799'; // The Bible Finally Makes Sense (eBook)
const BIBLE_EBOOK_PRICE = 27.00;
const CHRISTIAN_LIFE_BOOK = books.find(b => b.id === 'the-christian-life-finally-makes-sense')!;
const WORLD_BOOK = books.find(b => b.id === 'the-world-finally-makes-sense')!;

// ── Notify Me Form (Book 3 Coming Soon) ─────────────────────────────────────
// To activate: create a free account at https://formspree.io, create a new form,
// and replace FORMSPREE_FORM_ID below with your form's ID (e.g. 'xpwzgkqr').
const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_FORM_ID';

function NotifyMeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, book: 'The World Finally Makes Sense' }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="mt-3 flex items-center gap-2 px-4 py-3"
        style={{ background: 'rgba(196,30,58,0.06)', border: '1.5px solid rgba(196,30,58,0.25)' }}
      >
        <CheckCircle size={15} style={{ color: '#C41E3A', flexShrink: 0 }} />
        <span
          className="text-xs font-semibold"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#1A1A2E' }}
        >
          You're on the list! We'll notify you at launch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <label
        className="text-xs font-bold tracking-widest uppercase"
        style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.5)' }}
      >
        Notify me at launch
      </label>
      <div className="flex gap-0">
        <input
          ref={inputRef}
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 text-sm outline-none"
          style={{
            fontFamily: 'Lora, serif',
            background: '#f8f5f0',
            border: '1.5px solid rgba(26,26,46,0.18)',
            borderRight: 'none',
            color: '#1A1A2E',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            background: status === 'submitting' ? '#a01830' : '#C41E3A',
            color: '#ffffff',
            flexShrink: 0,
          }}
          onMouseEnter={e => { if (status !== 'submitting') (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
          onMouseLeave={e => { if (status !== 'submitting') (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
        >
          <Bell size={12} />
          {status === 'submitting' ? '…' : 'Notify Me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs" style={{ color: '#C41E3A', fontFamily: 'Lora, serif' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

function KingdomContinuumSection() {
  const { addToCart, addingId } = useShopifyCart();

  const books3 = [BIBLE_BOOK, CHRISTIAN_LIFE_BOOK, WORLD_BOOK];

  return (
    <section className="py-20" style={{ background: '#ffffff' }}>
      <div className="container">
        <div className="ctp-section-label mb-3">◆ The Kingdom Continuum Series</div>
        <p
          className="text-base italic mb-12"
          style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)', maxWidth: '560px' }}
        >
          Bruce A. Mayo's three-volume journey through Scripture — from understanding the Bible's unified story, to living under the reign of the King, to going out as His ambassador to the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {books3.map((book) => {
            const isComingSoon = book.comingSoon;
            const isAddingPrint = addingId === book.shopifyVariantId;
            const isAddingEbook = addingId === BIBLE_EBOOK_VARIANT_ID && book.id === BIBLE_BOOK.id;
            return (
              <div key={book.id} className="flex flex-col gap-5">
                {/* Cover */}
                <Link href={isComingSoon ? '#' : `/books/${book.slug}`}>
                  <div
                    className="relative group cursor-pointer overflow-hidden"
                    style={{ maxWidth: '100%', aspectRatio: '2/3' }}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ boxShadow: '6px 10px 32px rgba(26,26,46,0.18)' }}
                    />
                    {isComingSoon && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: 'rgba(26,26,46,0.55)' }}
                      >
                        <div
                          className="px-4 py-2 text-xs font-bold tracking-widest uppercase"
                          style={{ fontFamily: 'Montserrat, sans-serif', background: '#C41E3A', color: '#ffffff' }}
                        >
                          Coming Soon
                        </div>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <div
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
                  >
                    Book {book.seriesNumber}
                  </div>
                  <h3
                    className="font-black leading-tight"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: '#1A1A2E' }}
                  >
                    {book.title}
                  </h3>
                  {book.subtitle && (
                    <p className="text-sm italic" style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}>
                      {book.subtitle}
                    </p>
                  )}

                  {isComingSoon ? (
                    <NotifyMeForm />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {/* Paperback */}
                      {book.shopifyVariantId && (
                        <button
                          onClick={() => addToCart(book.shopifyVariantId!, book.title + ' (Paperback)', book.price, book.coverImage)}
                          disabled={isAddingPrint}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200"
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            background: isAddingPrint ? '#a01830' : '#C41E3A',
                            color: '#ffffff',
                            opacity: isAddingPrint ? 0.8 : 1,
                          }}
                          onMouseEnter={e => { if (!isAddingPrint) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
                          onMouseLeave={e => { if (!isAddingPrint) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
                        >
                          <ShoppingBag size={13} />
                          {isAddingPrint ? 'Adding…' : `Paperback — $${book.price.toFixed(2)}`}
                        </button>
                      )}
                      {/* eBook — only Bible book has it on the spotlight */}
                      {book.id === BIBLE_BOOK.id && (
                        <button
                          onClick={() => addToCart(BIBLE_EBOOK_VARIANT_ID, book.title + ' (eBook)', BIBLE_EBOOK_PRICE, book.coverImage)}
                          disabled={isAddingEbook}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200"
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            background: 'transparent',
                            color: '#1A1A2E',
                            border: '2px solid #1A1A2E',
                            opacity: isAddingEbook ? 0.6 : 1,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A2E'; (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1A1A2E'; }}
                        >
                          <BookText size={13} />
                          {isAddingEbook ? 'Adding…' : `eBook — $${BIBLE_EBOOK_PRICE.toFixed(2)}`}
                        </button>
                      )}
                      {/* View details link */}
                      <Link
                        href={`/books/${book.slug}`}
                        className="inline-flex items-center gap-1 text-xs transition-colors duration-200"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.4)')}
                      >
                        View details <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedSpotlight() {
  const { addToCart, addingId } = useShopifyCart();
  const book = BIBLE_BOOK;
  const isAddingPrint = addingId === book.shopifyVariantId;
  const isAddingEbook = addingId === BIBLE_EBOOK_VARIANT_ID;

  return (
    <section className="py-20" style={{ background: '#ffffff', display: 'none' }}>
      <div className="container">
        <div className="ctp-section-label mb-3">◆ Featured Title</div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mt-8"
        >
          {/* Cover — left column */}
          <div className="flex justify-center md:justify-end">
            <Link href={`/books/${book.slug}`}>
              <div
                className="relative group cursor-pointer"
                style={{ maxWidth: '320px' }}
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    boxShadow: '8px 12px 40px rgba(26,26,46,0.22)',
                  }}
                />

              </div>
            </Link>
          </div>

          {/* Info — right column */}
          <div className="flex flex-col gap-5">
            <div>
              <div
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
              >
                Featured Release
              </div>
              <h2
                className="font-black mb-2"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                  color: '#1A1A2E',
                  lineHeight: 1.15,
                }}
              >
                {book.title}
              </h2>
              {book.subtitle && (
                <p
                  className="text-base italic mb-1"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)' }}
                >
                  {book.subtitle}
                </p>
              )}
              <p
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)', letterSpacing: '0.05em' }}
              >
                By Bruce A. Mayo, MTh
              </p>
            </div>

            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.72)', maxWidth: '480px' }}
            >
              Many new believers open the Bible with hunger — only to close it discouraged. The stories feel disconnected. The timeline feels confusing. The meaning feels distant. <em>The Bible Finally Makes Sense</em> is a summons to recover the unified story of Scripture through The Kingdom Continuum — revealing Jesus as the reigning center of all 66 books.
            </p>

            {/* Buy options */}
            <div
              className="flex flex-col gap-3 pt-2"
              style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase pt-3"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)' }}
              >
                Available In
              </div>

              <div className="flex flex-wrap gap-3">
                {/* Paperback — Shopify cart */}
                <button
                  onClick={() => addToCart(
                    book.shopifyVariantId!,
                    book.title + ' (Paperback)',
                    book.price,
                    book.coverImage
                  )}
                  disabled={isAddingPrint}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-200"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    background: isAddingPrint ? '#a01830' : '#C41E3A',
                    color: '#ffffff',
                    opacity: isAddingPrint ? 0.8 : 1,
                    cursor: isAddingPrint ? 'wait' : 'pointer',
                  }}
                  onMouseEnter={e => { if (!isAddingPrint) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
                  onMouseLeave={e => { if (!isAddingPrint) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
                >
                  <ShoppingBag size={15} />
                  {isAddingPrint ? 'Adding…' : `Paperback — $${book.price.toFixed(2)}`}
                </button>

                {/* eBook — links to Shopify store (variant ID to be added) */}
                {BIBLE_EBOOK_VARIANT_ID ? (
                  <button
                    onClick={() => addToCart(
                      BIBLE_EBOOK_VARIANT_ID,
                    book.title + ' (eBook)',
                    BIBLE_EBOOK_PRICE,
                      book.coverImage
                    )}
                    disabled={isAddingEbook}
                    className="flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-200"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      background: 'transparent',
                      color: '#1A1A2E',
                      border: '2px solid #1A1A2E',
                      opacity: isAddingEbook ? 0.6 : 1,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#1A1A2E';
                      (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#1A1A2E';
                    }}
                  >
                    <BookText size={15} />
                    {isAddingEbook ? 'Adding…' : `eBook — $${BIBLE_EBOOK_PRICE.toFixed(2)}`}
                  </button>
                ) : (
                  <a
                    href={book.shopifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-200"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      background: 'transparent',
                      color: '#1A1A2E',
                      border: '2px solid #1A1A2E',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#1A1A2E';
                      (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#1A1A2E';
                    }}
                  >
                    <BookText size={15} />
                    eBook — Coming Soon
                  </a>
                )}
              </div>
            </div>

            <Link
              href={`/books/${book.slug}`}
              className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.45)')}
            >
              View full details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Series Gallery ──────────────────────────────────────────────────────────

const SERIES_BOOKS = books.filter(
  b => b.series === BIBLE_BOOK.series && b.id !== BIBLE_BOOK.id
);

function SeriesGallery() {
  const { addToCart, addingId } = useShopifyCart();

  return (
    <section
      className="py-16"
      style={{
        background: '#F0EBE3',
        borderTop: '1px solid rgba(196,30,58,0.10)',
        borderBottom: '1px solid rgba(196,30,58,0.10)',
      }}
    >
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="ctp-section-label mb-2">◆ The Kingdom Continuum Series</div>
            <h3
              className="font-black"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                color: '#1A1A2E',
                lineHeight: 1.2,
              }}
            >
              More from the Series
            </h3>
          </div>
          <Link
            href="/books"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.4)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.4)')}
          >
            View All Books <ArrowRight size={14} />
          </Link>
        </div>

        {SERIES_BOOKS.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {SERIES_BOOKS.map(book => (
              <div key={book.id} className="flex flex-col gap-3">
                <Link href={`/books/${book.slug}`}>
                  <div className="group cursor-pointer">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ boxShadow: '4px 6px 20px rgba(26,26,46,0.15)' }}
                    />
                  </div>
                </Link>
                <div>
                  {book.seriesNumber && (
                    <div
                      className="text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
                    >
                      Book {book.seriesNumber}
                    </div>
                  )}
                  <Link href={`/books/${book.slug}`}>
                    <h4
                      className="font-bold leading-snug mb-1 hover:underline cursor-pointer"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '0.9rem' }}
                    >
                      {book.title}
                    </h4>
                  </Link>
                  <div
                    className="text-xs mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
                  >
                    ${book.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => addToCart(
                      book.shopifyVariantId!,
                      book.title,
                      book.price,
                      book.coverImage
                    )}
                    disabled={addingId === book.shopifyVariantId}
                    className="w-full py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      background: addingId === book.shopifyVariantId ? '#a01830' : '#C41E3A',
                      color: '#ffffff',
                      opacity: addingId === book.shopifyVariantId ? 0.8 : 1,
                    }}
                    onMouseEnter={e => { if (addingId !== book.shopifyVariantId) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
                    onMouseLeave={e => { if (addingId !== book.shopifyVariantId) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
                  >
                    {addingId === book.shopifyVariantId ? 'Adding…' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}

            {/* Coming soon placeholder for future series books */}
            <div className="flex flex-col gap-3">
              <div
                className="w-full aspect-[2/3] flex flex-col items-center justify-center gap-3"
                style={{
                  background: 'rgba(26,26,46,0.04)',
                  border: '2px dashed rgba(26,26,46,0.12)',
                }}
              >
                <BookOpen size={28} style={{ color: 'rgba(26,26,46,0.2)' }} />
                <span
                  className="text-xs text-center px-3"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.3)', lineHeight: 1.4 }}
                >
                  More titles<br />coming soon
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* No other series books yet — show placeholders */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {[2, 3, 4].map(n => (
              <div key={n} className="flex flex-col gap-3">
                <div
                  className="w-full aspect-[2/3] flex flex-col items-center justify-center gap-3"
                  style={{
                    background: 'rgba(26,26,46,0.04)',
                    border: '2px dashed rgba(26,26,46,0.12)',
                  }}
                >
                  <BookOpen size={28} style={{ color: 'rgba(26,26,46,0.2)' }} />
                  <span
                    className="text-xs text-center px-3"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.3)', lineHeight: 1.4 }}
                  >
                    Book {n}<br />Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── By Author Section ──────────────────────────────────────────────────────────

// Author display order: Mark Mirza first, Bruce Mayo second, then others
const AUTHOR_ORDER = ['mark-mirza', 'bruce-mayo', 'john-greenfield', 'darrel-suderman'];

function AuthorBookRow({ authorId }: { authorId: string }) {
  const { addToCart, addingId } = useShopifyCart();
  const getAuthorById = (id: string) => authors.find(a => a.id === id);
  const getBooksByAuthor = (id: string) => books.filter(b => b.authorIds.includes(id));

  const author = getAuthorById(authorId);
  const rawBooks = getBooksByAuthor(authorId);

  // Custom display order for Mark Mirza:
  // Pray-ers series (1, 2, 3) → Divided series → Power From On High → Johnstown Tragedy
  const MIRZA_ORDER = [
    'the-pray-ers-book-1',
    'the-pray-ers-book-2',
    'the-pray-ers-book-3',
    'divided-nation',
    'divided-together',
    'power-from-on-high',
    'the-johnstown-tragedy',
  ];
  const authorBooks = authorId === 'mark-mirza'
    ? [
        ...MIRZA_ORDER.map(id => rawBooks.find(b => b.id === id)).filter(Boolean) as typeof rawBooks,
        ...rawBooks.filter(b => !MIRZA_ORDER.includes(b.id)),
      ]
    : rawBooks;

  if (!author || authorBooks.length === 0) return null;

  return (
    <div className="mb-14 last:mb-0">
      {/* Author header */}
      <div className="flex items-center gap-4 mb-6">
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="w-12 h-12 object-cover"
            style={{ borderRadius: 0, boxShadow: '2px 3px 10px rgba(26,26,46,0.15)' }}
          />
        )}
        <div>
          <h3
            className="font-black leading-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              color: '#1A1A2E',
            }}
          >
            {author.name}
          </h3>
          <div
            className="text-xs tracking-widest uppercase mt-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
          >
            {authorBooks.length} {authorBooks.length === 1 ? 'Title' : 'Titles'}
          </div>
        </div>
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {authorBooks.map(book => (
          <div key={book.id} className="flex flex-col gap-3">
            <Link href={`/books/${book.slug}`}>
              <div className="group cursor-pointer">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ boxShadow: '4px 6px 20px rgba(26,26,46,0.15)' }}
                />
              </div>
            </Link>
            <div>
              {book.badge && (
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-1"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
                >
                  {book.badge}
                </div>
              )}
              <Link href={`/books/${book.slug}`}>
                <h4
                  className="font-bold leading-snug mb-1 hover:underline cursor-pointer"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '0.9rem' }}
                >
                  {book.title}
                </h4>
              </Link>
              <div
                className="text-xs mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
              >
                ${book.price.toFixed(2)}
              </div>
              <button
                onClick={() => addToCart(
                  book.shopifyVariantId!,
                  book.title,
                  book.price,
                  book.coverImage
                )}
                disabled={addingId === book.shopifyVariantId}
                className="w-full py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  background: addingId === book.shopifyVariantId ? '#a01830' : '#C41E3A',
                  color: '#ffffff',
                  opacity: addingId === book.shopifyVariantId ? 0.8 : 1,
                  cursor: addingId === book.shopifyVariantId ? 'wait' : 'pointer',
                }}
                onMouseEnter={e => { if (addingId !== book.shopifyVariantId) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
                onMouseLeave={e => { if (addingId !== book.shopifyVariantId) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
              >
                {addingId === book.shopifyVariantId ? 'Adding…' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── The Pray-ers Series Section ──────────────────────────────────────────────────────────

const PRAYERS_BOOK_1 = books.find(b => b.id === 'the-pray-ers-book-1')!;
const PRAYERS_BOOK_2 = books.find(b => b.id === 'the-pray-ers-book-2') ?? null;
const PRAYERS_BOOK_3 = books.find(b => b.id === 'the-pray-ers-book-3') ?? null;

function PrayersSeriesSection() {
  const { addToCart, addingId } = useShopifyCart();

  const BookPanel = ({ book, bookNum }: { book: typeof PRAYERS_BOOK_1 | null; bookNum: number }) => {
    if (!book) {
      return (
        <div
          className="flex flex-col items-center gap-6"
          style={{ opacity: 0.55 }}
        >
          {/* Placeholder cover */}
          <div
            className="w-full max-w-[240px] aspect-[2/3] flex flex-col items-center justify-center gap-3"
            style={{
              background: 'rgba(26,26,46,0.06)',
              border: '2px dashed rgba(247,243,237,0.2)',
            }}
          >
            <BookOpen size={36} style={{ color: 'rgba(247,243,237,0.25)' }} />
            <span
              className="text-sm font-bold text-center px-4"
              style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(247,243,237,0.4)', lineHeight: 1.4 }}
            >
              Book {bookNum}<br />Coming Soon
            </span>
          </div>
          <div className="text-center">
            <div
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
            >
              SERIES • BOOK {bookNum}
            </div>
            <p
              className="text-sm"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.4)', fontStyle: 'italic' }}
            >
              Coming soon
            </p>
          </div>
        </div>
      );
    }

    const isAdding = addingId === book.shopifyVariantId;

    return (
      <div className="flex flex-col items-center gap-6">
        {/* Cover with hover lift */}
        <Link href={`/books/${book.slug}`}>
          <div
            className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            style={{ maxWidth: '240px', width: '100%' }}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto object-cover"
              style={{ boxShadow: '6px 10px 32px rgba(26,26,46,0.22)' }}
            />
          </div>
        </Link>

        {/* Info */}
        <div className="text-center">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
          >
            SERIES • BOOK {bookNum}
          </div>
          <Link href={`/books/${book.slug}`}>
            <h3
              className="font-black mb-1 hover:underline cursor-pointer"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#F7F3ED',
                lineHeight: 1.2,
              }}
            >
              {book.title}
            </h3>
          </Link>
          {book.subtitle && (
            <p
              className="text-sm mb-3"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.55)', fontStyle: 'italic' }}
            >
              “{book.subtitle}”
            </p>
          )}
          <div
            className="text-sm font-bold mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#F7F3ED' }}
          >
            ${book.price.toFixed(2)}
          </div>
          <button
            onClick={() => addToCart(book.shopifyVariantId!, book.title, book.price, book.coverImage)}
            disabled={isAdding}
            className="px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              background: isAdding ? '#a01830' : '#C41E3A',
              color: '#ffffff',
              opacity: isAdding ? 0.8 : 1,
              cursor: isAdding ? 'wait' : 'pointer',
            }}
            onMouseEnter={e => { if (!isAdding) (e.currentTarget as HTMLElement).style.background = '#a01830'; }}
            onMouseLeave={e => { if (!isAdding) (e.currentTarget as HTMLElement).style.background = '#C41E3A'; }}
          >
            {isAdding ? 'Adding…' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      className="py-16"
      style={{
        background: '#1A1A2E',
        borderTop: '3px solid #C41E3A',
      }}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A' }}
          >
            ◆ A Three-Book Series
          </div>
          <h2
            className="font-black mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#F7F3ED',
              lineHeight: 1.1,
            }}
          >
            The Pray-ers Series
          </h2>
          <p
            className="text-sm leading-relaxed mx-auto"
            style={{
              fontFamily: 'Lora, serif',
              color: 'rgba(247,243,237,0.6)',
              maxWidth: '520px',
              fontStyle: 'italic',
            }}
          >
            Mark S. Mirza’s trilogy exploring the natural and supernatural world of prayer — linking 1st, 19th, and 20th century characters in a story that will fascinate, inspire, and bless.
          </p>
        </div>

        {/* Crimson divider line */}
        <div
          className="mx-auto mb-12"
          style={{ width: '60px', height: '2px', background: '#C41E3A' }}
        />

        {/* Three books side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <BookPanel book={PRAYERS_BOOK_1} bookNum={1} />
          <BookPanel book={PRAYERS_BOOK_2} bookNum={2} />
          <BookPanel book={PRAYERS_BOOK_3} bookNum={3} />
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(247,243,237,0.5)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(247,243,237,0.5)')}
          >
            View all books <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ByAuthorSection() {
  // Collect any author IDs not in the explicit order list
  const extraAuthorIds = authors
    .map(a => a.id)
    .filter(id => !AUTHOR_ORDER.includes(id));
  const orderedIds = [...AUTHOR_ORDER, ...extraAuthorIds];

  return (
    <section
      className="py-16"
      style={{
        background: '#F0EBE3',
        borderTop: '1px solid rgba(196,30,58,0.10)',
      }}
    >
      <div className="container">
        <div className="ctp-section-label mb-3">◆ Our Authors</div>
        <h2
          className="font-black mb-10"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            color: '#1A1A2E',
            lineHeight: 1.15,
          }}
        >
          Books by Author
        </h2>
        {orderedIds.map(id => (
          <AuthorBookRow key={id} authorId={id} />
        ))}
      </div>
    </section>
  );
}

// ── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
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
                { value: '11+', label: 'Titles Published' },
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
                desc: 'We use Print On Demand — every book is printed and shipped within 3–5 business days, delivered directly to your door in over 150 countries.',
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
          KINGDOM CONTINUUM SERIES — white background
      ═══════════════════════════════════════════════════ */}
      <KingdomContinuumSection />
      {/* ═══════════════════════════════════════════════════
          PRAY-ERS SERIES — dark navy background
      ═══════════════════════════════════════════════════ */}
      <PrayersSeriesSection />
      <ByAuthorSection />

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
