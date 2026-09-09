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

## External Hosting Migration

- [x] Prepare Vercel-compatible static deployment and single-page routing configuration for the existing `common-thread` project.
- [x] Transfer the current source to `OrioleMarketing/CommonThreadPublishing`.
- [x] Inventory externally hosted images and define the Amazon S3 `common-thread-publishing` bucket target path structure in `us-east-2`.
- [x] Move Manus-hosted image assets to the provided S3 bucket and update source URLs.
- [x] Deploy through Vercel and verify the custom-domain transition plan.

## Migration Status

The complete source has been pushed to the requested GitHub repository. Nineteen site-owned image assets have been staged locally under the final S3 object-key structure. The actual S3 upload is pending authorized AWS access. The existing Vercel `common-thread` project is presently linked to `OrioleMarketing/Common-Thread`, so its Git connection must be changed to `OrioleMarketing/CommonThreadPublishing` before automatic Git-based deployment can begin.

## Vercel Deployment Result

Vercel connected `OrioleMarketing/CommonThreadPublishing` to the existing `commonthreadpublishing` project (`prj_jV4DijtoGLfEbEIVgiFQryKqF7Qf`) in the Oriole Marketing team and created a verified preview deployment. The current preview is available at `https://commonthreadpublishing-k2e5kcjr7-oriole-marketing-projects.vercel.app`; its production branch is `main`.

The Vercel production deployment for commit `31ee234` is ready at `https://commonthreadpublishing-knahmwnvk-oriole-marketing-projects.vercel.app`. Direct verification confirmed that the homepage, direct book-detail routing, Shopify pricing/cart controls, and S3-hosted site images load correctly. Vercel SSO protection applies to Vercel-generated URLs but is configured to exclude custom domains, so `commonthreadpublishing.com` will be public after the domain is assigned in Vercel and its DNS records are changed at the domain provider.

## Custom Domain Cutover

- [x] Add `commonthreadpublishing.com` to the Vercel `commonthreadpublishing` project.
- [x] Add `www.commonthreadpublishing.com` to the Vercel `commonthreadpublishing` project.
- [x] Apply Vercel’s required apex and `www` DNS records at the current DNS provider.
- [x] Verify that both domains resolve publicly to the Vercel production deployment.

## Cutover Result

Vercel confirmed valid configuration and issued SSL certificates for both custom domains. The apex domain resolves to `216.150.1.1` and uses Vercel’s configured 308 redirect to `www.commonthreadpublishing.com`; the `www` CNAME resolves to `c6048d3b42375aa8.vercel-dns-016.com` and is attached to the production environment. HTTPS validation returned `200` for both domains.

## Catalog Layout Correction

- [x] Restore a consistent cover scale and card height for every title on the Books page.
- [x] Verify the corrected catalog layout at desktop and mobile widths before deployment.

## Catalog Layout Result

The Books-page grid now gives every title a single, equal-width grid cell with no featured col-span or staggered vertical offsets. Desktop and mobile checks confirmed that the first title now uses the same 2:3 cover treatment and card scale as every other catalog item.

The correction was deployed automatically to the Vercel production environment from Git commit `61fb04c` and Vercel reported a ready deployment.

## Featured Series Enhancement

- [x] Add a compact Kingdom Continuum Featured Series section above the uniform Books-page catalog grid.
- [x] Verify that the new series spotlight remains distinct from, and does not alter, the equal-scale catalog cards.

## Featured Series Result

The compact Kingdom Continuum spotlight now sits between the filters and catalog. It presents all three volume covers with direct detail-page links while the main catalog below retains its uniform, equal-scale book cards on desktop and mobile.

## External Publishing Workflow Verification

- [x] Confirm `main` in `OrioleMarketing/CommonThreadPublishing` is linked to Vercel production.
- [x] Confirm the latest Git commit is deployed at `www.commonthreadpublishing.com`.
- [x] Confirm whether the Manus Publish control is no longer needed for production updates.

The GitHub `main` branch and `origin/github` remote both resolve to commit `ac93e6b`, the Featured Series update. Vercel’s `commonthreadpublishing` project recorded the same commit as a ready production deployment and is configured with both custom domains.

The Vercel production alias and `www.commonthreadpublishing.com` returned identical HTML response hashes, confirming the public custom domain serves the same current Vercel release. The Manus Publish control affects only the legacy Manus-hosted copy; it is not required for the Vercel-hosted production website.

## Repository and Deployment Currency Check

- [x] Confirm there are no uncommitted local changes or unpushed commits.
- [x] Confirm the latest Vercel production deployment is ready and aliases both custom domains.

At the start of this check, the only local modification was this verification checklist entry; there were no unpushed or remote-only commits. The latest committed application release (`f75a592`) is a ready, Git-sourced Vercel production deployment with no alias errors and both custom domains assigned.

## AWS Access Setup

- [x] Create a temporary IAM user or access key with upload-only access to `common-thread-publishing/assets/*`.
- [x] Confirm that uploaded images can be publicly retrieved from the production asset base URL.

## S3 Transfer Result

Nineteen site-owned assets (25.7 MiB) now reside under `s3://common-thread-publishing/assets/` and resolve publicly from `https://common-thread-publishing.s3.us-east-2.amazonaws.com`. The production code now defaults to that S3 base, so Vercel has no dependency on Manus asset hosting. A future CloudFront domain can be substituted through `VITE_ASSET_BASE_URL` without changing the source.
