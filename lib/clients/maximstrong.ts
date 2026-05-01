// lib/clients/maximstrong.ts

export const maximstrongConfig = {
  slug: "maximstrong",
  locationId: process.env.MAXIMSTRONG_GHL_LOCATION_ID,
  apiToken: process.env.MAXIMSTRONG_GHL_API_TOKEN,
  customFields: {
    membershipType: "field_id_here",
    membershipStatus: "field_id_here",
    sessionsRemaining: "field_id_here",
    totalSessionsPurchased: "field_id_here",
    totalSessionsUsed: "field_id_here",
    lastPurchaseDate: "field_id_here",
    lastCheckInDate: "field_id_here",
    lastProductPurchased: "field_id_here",
    membershipEndDate: "field_id_here",
  },
  products: {
    punchCard15: {
      productName: "15 Session Punch Card",
      sessionsToAdd: 15,
      expirationDays: 90,
    },
  },
};