// lib/ghl/clients/maximstrong.ts

export const maximstrongConfig = {
  slug: "maximstrong",
  name: "MaximStrong",
  locationId: process.env.MAXIMSTRONG_GHL_LOCATION_ID,
  apiToken: process.env.MAXIMSTRONG_GHL_API_TOKEN,
  webhookSecret: process.env.MAXIMSTRONG_GHL_WEBHOOK_SECRET,
  customFields: {
    lastCheckinDate:        "fTxcTPVTb40E30twhcdL",
    lastProductPurchased:   "PyPA1opgxj2Gdt9qpq5H",
    lastPurchaseDate:       "dtQXS8laogRJkulZQvvI",
    membershipEndDate:      "X335r50pLgt3jQfFeMZN",
    membershipStatus:       "epWMWgSSbYzfXOnrM0c3",
    membershipType:         "LaEaflyV3wZlS1nEvSA6",
    sessionsRemaining:      "am4pZtPZcDjky5FsyNXH",
    totalSessionsPurchased: "gKxvJC9UOUeIHrOtjQFD",
    totalSessionsUsed:      "bjeWxQw3ExI1rOjC4vt1",
  },
  products: {
    punchCard15: {
      productName:      "15 Session Punch Card",
      sessionsToAdd:    15,
      membershipType:   "Punch Card",
      membershipStatus: "Active",
      expirationDays:   90,
    },
  },
};
