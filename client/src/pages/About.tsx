/*
 * DESIGN: Light Editorial — About Page
 * Hero keeps dark overlay on image; all other sections use white/parchment backgrounds.
 * Deep navy text, crimson accents, Playfair Display + Lora typography.
 */

import { Link } from 'wouter';
import { ArrowRight, Package, BookOpen, Globe } from 'lucide-react';

const ABOUT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/ESDa3SDVSomV86kahyKkmF/about_bg_665970ee.jpg';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Hero — dark overlay on image (intentional, text must be light) */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          backgroundImage: `url(${ABOUT_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(13,13,26,0.95) 0%, rgba(13,13,26,0.7) 60%, rgba(13,13,26,0.4) 100%)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-xl">
            <div className="ctp-section-label mb-3">◆ Our Story</div>
            <h1
              className="font-black mb-6"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: '#F7F3ED',
                lineHeight: 1.05,
              }}
            >
              About
              <br />
              <span style={{ color: '#C41E3A' }}>Common Thread</span>
              <br />
              Publishing
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(247,243,237,0.78)', lineHeight: 1.8 }}
            >
              A publishing house built on the conviction that every story — whether of faith, history, or conviction — carries a thread that connects us to something greater than ourselves.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section — white background */}
      <section className="py-20" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="ctp-section-label mb-4">◆ Who We Are</div>
              <h2
                className="font-black mb-6"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: '#1A1A2E',
                  lineHeight: 1.1,
                }}
              >
                Stories That
                <br />
                <span style={{ color: '#C41E3A' }}>Matter</span>
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.7)', lineHeight: 1.8 }}
              >
                <p>
                  Common Thread Publishing LLC was founded with a singular purpose: to bring stories of faith, history, and conviction to readers who are hungry for more than entertainment — readers who want to be challenged, changed, and connected.
                </p>
                <p>
                  Our name comes from the belief that a common thread runs through all great literature — the thread of truth, of humanity, of the divine story that underlies every human experience. Whether we're publishing political fiction that examines the state of the American church, historical accounts of God's faithfulness, or biblical guides that make Scripture accessible, that thread is always present.
                </p>
                <p>
                  We are a small, focused publishing house. We don't publish everything — we publish what matters. Every title in our catalog has been chosen because it carries that thread, and because we believe it will make a difference in the life of the reader.
                </p>
              </div>
            </div>

            <div>
              <div className="ctp-section-label mb-4">◆ Our Values</div>
              <div className="space-y-6">
                {[
                  {
                    title: 'Faith Without Apology',
                    desc: 'We publish books that take faith seriously — not as a cultural accessory, but as the defining reality of human existence. Our authors write from conviction, not convenience.',
                  },
                  {
                    title: 'Stories With Substance',
                    desc: 'Every book we publish is designed to do more than entertain. We want readers to finish a Common Thread book and see the world differently.',
                  },
                  {
                    title: 'Accessible to All',
                    desc: 'Our books are available to readers in over 150 countries. Great literature should not be limited by geography.',
                  },
                  {
                    title: 'Authors We Believe In',
                    desc: 'We work closely with our authors because we believe in them as people, not just as content producers. The relationship matters as much as the manuscript.',
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className="pl-5"
                    style={{ borderLeft: '2px solid rgba(196,30,58,0.4)' }}
                  >
                    <h3
                      className="font-bold mb-1"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1rem' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — parchment background */}
      <section
        className="py-20"
        style={{ background: '#F7F3ED', borderTop: '1px solid rgba(26,26,46,0.07)' }}
      >
        <div className="container">
          <div className="ctp-section-label mb-4 text-center justify-center">◆ How We Publish</div>
          <h2
            className="font-black mb-12 text-center"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              color: '#1A1A2E',
            }}
          >
            Order Today,
            <br />
            <span style={{ color: '#C41E3A' }}>Delivered Worldwide</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                step: '01',
                title: 'You Choose Your Book',
                desc: 'Browse our catalog and select the title that speaks to you. Every book is available for immediate order — no waiting for restocks.',
              },
              {
                icon: Package,
                step: '02',
                title: 'Processed & Shipped',
                desc: 'Your order is processed and your book ships directly to your door within 3–5 business days. Shipping rates are calculated at checkout.',
              },
              {
                icon: Globe,
                step: '03',
                title: 'Delivered Worldwide',
                desc: 'We ship to over 150 countries. Whether you\'re in the USA or overseas, your book arrives with the same quality and care.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="p-8"
                style={{ background: '#ffffff', border: '1px solid rgba(26,26,46,0.08)' }}
              >
                <div
                  className="text-4xl font-black mb-4"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(196,30,58,0.18)' }}
                >
                  {item.step}
                </div>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ background: 'rgba(196,30,58,0.07)', border: '1px solid rgba(196,30,58,0.2)' }}
                >
                  <item.icon size={18} style={{ color: '#C41E3A' }} />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.1rem' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.58)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — white background */}
      <section className="py-16" style={{ background: '#ffffff', borderTop: '1px solid rgba(26,26,46,0.07)' }}>
        <div className="container text-center">
          <h2
            className="font-black mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '2rem' }}
          >
            Ready to Find Your Next Read?
          </h2>
          <p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
          >
            Browse our complete catalog and discover the story that was written for you.
          </p>
          <Link href="/books" className="ctp-btn-primary inline-flex items-center gap-2">
            Browse All Books <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
