export function getContactFormSubmissionHtml({
	name,
	email,
	company,
	message,
	submittedAt,
}: {
	name: string;
	email: string;
	company?: string;
	message: string;
	submittedAt?: string;
}) {
	return `
	<div style="margin:0; padding:0; background:#f6f7fb;">
		<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7fb; padding: 28px 0;">
			<tr>
				<td align="center">
					<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px;">
						<tr>
							<td style="padding: 0 14px;">
								<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff; border:1px solid #e5e7eb; border-radius:24px; overflow:hidden;">
									<tr>
										<td style="padding: 16px 18px; background:#091a33;">
											<div style="font-family: Arial, sans-serif; color:#ffffff; font-weight:700; font-size:16px; letter-spacing:0.2px; text-align:center;">
												<img src="https://rivercitycreatives.com/logo-rivercity-creatives-horizontal-green-white.png" alt="River City Creatives Logo" style="max-width:180px; height:auto; display:inline-block;" />
											</div>
										</td>
									</tr>
									<tr>
										<td style="padding: 22px 18px; background:#ffffff;">
											<div style="font-family: 'Source Sans 3', Arial, sans-serif; color:#111827; line-height:1.6;">
												<h2 style="margin:0 0 10px 0; font-size:22px; color:#091a33; line-height:1.25;">
													New Contact Form Submission
												</h2>
												<p style="margin: 0 0 12px 0; font-size: 15px;">
													You’ve received a new message from your website contact form.
												</p>
												<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 14px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:18px;">
													<tr>
														<td style="padding: 16px;">
															<div style="font-family: 'Maven Pro', Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33; margin-bottom:8px;">
																Contact Details
															</div>
															<div style="font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827; margin-bottom:6px;">
																<strong>Name:</strong> ${name}
															</div>
															<div style="font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827; margin-bottom:6px;">
																<strong>Email:</strong> <a href="mailto:${email}" style="color:#0c2244; text-decoration:underline;">${email}</a>
															</div>
															${company ? `<div style="font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827; margin-bottom:6px;"><strong>Company:</strong> ${company}</div>` : ""}
															<div style="font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827; margin-bottom:6px;">
																<strong>Submitted:</strong> ${submittedAt ? submittedAt : "(time not provided)"}
															</div>
														</td>
													</tr>
												</table>
												<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
													<tr>
														<td style="padding: 16px;">
															<div style="font-family: 'Maven Pro', sans-serif; font-size:14px; font-weight:800; color:#091a33; margin-bottom:8px;">
																Message
															</div>
															<div style="font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827; background:#f6f7fb; border-radius:8px; padding:12px;">
																${message.replace(/\n/g, "<br/>")}
															</div>
														</td>
													</tr>
												</table>
												<div style="margin-top: 18px; font-family: 'Source Sans 3', Arial, sans-serif; font-size:15px; color:#111827;">
													Best regards,<br/>
													<strong style="color:#091a33;">River City Creatives</strong><br/>
													Web Design & Branding Team
												</div>
												<div style="margin-top: 22px; font-family: 'Source Sans 3', Arial, sans-serif; font-size:11px; color:#6b7280;">
													You’re receiving this email because someone submitted your website contact form.
												</div>
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</div>
	`;
}
