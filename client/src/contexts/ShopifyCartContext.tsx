/*
 * Shopify Storefront API Cart Context
 * Uses native fetch + Shopify Storefront GraphQL API (no CommonJS require).
 * Domain: store.commonthreadpublishing.com
 * Storefront token: b85c44e613178a0e4ea11da7edbcfbe8
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const SHOPIFY_DOMAIN = 'store.commonthreadpublishing.com';
const STOREFRONT_TOKEN = 'b85c44e613178a0e4ea11da7edbcfbe8';
const API_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? 'Shopify GraphQL error');
  return json.data;
}

// ── GraphQL Fragments & Queries ──────────────────────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            priceV2 { amount currencyCode }
            image { url }
            product { title }
          }
        }
      }
    }
  }
`;

const CREATE_CART = `
  mutation cartCreate {
    cartCreate {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const FETCH_CART = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`;

const ADD_LINES = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const REMOVE_LINES = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

const UPDATE_LINES = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

// ── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  lineItemId: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  coverImage?: string;
}

interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { edges: Array<{ node: ShopifyLineNode }> };
  cost: { totalAmount: { amount: string; currencyCode: string } };
}

interface ShopifyLineNode {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: { amount: string; currencyCode: string };
    image?: { url: string };
    product: { title: string };
  };
}

interface ShopifyCartContextType {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (variantId: string, title: string, price: number, coverImage?: string) => Promise<void>;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  checkoutUrl: string | null;
  loading: boolean;
  addingId: string | null;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseCart(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }) => ({
    lineItemId: node.id,
    variantId: node.merchandise.id,
    title: node.merchandise.product.title,
    price: parseFloat(node.merchandise.priceV2.amount),
    quantity: node.quantity,
    coverImage: node.merchandise.image?.url,
  }));
}

// ── Context ──────────────────────────────────────────────────────────────────

const ShopifyCartContext = createContext<ShopifyCartContextType | null>(null);

export function ShopifyCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Initialize or restore cart session
  useEffect(() => {
    const savedCartId = localStorage.getItem('ctp_cart_id');

    const initCart = async () => {
      if (savedCartId) {
        try {
          const data = await shopifyFetch(FETCH_CART, { cartId: savedCartId });
          if (data?.cart) {
            setCart(data.cart);
            return;
          }
        } catch {
          // Cart expired — fall through to create new
        }
      }

      try {
        const data = await shopifyFetch(CREATE_CART);
        const newCart = data?.cartCreate?.cart;
        if (newCart) {
          localStorage.setItem('ctp_cart_id', newCart.id);
          setCart(newCart);
        }
      } catch (err) {
        console.error('Failed to create Shopify cart:', err);
      }
    };

    initCart();
  }, []);

  const cartItems: CartItem[] = cart ? parseCart(cart) : [];
  const cartCount = cart?.totalQuantity ?? 0;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkoutUrl: string | null = cart?.checkoutUrl ?? null;

  const addToCart = useCallback(async (variantId: string, _title: string, _price: number, _coverImage?: string) => {
    if (!cart) return;
    setAddingId(variantId);
    setLoading(true);
    try {
      const data = await shopifyFetch(ADD_LINES, {
        cartId: cart.id,
        lines: [{ merchandiseId: variantId, quantity: 1 }],
      });
      const updated = data?.cartLinesAdd?.cart;
      if (updated) {
        setCart(updated);
        setCartOpen(true);
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setLoading(false);
      setAddingId(null);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineItemId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const data = await shopifyFetch(REMOVE_LINES, {
        cartId: cart.id,
        lineIds: [lineItemId],
      });
      const updated = data?.cartLinesRemove?.cart;
      if (updated) setCart(updated);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      if (quantity <= 0) {
        const data = await shopifyFetch(REMOVE_LINES, {
          cartId: cart.id,
          lineIds: [lineItemId],
        });
        const updated = data?.cartLinesRemove?.cart;
        if (updated) setCart(updated);
      } else {
        const data = await shopifyFetch(UPDATE_LINES, {
          cartId: cart.id,
          lines: [{ id: lineItemId, quantity }],
        });
        const updated = data?.cartLinesUpdate?.cart;
        if (updated) setCart(updated);
      }
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setLoading(false);
    }
  }, [cart]);

  return (
    <ShopifyCartContext.Provider value={{
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      checkoutUrl,
      loading,
      addingId,
    }}>
      {children}
    </ShopifyCartContext.Provider>
  );
}

export function useShopifyCart() {
  const ctx = useContext(ShopifyCartContext);
  if (!ctx) throw new Error('useShopifyCart must be used within ShopifyCartProvider');
  return ctx;
}
