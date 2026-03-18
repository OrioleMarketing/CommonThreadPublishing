/*
 * DESIGN: Light Editorial — Cart Drawer
 * Slides in from the right. White background, dark navy text, crimson accents.
 * Shopify Buy SDK powers the real checkout.
 */

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShopifyCart } from '@/contexts/ShopifyCartContext';

export default function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    checkoutUrl,
    loading,
  } = useShopifyCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] transition-opacity duration-300"
        style={{
          background: 'rgba(26,26,46,0.45)',
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'auto' : 'none',
        }}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className="fixed top-0 right-0 h-full z-[70] flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: '#ffffff',
          boxShadow: '-4px 0 32px rgba(26,26,46,0.12)',
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(26,26,46,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: '#C41E3A' }} />
            <h2
              className="font-bold"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.1rem' }}
            >
              Your Cart
            </h2>
            {cartCount > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#C41E3A', color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}
              >
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded transition-colors duration-200"
            style={{ color: 'rgba(26,26,46,0.5)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.5)')}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} style={{ color: 'rgba(26,26,46,0.15)', marginBottom: '1rem' }} />
              <p
                className="font-bold mb-2"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '1.1rem' }}
              >
                Your cart is empty
              </p>
              <p
                className="text-sm"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.5)' }}
              >
                Browse our catalog and add a book to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map(item => (
                <div
                  key={item.variantId}
                  className="flex gap-4"
                  style={{ borderBottom: '1px solid rgba(26,26,46,0.06)', paddingBottom: '1.25rem' }}
                >
                  {/* Cover thumbnail */}
                  <div
                    className="flex-shrink-0 w-16 h-24 overflow-hidden"
                    style={{ background: '#F7F3ED' }}
                  >
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} style={{ color: 'rgba(26,26,46,0.2)' }} />
                      </div>
                    )}
                  </div>

                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold mb-1 leading-tight"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E', fontSize: '0.9rem' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm mb-3"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#C41E3A', fontWeight: 600 }}
                    >
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center border transition-colors duration-200"
                        style={{ borderColor: 'rgba(26,26,46,0.2)', color: 'rgba(26,26,46,0.6)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#C41E3A';
                          (e.currentTarget as HTMLElement).style.color = '#C41E3A';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,26,46,0.2)';
                          (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.6)';
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="w-8 text-center text-sm font-semibold"
                        style={{ fontFamily: 'Montserrat, sans-serif', color: '#1A1A2E' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center border transition-colors duration-200"
                        style={{ borderColor: 'rgba(26,26,46,0.2)', color: 'rgba(26,26,46,0.6)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#C41E3A';
                          (e.currentTarget as HTMLElement).style.color = '#C41E3A';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,26,46,0.2)';
                          (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.6)';
                        }}
                      >
                        <Plus size={12} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.variantId)}
                        disabled={loading}
                        className="ml-auto p-1 transition-colors duration-200"
                        style={{ color: 'rgba(26,26,46,0.3)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C41E3A')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.3)')}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — Total & Checkout */}
        {cartItems.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}
          >
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.6)', letterSpacing: '0.05em' }}
              >
                SUBTOTAL
              </span>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1A1A2E' }}
              >
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <p
              className="text-xs mb-4"
              style={{ fontFamily: 'Lora, serif', color: 'rgba(26,26,46,0.45)', fontStyle: 'italic' }}
            >
              Shipping and taxes calculated at checkout.
            </p>

            {/* Checkout Button */}
            <a
              href={checkoutUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-sm tracking-widest uppercase transition-all duration-200"
              style={{
                background: '#C41E3A',
                color: '#ffffff',
                fontFamily: 'Montserrat, sans-serif',
                textDecoration: 'none',
                opacity: checkoutUrl ? 1 : 0.5,
                pointerEvents: checkoutUrl ? 'auto' : 'none',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#a01830')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#C41E3A')}
            >
              Proceed to Checkout
              <ArrowRight size={14} />
            </a>

            <button
              onClick={closeCart}
              className="w-full mt-3 py-2.5 text-sm text-center transition-colors duration-200"
              style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(26,26,46,0.45)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#1A1A2E')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(26,26,46,0.45)')}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
