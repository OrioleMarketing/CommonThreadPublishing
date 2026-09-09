# Common Thread Publishing

This repository contains the static React, Vite, TypeScript, and Tailwind storefront for Common Thread Publishing LLC. Shopify remains the source of truth for live product pricing and checkout, while GoHighLevel hosts the embedded contact and Book 3 launch forms.

## Local development

Install dependencies with `pnpm install`, then run `pnpm dev`. Use `pnpm check` for TypeScript validation and `pnpm build:web` to create the deployable static site in `dist/public`.

## Vercel deployment

The repository is prepared for the existing Vercel `common-thread` project. Vercel must build with `pnpm build:web`, publish `dist/public`, and preserve the rewrites in `vercel.json` so direct visits to routes such as `/books/the-bible-finally-makes-sense` load correctly.

The application defaults to the verified S3 regional asset base below. You may optionally set this public environment variable in Vercel to override it later with a CloudFront HTTPS domain:

```bash
VITE_ASSET_BASE_URL=https://cdn.example.com
```

If a CloudFront distribution is introduced later, use its HTTPS domain for the variable above and redeploy; no source code changes will be needed.

## Amazon S3 asset migration

Upload only the site-owned images listed in `docs/s3-asset-manifest.md` to the `common-thread-publishing` bucket in `us-east-2`, preserving the listed object keys below the `assets/` prefix. The bucket or CloudFront distribution must allow public `GET` access to those objects. Shopify CDN images remain in Shopify and do not need to be copied.

## Domains

After production verification on the Vercel project URL, add `commonthreadpublishing.com` and `www.commonthreadpublishing.com` in Vercel and update the existing DNS records to Vercel’s values. Keep the existing production site active until Vercel verifies both domains.
