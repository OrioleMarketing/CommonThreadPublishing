/*
 * DESIGN: Light Editorial — 404 Not Found
 * White background, dark navy text, crimson accent.
 */

import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#F7F3ED' }}
    >
      <div className="text-center px-4">
        <div
          className="text-9xl font-black mb-4 leading-none"
          style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(196,30,58,0.12)' }}
        >
          404
        </div>
        <div className="ctp-section-label mb-3 justify-center">◆ Page Not Found</div>
        <h1
          className="text-3xl font-black mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
        >
          Lost in the Stacks
        </h1>
        <p
          className="text-base mb-8 max-w-sm mx-auto"
          style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.55)', fontStyle: 'italic' }}
        >
          The page you're looking for doesn't exist or has been moved. Let us guide you back to the library.
        </p>
        <Link href="/" className="ctp-btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
