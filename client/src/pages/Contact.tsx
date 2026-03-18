/*
 * DESIGN: Light Editorial — Contact Page
 * White/parchment backgrounds, dark navy text, crimson accents.
 * Form: GoHighLevel iframe embed (api.oriolemarketing.com)
 */

import { useEffect } from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  // Inject the GHL form embed script once on mount
  useEffect(() => {
    const scriptId = 'ghl-form-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://api.oriolemarketing.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Page Header */}
      <section
        className="pt-32 pb-16"
        style={{ background: '#F7F3ED', borderBottom: '1px solid rgba(196,30,58,0.12)' }}
      >
        <div className="container">
          <div className="ctp-section-label mb-3">◆ Get In Touch</div>
          <h1
            className="font-black"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#1A1A2E',
              lineHeight: 1.05,
            }}
          >
            Contact
            <br />
            <span style={{ color: '#C41E3A' }}>Us</span>
          </h1>
        </div>
      </section>

      <section className="py-16" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <div className="ctp-section-label mb-6">◆ Reach Out</div>
              <div className="space-y-6">
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.1rem' }}
                  >
                    General Inquiries
                  </h3>
                  <a
                    href="mailto:Info@CommonThreadPublishing.com"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.55)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.55)')}
                  >
                    <Mail size={14} />
                    Info@CommonThreadPublishing.com
                  </a>
                </div>

                <div
                  className="p-5"
                  style={{ border: '1px solid rgba(26,26,46,0.08)', background: '#F7F3ED' }}
                >
                  <h4
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '0.95rem' }}
                  >
                    For Authors
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
                  >
                    Interested in publishing with Common Thread? We'd love to hear about your manuscript. Please include a brief description and your contact information.
                  </p>
                </div>

                <div
                  className="p-5"
                  style={{ border: '1px solid rgba(26,26,46,0.08)', background: '#F7F3ED' }}
                >
                  <h4
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '0.95rem' }}
                  >
                    Order Support
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.6)' }}
                  >
                    For questions about existing orders, shipping, or returns, please contact us with your order number and we'll respond within 1–2 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: GoHighLevel Embedded Form */}
            <div className="lg:col-span-3">
              <iframe
                src="https://api.oriolemarketing.com/widget/form/KZTEzpeYhpAPgrdSLnho"
                style={{
                  width: '100%',
                  height: '706px',
                  border: 'none',
                  borderRadius: '0',
                  display: 'block',
                }}
                id="inline-KZTEzpeYhpAPgrdSLnho"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact Us"
                data-height="706"
                data-layout-iframe-id="inline-KZTEzpeYhpAPgrdSLnho"
                data-form-id="KZTEzpeYhpAPgrdSLnho"
                title="Contact Us"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
