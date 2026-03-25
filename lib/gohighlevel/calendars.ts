/**
 * GoHighLevel Calendar Integration
 * 
 * This module manages booking options and GHL calendar data.
 * Currently uses static fallback data, but is prepared for GHL API integration.
 */

export interface BookingOption {
  id: string;
  title: string;
  description?: string;
  embedPath: string;
  isActive: boolean;
}

/**
 * Strip HTML tags and decode HTML entities from a string
 */
function stripHtmlTags(html: string): string {
  if (!html) return "";
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, "");
  
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
  
  // Trim whitespace
  return text.trim();
}

/**
 * Create a URL-friendly slug from a string
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Static fallback booking options
 * These are used when GHL API is not available or as a safety fallback
 */
const STATIC_BOOKING_OPTIONS: BookingOption[] = [
  {
    id: "free-intro-session-tkwra",
    title: "Free Intro Session",
    description: "Come in, meet the coaches, and see if this is the right fit for you. We'll walk you through the gym, talk about your goals, and help you figure out the best way to get started. No pressure, all fitness levels welcome.",
    embedPath: "WVvNk2aJjSc4YhSpUyxE",
    isActive: true,
  },
  // Add more static options here as needed
];

/**
 * Get the intro session booking path
 * Attempts to fetch from GHL API, falls back to static option
 */
export async function getIntroSessionPath(): Promise<string> {
  try {
    const options = await getStaticBookingOptions();
    const introSession = options.find(
      (opt) => 
        opt.title.toLowerCase().includes("intro") || 
        opt.id.includes("intro") ||
        opt.embedPath === "Lfpb6Nj3LGlg36C3Y0yu" // Match by known embed ID
    );
    
    if (introSession) {
      return `/booking/${introSession.id}`;
    }
  } catch (error) {
    console.error("Error getting intro session path:", error);
  }
  
  // Fallback to static path
  return `/booking/${STATIC_BOOKING_OPTIONS[0].id}`;
}

/**
 * Constant fallback path for intro session
 * Use this if you need a synchronous/static path
 */
export const INTRO_SESSION_PATH = `/booking/${STATIC_BOOKING_OPTIONS[0].id}`;

/**
 * Fetch active calendars from GHL API
 * 
 * @returns Promise<BookingOption[] | null>
 * 
 * TODO: Implement full GHL API integration
 * This function is prepared for future use when GHL API is enabled.
 * 
 * Required environment variables:
 * - GHL_API_KEY: Your GoHighLevel API key
 * - GHL_LOCATION_ID: Your GHL location ID
 * - GHL_API_BASE: GHL API base URL (typically https://rest.gohighlevel.com/v1)
 * - GHL_GROUP_ID: (Optional) Filter calendars by specific group ID
 */
export async function getGhlCalendars(): Promise<BookingOption[] | null> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  const apiBase = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
  const groupId = process.env.GHL_GROUP_ID; // Optional: filter by group

  if (!apiKey || !locationId) {
    console.log("GHL credentials not configured, using static fallback");
    return null;
  }

  try {
    const response = await fetch(`${apiBase}/calendars/?locationId=${locationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        Version: "2021-07-28",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`GHL API error ${response.status}: ${text}`);
    }

    const data = await response.json();

    // console.log("GHL calendars response:", data);

    // Extract calendars array from response
    const calendars = Array.isArray(data?.calendars)
      ? data.calendars
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    // Transform GHL calendars into BookingOptions
    const bookingOptions: BookingOption[] = calendars
      .filter((cal: any) => {
        // Must be active
        if (cal.isActive !== true) return false;
        
        // If groupId is set, calendar must match that group
        if (groupId && cal.groupId !== groupId) return false;
        
        return true;
      })
      .map((cal: any) => ({
        id: cal.widgetSlug || createSlug(cal.name || cal.id),
        title: cal.name || "Untitled Calendar",
        description: stripHtmlTags(cal.description || ""),
        embedPath: cal.id, // Use the calendar ID for the embed URL
        isActive: true,
      }));

    return bookingOptions;
  } catch (error) {
    console.error("Error fetching GHL calendars:", error);
    return null;
  }
}

/**
 * Get all active booking options
 * Attempts to fetch from GHL API, falls back to static options
 */
export async function getStaticBookingOptions(): Promise<BookingOption[]> {
  // Try to get calendars from GHL API
  const ghlCalendars = await getGhlCalendars();
  
  // If GHL API returns data, use it; otherwise use static fallback
  if (ghlCalendars && ghlCalendars.length > 0) {
    return ghlCalendars;
  }
  
  return STATIC_BOOKING_OPTIONS.filter(option => option.isActive);
}

/**
 * Get a single booking option by ID
 */
export async function getBookingOptionById(id: string): Promise<BookingOption | null> {
  const options = await getStaticBookingOptions();
  return options.find(option => option.id === id) || null;
}
