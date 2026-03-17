type GhlUpsertResponse = {
  contact?: {
    id?: string;
  };
  id?: string;
};

const GHL_API_BASE = process.env.GHL_API_BASE!;
const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_WORKFLOW_TAG = process.env.GHL_WORKFLOW_TAG!;

async function ghlFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${GHL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function upsertGhlContact(input: {
  name: string;
  email: string;
  company?: string;
  source?: string;
}) {
  const [firstName, ...rest] = input.name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  const payload = {
    locationId: GHL_LOCATION_ID,
    firstName: firstName || input.name,
    lastName: lastName || "",
    email: input.email,
    source: input.source || "website",
    customFields: [
      {
        key: "company",
        field_value: input.company || "",
      },
    ],
  };

  return ghlFetch<GhlUpsertResponse>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function addGhlTag(contactId: string, tag = GHL_WORKFLOW_TAG) {
  return ghlFetch(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({
      tags: [tag],
    }),
  });
}