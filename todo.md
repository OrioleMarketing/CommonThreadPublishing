# Current Tasks

- [x] Verify whether Shopify price changes automatically update displayed website prices.
- [x] Identify the current source of truth for catalog pricing and report any synchronization gaps.

## Verification Result

The website maintains its displayed catalog prices in `client/src/lib/products.ts`; those values do not refresh from Shopify automatically. The Shopify Storefront API is integrated for cart operations, and cart line-item prices are retrieved live from Shopify. Consequently, Shopify remains the checkout source of truth, while catalog, author, home, and book-detail price labels require a manual site update unless a live catalog query is added.

## Approved Implementation

- [x] Add a shared live Shopify price query with resilient static-price fallbacks.
- [x] Update price displays across Home, Books, Authors, and Book Detail pages.
- [x] Validate that live displayed prices and Shopify cart prices agree.

## Implementation Result

Visible prices now load from the Shopify Storefront API when each site session opens. The local catalog values remain as resilient fallbacks if Shopify is temporarily unavailable. The Bible eBook now displays Shopify’s current $19.00 price and is available through the Shopify cart alongside its paperback format.
