// import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import { ovhPool } from '@/lib/db/mysql';
// import { render } from "@react-email/render";
// import { ContactFormConfirmationEmail } from '@/lib/email/contact/contact-form-confirmation';
// import { addGhlTag, upsertGhlContact } from "@/lib/gohighlevel/website-contact-form";

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		// console.log("[LEAD API] Received request body:", body);
		
		const { name, email, company, message, source, status } = body;
		// console.log("[LEAD API] Destructured message:", message);
		// console.log("[LEAD API] Message type:", typeof message);
		// console.log("[LEAD API] Message length:", message?.length);

		// 1) Save to DB
		await ovhPool.execute(
			`INSERT INTO contacts (name, email, company, source, status) VALUES (?, ?, ?, ?, ?)`,
			[name, email, company || '', source || '', status || 'new']
		);

    // // Create transporter
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST!,
    //   port: Number(process.env.SMTP_PORT || 587),
    //   secure: Number(process.env.SMTP_PORT) === 465,
    //   auth: {
    //     user: process.env.SMTP_USER!,
    //     pass: process.env.SMTP_PASS!,
    //   },
    // });

		// // Compose email HTML
		// const html = await render(
    //   <ContactFormConfirmationEmail name={name} company={company} />
    // );

		// // Send email
		// await transporter.sendMail({
		// 	from: process.env.SMTP_FROM!,
		// 	to: email,
		// 	subject: "Thank you for contacting RiverCity Creatives",
		// 	html,
		// });

		// 3) Trigger GoHighLevel workflow through webhook
    let ghlWebhookSuccess = false;
    let ghlWebhookError: string | null = null;

    try {
      const webhookPayload = {
        name,
        email,
        company: company || "",
        message: message || "",
        source: "Website Contact Form",
        status: status || "new",
      };
      // console.log("[LEAD API] Sending to GHL webhook:", webhookPayload);
      
      const webhookRes = await fetch(process.env.GHL_WEBHOOK_URL_CONTACT_FORM!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
        cache: "no-store",
      });

      if (!webhookRes.ok) {
        const text = await webhookRes.text();
        throw new Error(`Webhook failed: ${webhookRes.status} ${text}`);
      }

      ghlWebhookSuccess = true;
    } catch (err: any) {
      console.error("GHL Webhook Error:", err);
      ghlWebhookError = err?.message || "Unknown webhook error";
    }

		return NextResponse.json({
			message: 'Contact received and confirmation email sent.',
			ghlWebhookSuccess,
      ghlWebhookError,
		});
	} catch (error: any) {
		console.error('Contact Lead Error:', error);
		return NextResponse.json(
			{ message: 'An error occurred while processing your contact.' },
			{ status: 500 }
		);
	}
}
