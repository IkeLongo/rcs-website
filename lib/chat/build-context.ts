import {
  getActiveServices,
  matchRecommendations,
  searchFaqs,
  searchRoutes,
  searchServices,
} from "@/lib/chat/queries";

export async function buildBusinessContext(userMessage: string) {
  const normalizedMessage = userMessage.trim();

  const [recommendations, services, faqs, routes, allServices] = await Promise.all([
    matchRecommendations(normalizedMessage),
    searchServices(normalizedMessage),
    searchFaqs(normalizedMessage),
    searchRoutes(normalizedMessage),
    getActiveServices(),
  ]);

  // Debug logging
  console.log("\n=== CHAT CONTEXT DEBUG ===");
  console.log("User message:", userMessage);
  console.log("Matched recommendations:", recommendations.length);
  console.log("Matched services:", services.length);
  if (services.length > 0) {
    console.log("Service details:", services.map(s => ({
      name: s.name,
      starting_price: s.starting_price,
      pricing_notes: s.pricing_notes
    })));
  }
  if (recommendations.length > 0) {
    console.log("Recommendation details:", recommendations.map(r => ({
      service_name: r.service_name,
      starting_price: r.starting_price,
      pricing_notes: r.pricing_notes
    })));
  }

  const lines: string[] = [];

  lines.push("BUSINESS: RiverCity Creatives");
  lines.push("Use only the information below when answering.");
  lines.push("");

  if (recommendations.length) {
    lines.push("RECOMMENDED SERVICES:");
    for (const rec of recommendations) {
      lines.push(
        `- ${rec.service_name}: ${rec.short_description}`
      );
      if (rec.recommendation_reason) {
        lines.push(`  Why: ${rec.recommendation_reason}`);
      }
      if (rec.starting_price !== null) {
        lines.push(`  Starting price: $${Number(rec.starting_price).toFixed(2)}`);
      }
      if (rec.pricing_notes) {
        lines.push(`  Pricing notes: ${rec.pricing_notes}`);
      }
      if (rec.route_full_url) {
        lines.push(`  Route: ${rec.route_full_url}`);
      }
    }
    lines.push("");
  }

  if (services.length) {
    lines.push("MATCHING SERVICES:");
    for (const service of services) {
      lines.push(`- ${service.name}: ${service.short_description}`);
      if (service.starting_price !== null) {
        lines.push(`  Starting price: $${Number(service.starting_price).toFixed(2)}`);
      }
      if (service.pricing_notes) {
        lines.push(`  Pricing notes: ${service.pricing_notes}`);
      }
      if (service.timeline_notes) {
        lines.push(`  Timeline: ${service.timeline_notes}`);
      }
      if (service.route_full_url) {
        lines.push(`  Route: ${service.route_full_url}`);
      }
    }
    lines.push("");
  }

  if (faqs.length) {
    lines.push("MATCHING FAQS:");
    for (const faq of faqs) {
      lines.push(`- Q: ${faq.question}`);
      lines.push(`  A: ${faq.answer}`);
    }
    lines.push("");
  }

  if (routes.length) {
    lines.push("MATCHING ROUTES:");
    for (const route of routes) {
      lines.push(`- ${route.label}: ${route.full_url ?? route.path}`);
      if (route.purpose) {
        lines.push(`  Purpose: ${route.purpose}`);
      }
    }
    lines.push("");
  }

  lines.push("ALL ACTIVE SERVICES:");
  for (const service of allServices) {
    lines.push(`- ${service.name}: ${service.short_description}`);
    if (service.starting_price !== null) {
      lines.push(`  Starting price: $${Number(service.starting_price).toFixed(2)}`);
    }
    if (service.pricing_notes) {
      lines.push(`  Pricing notes: ${service.pricing_notes}`);
    }
  }

  const finalContext = lines.join("\n");
  console.log("\nFinal context length:", finalContext.length, "characters");
  console.log("=== END CHAT CONTEXT DEBUG ===\n");
  
  return finalContext;
}