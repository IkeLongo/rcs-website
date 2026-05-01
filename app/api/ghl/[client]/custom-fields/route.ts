import { NextRequest, NextResponse } from "next/server";
import {
  getGHLClientConfig,
  ClientNotFoundError,
  ClientConfigError,
} from "@/lib/ghl/clients";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GHLCustomField {
  id: string;
  name: string;
  fieldKey?: string;
  group?: string;
  [key: string]: unknown;
}

interface GHLCustomFieldsResponse {
  customFields: GHLCustomField[];
}

interface CustomFieldResult {
  name: string;
  id: string;
  key: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSnakeCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// ---------------------------------------------------------------------------
// GET /api/ghl/[client]/custom-fields
//
// Query params:
//   folder  — optional, filter by folder/group name (case-insensitive)
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ client: string }> }
) {
  const { client: clientSlug } = await params;

  // -- Resolve client config --------------------------------------------------
  let config: ReturnType<typeof getGHLClientConfig>;
  try {
    config = getGHLClientConfig(clientSlug);
  } catch (err) {
    if (err instanceof ClientNotFoundError) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 404 }
      );
    }
    if (err instanceof ClientConfigError) {
      console.error(`[GHL custom-fields] Config error for "${clientSlug}":`, (err as Error).message);
      return NextResponse.json(
        { success: false, error: (err as Error).message },
        { status: 500 }
      );
    }
    throw err;
  }

  const { locationId, apiToken } = config;

  // -- Safe dev logging -------------------------------------------------------
  if (process.env.NODE_ENV === "development") {
    console.log("[GHL custom-fields] client:", clientSlug);
    console.log("[GHL custom-fields] locationId:", locationId);
    console.log("[GHL custom-fields] token exists:", !!apiToken);
    console.log("[GHL custom-fields] token prefix:", apiToken.slice(0, 6) + "...");
  }

  // -- Optional folder filter -------------------------------------------------
  const { searchParams } = new URL(request.url);
  const folderFilter = searchParams.get("folder")?.toLowerCase() ?? null;

  // -- Fetch custom fields from GHL -------------------------------------------
  try {
    const res = await fetch(
      `https://services.leadconnectorhq.com/locations/${locationId}/customFields`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `[GHL custom-fields] API error for "${clientSlug}":`,
        res.status,
        errorText
      );
      return NextResponse.json(
        {
          success: false,
          error: `GHL API responded with status ${res.status}.`,
          detail: process.env.NODE_ENV === "development" ? errorText : undefined,
        },
        { status: res.status }
      );
    }

    const data: GHLCustomFieldsResponse = await res.json();

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[GHL custom-fields] raw response:",
        JSON.stringify(data, null, 2)
      );
    }

    // -- Build field list -------------------------------------------------------
    let fields: CustomFieldResult[] = (data.customFields ?? []).map((field) => ({
      name: field.name,
      id: field.id,
      key: field.fieldKey ?? toSnakeCase(field.name),
    }));

    // Optional: filter by folder/group name
    if (folderFilter) {
      fields = fields.filter(
        (_, i) =>
          (data.customFields[i].group ?? "").toLowerCase() === folderFilter
      );
    }

    // Sort alphabetically by name
    fields.sort((a, b) => a.name.localeCompare(b.name));

    // Build key → id map
    const customFieldMap = Object.fromEntries(
      fields.map((f) => [f.key, f.id])
    );

    return NextResponse.json({
      success: true,
      client: clientSlug,
      locationId,
      fields,
      customFieldMap,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error.";
    console.error(`[GHL custom-fields] fetch failed for "${clientSlug}":`, message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
