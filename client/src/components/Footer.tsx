/*
 * DESIGN: Dark Academic Editorial — Footer
 * Deep ink background, multi-column editorial layout
 * Diamond ornament dividers, crimson accent links
 */

import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Rss, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'oklch(0.08 0.015 265)',
        borderTop: '1px solid rgba(196, 30, 58, 0.25)',
      }}
    >
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/CTPRedandWhite_f08ff46d.png"
              alt="Common Thread Publishing"
              className="h-16 w-auto object-contain mb-4"
            />
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.6)', maxWidth: '320px' }}
            >
              Common Thread Publishing LLC is dedicated to bringing stories of faith, history, and conviction to readers worldwide. Every book we publish carries a thread that connects us to something greater.
            </p>
            <p
              className="text-xs italic mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(196, 30, 58, 0.8)' }}
            >
              "Unleash Your Story"
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com', label: 'X / Twitter' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Rss, href: '#', label: 'RSS' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200"
                  style={{
                    borderColor: 'rgba(245,240,232,0.15)',
                    color: 'rgba(245,240,232,0.5)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#C41E3A';
                    (e.currentTarget as HTMLElement).style.color = '#C41E3A';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,240,232,0.15)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.5)';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="ctp-section-label mb-5"
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/books', label: 'All Books' },
                { href: '/authors', label: 'Our Authors' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: 'rgba(245,240,232,0.55)',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C41E3A')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(245,240,232,0.55)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Store */}
          <div>
            <h4 className="ctp-section-label mb-5">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:Info@CommonThreadPublishing.com"
                  className="text-sm flex items-center gap-2 transition-colors duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.55)')}
                >
                  <Mail size={13} />
                  Info@CommonThreadPublishing.com
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://store.commonthreadpublishing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctp-btn-primary inline-block text-xs"
                >
                  Visit Our Store
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="ctp-section-label mb-4">Print Fulfilled By</h4>
              <p
                className="text-xs leading-relaxed"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.4)' }}
              >
                Print editions are fulfilled through our print-on-demand partner and shipped directly to your door — available in 150+ countries within 3–5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.3)' }}
          >
            © {new Date().getFullYear()} Common Thread Publishing LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.3)' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(245,240,232,0.7)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(245,240,232,0.3)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
