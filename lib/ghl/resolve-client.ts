// lib/ghl/resolve-client.ts

/**
 * Maps a request Host header value to a GHL client slug.
 *
 * V1 — MaximStrong only.
 * Add entries here as new client subdomains are onboarded.
 */
const HOST_TO_CLIENT: Record<string, string> = {
  "maximstrong.rivercitycreatives.com": "maximstrong",
};

/**
 * Resolve a GHL client slug from the incoming Host header value.
 *
 * Usage in a Server Component:
 *   import { headers } from 'next/headers'
 *   import { resolveClientFromHost } from '@/lib/ghl/resolve-client'
 *
 *   const host = (await headers()).get('host') ?? ''
 *   const clientSlug = resolveClientFromHost(host) ?? 'maximstrong'
 *
 * Returns:
 *   - The matched client slug (e.g. "maximstrong")
 *   - "maximstrong" for localhost / 127.0.0.1 (local dev fallback)
 *   - null for any unrecognized host
 */
export function resolveClientFromHost(host: string): string | null {
  // Strip port if present (e.g. "localhost:3000" → "localhost")
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname in HOST_TO_CLIENT) {
    return HOST_TO_CLIENT[hostname];
  }

  // Local dev fallback — any localhost origin maps to maximstrong
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "maximstrong";
  }

  return null;
}
