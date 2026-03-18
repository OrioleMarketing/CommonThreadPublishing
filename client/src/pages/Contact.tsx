/*
 * DESIGN: Dark Academic Editorial — Contact Page
 * Simple, clean contact form with brand styling
 */

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would connect to a form service or GoHighLevel
    setSubmitted(true);
  };

  const inputStyle = {
    background: 'oklch(0.14 0.015 265)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F5F0E8',
    fontFamily: 'Lora, serif',
    fontSize: '0.9rem',
    padding: '0.75rem 1rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s ease',
  };

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.10 0.015 265)' }}>
      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ background: 'oklch(0.08 0.015 265)', borderBottom: '1px solid rgba(196,30,58,0.15)' }}
      >
        <div className="container">
          <div className="ctp-section-label mb-3">◆ Get In Touch</div>
          <h1
            className="font-black"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#F5F0E8',
              lineHeight: 1.05,
            }}
          >
            Contact
            <br />
            <span style={{ color: '#C41E3A' }}>Us</span>
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="ctp-section-label mb-6">◆ Reach Out</div>
              <div className="space-y-6">
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8', fontSize: '1.1rem' }}
                  >
                    General Inquiries
                  </h3>
                  <a
                    href="mailto:Info@CommonThreadPublishing.com"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.6)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.6)')}
                  >
                    <Mail size={14} />
                    Info@CommonThreadPublishing.com
                  </a>
                </div>

                <div
                  className="p-5"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'oklch(0.12 0.015 265)' }}
                >
                  <h4
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8', fontSize: '0.95rem' }}
                  >
                    For Authors
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.55)' }}
                  >
                    Interested in publishing with Common Thread? We'd love to hear about your manuscript. Please include a brief description and your contact information.
                  </p>
                </div>

                <div
                  className="p-5"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'oklch(0.12 0.015 265)' }}
                >
                  <h4
                    className="font-bold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8', fontSize: '0.95rem' }}
                  >
                    Order Support
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.55)' }}
                  >
                    For questions about existing orders, shipping, or returns, please contact us with your order number and we'll respond within 1–2 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  style={{ border: '1px solid rgba(196,30,58,0.3)', background: 'rgba(196,30,58,0.05)' }}
                >
                  <CheckCircle size={48} style={{ color: '#C41E3A', marginBottom: '1rem' }} />
                  <h3
                    className="font-black mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8', fontSize: '1.5rem' }}
                  >
                    Message Sent
                  </h3>
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'Lora, serif', color: 'rgba(245,240,232,0.6)' }}
                  >
                    Thank you for reaching out. We'll respond within 1–2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.5)')}
                        onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.5)')}
                        onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.5)')}
                      onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" style={{ background: 'oklch(0.14 0.015 265)' }}>Select a subject…</option>
                      <option value="general" style={{ background: 'oklch(0.14 0.015 265)' }}>General Inquiry</option>
                      <option value="order" style={{ background: 'oklch(0.14 0.015 265)' }}>Order Support</option>
                      <option value="author" style={{ background: 'oklch(0.14 0.015 265)' }}>Author Submission</option>
                      <option value="media" style={{ background: 'oklch(0.14 0.015 265)' }}>Media / Press</option>
                      <option value="other" style={{ background: 'oklch(0.14 0.015 265)' }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => ((e.target as HTMLElement).style.borderColor = 'rgba(196,30,58,0.5)')}
                      onBlur={e => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="ctp-btn-primary flex items-center gap-2"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
