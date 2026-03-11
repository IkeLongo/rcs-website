import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getContactFormSubmissionHtml } from "@/lib/email/contact/contact-form-submission";

export async function POST(req: Request) {
	try {
		const { name, email, company, message } = await req.json();
		if (!name || !email || !message) {
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
		const html = getContactFormSubmissionHtml({
			name,
			email,
			company,
			message,
			submittedAt: new Date().toLocaleString(),
		});

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
