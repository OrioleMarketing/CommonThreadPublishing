# S3 Asset Manifest

The following site-owned assets must be copied from their current Manus-hosted sources to `s3://common-thread-publishing/assets/` in `us-east-2`. Shopify CDN images are intentionally excluded because Shopify continues to own and serve those product assets.

| S3 object key | Current source filename | Used for |
|---|---|---|
| `assets/brand/common-thread-logo.png` | `CommonThread1_a7f668c9.png` | Header and footer logo |
| `assets/brand/favicon.png` | `CTPLogoFavicon_f864d115.png` | Browser favicon |
| `assets/backgrounds/hero-bg.jpg` | `hero_bg_b8112d9c.jpg` | Homepage hero |
| `assets/backgrounds/about-bg.jpg` | `about_bg_665970ee.jpg` | Homepage and About background |
| `assets/backgrounds/newsletter-bg.jpg` | `newsletter_bg_afae4d46.jpg` | Homepage newsletter panel |
| `assets/backgrounds/bookstore-banner.jpg` | `bookstore_banner_5242e5fa.jpg` | Catalog header |
| `assets/authors/mark-mirza.jpg` | `MarkMirza_d886115c.jpg` | Author portrait |
| `assets/authors/bruce-mayo.jpeg` | `BruceMayo_4c08e9b4.jpeg` | Author portrait |
| `assets/authors/john-greenfield.jpeg` | `JohnGreenfield_61b19951.jpeg` | Author portrait |
| `assets/authors/darrel-suderman.jpg` | `DarrelSuderman_37e221f7.jpg` | Author portrait |
| `assets/books/divided-nation.webp` | `DividedNation_10dbd00f.webp` | Book cover |
| `assets/books/divided-together.webp` | `DividedTogether_b4149c9c.webp` | Book cover |
| `assets/books/power-from-on-high.webp` | `PowerfromonHigh_757543e5.webp` | Book cover |
| `assets/books/bible-finally-makes-sense.webp` | `TheBibleFinallyMakesSense_194ae03f.webp` | Book cover |
| `assets/books/world-finally-makes-sense.png` | `kingdom-continuum-book3-cover_3efcd891.png` | Book 3 cover |
| `assets/books/johnstown-tragedy.jpg` | `TheJohnstownTragedy_c7f61357.jpg` | Book cover |
| `assets/books/pray-ers-book-2.jpg` | `ThePrayers-Book2-Cover_7ed26141.jpg` | Book cover |
| `assets/books/pray-ers-book-3.webp` | `ThePrayers-3_a2b926d0.webp` | Book cover |
| `assets/books/thinking-about-prayer.webp` | `ThinkingAboutPrayer_a02b07c5.webp` | Book cover |

Use `docs/s3-asset-manifest.md` as the object-key record during upload and later asset maintenance.
