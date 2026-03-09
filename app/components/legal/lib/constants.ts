export const LEGAL = {
  companyLegalName: process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME ?? "Maximstrong LLC",
  dbaName: process.env.NEXT_PUBLIC_DBA_NAME ?? "Maximstrong",
  businessEmail: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "treygray@maximstrong.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "210-385-6254",

  address: {
    line1: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_LINE1 ?? "1203 W Blanco Road",
    city: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_CITY ?? "San Antonio",
    state: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_STATE ?? "TX",
    zip: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_ZIP ?? "78232",
    country: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS_COUNTRY ?? "United States of America",
  },

  lastUpdatedPrivacy: process.env.NEXT_PUBLIC_PRIVACY_LAST_UPDATED ?? "March 5, 2026",
  lastUpdatedCookies: process.env.NEXT_PUBLIC_COOKIES_LAST_UPDATED ?? "March 5, 2026",
};