import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { ContactFormSubmissionEmail } from "@/lib/email/contact/contact-form-submission";
import { render } from "@react-email/render";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		// console.log("[CONTACT API] Received request body:", body);
		
		const { name, email, phone, company, message } = body;
		// console.log("[CONTACT API] Destructured message:", message);
		// console.log("[CONTACT API] Message type:", typeof message);
		// console.log("[CONTACT API] Message length:", message?.length);
		
		if (!name || !email || !phone || !company || !message) {
			// console.log("[CONTACT API] Missing required fields - name:", !!name, "email:", !!email, "phone:", !!phone, "company:", !!company, "message:", !!message);
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Create transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST!,
			port: Number(process.env.SMTP_PORT || 587),
			secure: Number(process.env.SMTP_PORT) === 465,
			auth: {
				user: process.env.SMTP_USER!,
				pass: process.env.SMTP_PASS!,
			},
		});

		// Compose email HTML
		const html = await render(
			<ContactFormSubmissionEmail
				name={name}
				email={email}
				phone={phone}
				company={company}
				message={message}
				submittedAt={new Date().toLocaleString()}
			/>
		);

		// Send email
		await transporter.sendMail({
			from: process.env.SMTP_FROM!,
			to: process.env.SMTP_CONTACT_EMAIL!, // Set your receiving email address in env
			subject: "New Contact Form Submission",
			html,
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
	}
}
