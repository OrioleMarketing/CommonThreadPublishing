/*
 * DESIGN: Live Shopify Pricing
 * The editorial catalog remains locally authored, while purchasable variant
 * prices are read from Shopify at page load with catalog values as fallbacks.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { books } from '@/lib/products';
import { shopifyFetch } from './ShopifyCartContext';

interface ShopifyVariantPrice {
  amount: number;
  currencyCode: string;
}

interface ShopifyPricingContextType {
  getPrice: (variantId: string | undefined, fallbackPrice: number) => number;
  isLoaded: boolean;
}

const ShopifyPricingContext = createContext<ShopifyPricingContextType | null>(null);

const FETCH_VARIANT_PRICES = `
  query getVariantPrices($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant {
        id
        price { amount currencyCode }
      }
    }
  }
`;

export function ShopifyPricingProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<Record<string, ShopifyVariantPrice>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  const variantIds = useMemo(
    () => Array.from(new Set(
      books.flatMap(book => [book.shopifyVariantId, book.ebookShopifyVariantId].filter(Boolean) as string[])
    )),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const loadPrices = async () => {
      try {
        const data = await shopifyFetch(FETCH_VARIANT_PRICES, { ids: variantIds });
        const livePrices: Record<string, ShopifyVariantPrice> = {};

        for (const node of data?.nodes ?? []) {
          if (node?.id && node?.price?.amount) {
            livePrices[node.id] = {
              amount: Number.parseFloat(node.price.amount),
              currencyCode: node.price.currencyCode,
            };
          }
        }

        if (isMounted) setPrices(livePrices);
      } catch (error) {
        // Catalog values remain visible if Shopify is temporarily unreachable.
        console.warn('Unable to load live Shopify prices; using catalog prices.', error);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    };

    loadPrices();
    return () => { isMounted = false; };
  }, [variantIds]);

  const getPrice = useCallback(
    (variantId: string | undefined, fallbackPrice: number) => variantId ? (prices[variantId]?.amount ?? fallbackPrice) : fallbackPrice,
    [prices]
  );

  return (
    <ShopifyPricingContext.Provider value={{ getPrice, isLoaded }}>
      {children}
    </ShopifyPricingContext.Provider>
  );
}

export function useShopifyPricing() {
  const context = useContext(ShopifyPricingContext);
  if (!context) throw new Error('useShopifyPricing must be used within ShopifyPricingProvider');
  return context;
}
