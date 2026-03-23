import { ovhPool } from "@/lib/db/mysql";

const db = ovhPool;

export type ChatServiceRow = {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string | null;
  starting_price: number | null;
  pricing_notes: string | null;
  timeline_notes: string | null;
  ideal_for: string | null;
  cta_text: string | null;
  route_id: number | null;
  route_label: string | null;
  route_path: string | null;
  route_full_url: string | null;
};

export type ChatFaqRow = {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  related_service_id: number | null;
};

export type ChatRecommendationRow = {
  id: number;
  trigger_phrase: string;
  problem_summary: string | null;
  recommendation_reason: string | null;
  priority: number;
  service_id: number;
  service_name: string;
  service_slug: string;
  short_description: string;
  starting_price: number | null;
  pricing_notes: string | null;
  cta_text: string | null;
  route_label: string | null;
  route_path: string | null;
  route_full_url: string | null;
};

export type ChatRouteRow = {
  id: number;
  label: string;
  path: string;
  full_url: string | null;
  purpose: string | null;
};

function likeTerm(input: string) {
  return `%${input}%`;
}

export async function getActiveServices(): Promise<ChatServiceRow[]> {
  const [rows] = (await db.query(
    `
    SELECT
      s.id,
      s.slug,
      s.name,
      s.short_description,
      s.long_description,
      s.starting_price,
      s.pricing_notes,
      s.timeline_notes,
      s.ideal_for,
      s.cta_text,
      s.route_id,
      r.label AS route_label,
      r.path AS route_path,
      r.full_url AS route_full_url
    FROM chat_services s
    LEFT JOIN chat_routes r ON r.id = s.route_id
    WHERE s.is_active = 1
    ORDER BY s.sort_order ASC, s.name ASC
    `
  )) as [ChatServiceRow[], any];

  return rows;
}

export async function searchFaqs(userMessage: string): Promise<ChatFaqRow[]> {
  const [rows] = (await db.execute(
    `
    SELECT
      id,
      question,
      answer,
      category,
      related_service_id
    FROM chat_faqs
    WHERE is_active = 1
      AND (
        question LIKE ?
        OR answer LIKE ?
        OR category LIKE ?
      )
    ORDER BY sort_order ASC, id ASC
    LIMIT 5
    `,
    [likeTerm(userMessage), likeTerm(userMessage), likeTerm(userMessage)]
  )) as [ChatFaqRow[], any];

  return rows;
}

export async function searchRoutes(userMessage: string): Promise<ChatRouteRow[]> {
  const [rows] = (await db.execute(
    `
    SELECT
      id,
      label,
      path,
      full_url,
      purpose
    FROM chat_routes
    WHERE is_active = 1
      AND (
        label LIKE ?
        OR purpose LIKE ?
        OR path LIKE ?
      )
    ORDER BY id ASC
    LIMIT 5
    `,
    [likeTerm(userMessage), likeTerm(userMessage), likeTerm(userMessage)]
  )) as [ChatRouteRow[], any];

  return rows;
}

export async function matchRecommendations(
  userMessage: string
): Promise<ChatRecommendationRow[]> {
  const [rows] = (await db.execute(
    `
    SELECT
      rec.id,
      rec.trigger_phrase,
      rec.problem_summary,
      rec.recommendation_reason,
      rec.priority,
      s.id AS service_id,
      s.name AS service_name,
      s.slug AS service_slug,
      s.short_description,
      s.starting_price,
      s.pricing_notes,
      s.cta_text,
      r.label AS route_label,
      r.path AS route_path,
      r.full_url AS route_full_url
    FROM chat_service_recommendations rec
    INNER JOIN chat_services s
      ON s.id = rec.recommended_service_id
     AND s.is_active = 1
    LEFT JOIN chat_routes r
      ON r.id = s.route_id
    WHERE rec.is_active = 1
      AND (
        ? LIKE CONCAT('%', rec.trigger_phrase, '%')
        OR rec.trigger_phrase LIKE ?
      )
    ORDER BY rec.priority DESC, rec.id ASC
    LIMIT 3
    `,
    [userMessage.toLowerCase(), likeTerm(userMessage)]
  )) as [ChatRecommendationRow[], any];

  return rows;
}

export async function searchServices(userMessage: string): Promise<ChatServiceRow[]> {
  const [rows] = (await db.execute(
    `
    SELECT
      s.id,
      s.slug,
      s.name,
      s.short_description,
      s.long_description,
      s.starting_price,
      s.pricing_notes,
      s.timeline_notes,
      s.ideal_for,
      s.cta_text,
      s.route_id,
      r.label AS route_label,
      r.path AS route_path,
      r.full_url AS route_full_url
    FROM chat_services s
    LEFT JOIN chat_routes r ON r.id = s.route_id
    WHERE s.is_active = 1
      AND (
        ? LIKE CONCAT('%', s.name, '%')
        OR ? LIKE CONCAT('%', s.slug, '%')
        OR s.short_description LIKE ?
        OR s.long_description LIKE ?
        OR s.ideal_for LIKE ?
        OR s.pricing_notes LIKE ?
      )
    ORDER BY s.sort_order ASC, s.name ASC
    LIMIT 5
    `,
    [
      userMessage.toLowerCase(),
      userMessage.toLowerCase(),
      likeTerm(userMessage),
      likeTerm(userMessage),
      likeTerm(userMessage),
      likeTerm(userMessage),
    ]
  )) as [ChatServiceRow[], any];

  return rows;
}