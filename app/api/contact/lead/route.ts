import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';
import { ovhPool } from '@/lib/db/mysql';
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { ContactFormConfirmationEmail } from '@/lib/email/contact/contact-form-confirmation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
	try {
		const { name, email, company, source, status } = await request.json();

		// Insert contact into the database (now includes company)
		await ovhPool.execute(
			`INSERT INTO contacts (name, email, company, source, status) VALUES (?, ?, ?, ?, ?)`,
			[name, email, company || '', source || '', status || 'new']
		);

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
		const html = renderToStaticMarkup(
			React.createElement(ContactFormConfirmationEmail, { name, company })
		);

		// Send email
		await transporter.sendMail({
			from: process.env.SMTP_FROM!,
			to: email,
			subject: "Thank you for contacting RiverCity Creatives",
			html,
		});

		return NextResponse.json({
			message: 'Contact received and confirmation email sent.',
		});
	} catch (error: any) {
		console.error('Contact Lead Error:', error);
		return NextResponse.json(
			{ message: 'An error occurred while processing your contact.' },
			{ status: 500 }
		);
	}
}
