/*
 * DESIGN: Portable Site Assets
 * Site-owned imagery resolves from VITE_ASSET_BASE_URL on external hosting.
 * The temporary fallback keeps the existing deployment functional until the
 * completed S3 migration is verified.
 */

const assetBaseUrl = (import.meta.env.VITE_ASSET_BASE_URL ?? '').replace(/\/+$/, '');

export function siteAsset(objectKey: string, fallbackUrl: string) {
  return assetBaseUrl ? `${assetBaseUrl}/${objectKey.replace(/^\/+/, '')}` : fallbackUrl;
}
