import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, company, message, preferredDate, preferredTime, notes } = body;

    if (!type || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL_CONTACT_FORM;
    if (!webhookUrl) {
      console.error("GHL_WEBHOOK_URL_CONTACT_FORM is not set");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    let webhookPayload: Record<string, string>;

    if (type === "booking") {
      webhookPayload = {
        name,
        email,
        phone: phone || "",
        company: company || "",
        source: "Website Chatbot - Booking Request",
        status: "new",
        message: [
          notes ? `Notes: ${notes}` : "",
          preferredDate ? `Preferred Date: ${preferredDate}` : "",
          preferredTime ? `Preferred Time: ${preferredTime}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      };
    } else {
      // type === "contact"
      webhookPayload = {
        name,
        email,
        phone: phone || "",
        company: company || "",
        source: "Website Chatbot - Contact Inquiry",
        status: "new",
        message: message || "",
        tags: ["website-chatbot-contact-inquiry"] as any,
      };
    }

    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
      cache: "no-store",
    });

    if (!webhookRes.ok) {
      const text = await webhookRes.text();
      console.error("GHL webhook error:", webhookRes.status, text);
      return NextResponse.json({ error: "Failed to trigger GHL webhook" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("chat-lead route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
