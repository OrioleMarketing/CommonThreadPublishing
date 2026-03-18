/*
 * DESIGN: Dark Academic Editorial — 404 Not Found
 */

import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'oklch(0.10 0.015 265)' }}
    >
      <div className="text-center px-4">
        <div
          className="text-9xl font-black mb-4 leading-none"
          style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(196,30,58,0.15)' }}
        >
          404
        </div>
        <div className="ctp-section-label mb-3 justify-center">◆ Page Not Found</div>
        <h1
          className="text-3xl font-black mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
        >
          Lost in the Stacks
        </h1>
        <p
          className="text-base mb-8 max-w-sm mx-auto"
          style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.55)', fontStyle: 'italic' }}
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
