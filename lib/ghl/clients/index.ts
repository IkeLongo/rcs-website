// lib/ghl/clients/index.ts

import { maximstrongConfig } from "./maximstrong";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GHLClientConfig {
  slug: string;
  name: string;
  locationId: string;
  apiToken: string;
  webhookSecret: string;
  customFields: Record<string, string>;
  products: Record<
    string,
    {
      productName: string;
      sessionsToAdd: number;
      membershipType: string;
      membershipStatus: string;
      expirationDays: number;
    }
  >;
}

// ---------------------------------------------------------------------------
// Registry — add new clients here
// ---------------------------------------------------------------------------

type RawClientEntry = {
  slug: string;
  name: string;
  locationId: string | undefined;
  apiToken: string | undefined;
  webhookSecret: string | undefined;
  customFields: Record<string, string>;
  products: Record<
    string,
    {
      productName: string;
      sessionsToAdd: number;
      membershipType: string;
      membershipStatus: string;
      expirationDays: number;
    }
  >;
};

const CLIENT_REGISTRY: Record<string, RawClientEntry> = {
  maximstrong: maximstrongConfig,
};

// ---------------------------------------------------------------------------
// Lookup helper
// ---------------------------------------------------------------------------

/**
 * Returns a validated client config for the given slug.
 *
 * Throws a typed error so the caller can distinguish between
 * "unknown client" (→ 404) and "missing env vars" (→ 500).
 */
export function getGHLClientConfig(slug: string): GHLClientConfig {
  if (!slug) {
    throw new ClientNotFoundError("No client slug provided.");
  }

  const entry = CLIENT_REGISTRY[slug.toLowerCase()];

  if (!entry) {
    throw new ClientNotFoundError(`Unknown GHL client: "${slug}".`);
  }

  if (!entry.locationId || !entry.apiToken || !entry.webhookSecret) {
    throw new ClientConfigError(
      `Environment variables for GHL client "${slug}" are not set.`
    );
  }

  return {
    slug: entry.slug,
    name: entry.name,
    locationId: entry.locationId,
    apiToken: entry.apiToken,
    webhookSecret: entry.webhookSecret,
    customFields: entry.customFields,
    products: entry.products,
  };
}

// ---------------------------------------------------------------------------
// Typed errors
// ---------------------------------------------------------------------------

export class ClientNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientNotFoundError";
  }
}

export class ClientConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientConfigError";
  }
}
