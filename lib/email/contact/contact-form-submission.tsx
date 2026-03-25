import React from "react";

export function ContactFormSubmissionEmail({
	name,
	email,
	phone,
	company,
	message,
	submittedAt,
}: {
	name: string;
	email: string;
	phone: string;
	company?: string;
	message: string;
	submittedAt?: string;
}) {
	return (
		<div style={{ margin: 0, padding: 0, background: '#f6f7fb' }}>
			<table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ background: '#f6f7fb', padding: '28px 0' }}>
				<tr>
					<td align="center">
						<table role="presentation" cellPadding={0} cellSpacing={0} border={0} width={600} style={{ width: 600, maxWidth: 600 }}>
							<tr>
								<td style={{ padding: '0 14px' }}>
									<table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 24, overflow: 'hidden' }}>
										<tr>
											<td style={{ padding: '16px 18px', background: '#091a33' }}>
												<div style={{ fontFamily: 'Arial, sans-serif', color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '0.2px', textAlign: 'center' }}>
													<img src="https://rivercitycreatives.com/logo-rivercity-creatives-horizontal-green-white.png" alt="River City Creatives Logo" style={{ maxWidth: 180, height: 'auto', display: 'inline-block' }} />
												</div>
											</td>
										</tr>
										<tr>
											<td style={{ padding: '22px 18px', background: '#fff' }}>
												<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', color: '#111827', lineHeight: 1.6 }}>
													<h2 style={{ fontFamily: 'Maven Pro, Arial, sans-serif', margin: '0 0 10px 0', fontSize: 22, color: '#091a33', lineHeight: 1.25 }}>
														New Contact Form Submission
													</h2>
													<p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
														You’ve received a new message from your website contact form.
													</p>
													<table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 18 }}>
														<tr>
															<td style={{ padding: 16 }}>
																<div style={{ fontFamily: 'Maven Pro, Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33', marginBottom: 8 }}>
																	Contact Details
																</div>
																<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', marginBottom: 6 }}>
																	<strong>Name:</strong> {name}
																</div>
																<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', marginBottom: 6 }}>
																	<strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#0c2244', textDecoration: 'underline' }}>{email}</a>
																</div>
																<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', marginBottom: 6 }}>
																	<strong>Phone:</strong> <a href={`tel:${phone}`} style={{ color: '#0c2244', textDecoration: 'underline' }}>{phone}</a>
																</div>
																{company && (
																	<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', marginBottom: 6 }}>
																		<strong>Company:</strong> {company}
																	</div>
																)}
																<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', marginBottom: 6 }}>
																	<strong>Submitted:</strong> {submittedAt ? submittedAt : "(time not provided)"}
																</div>
															</td>
														</tr>
													</table>
													<table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
														<tr>
															<td style={{ padding: 16 }}>
																<div style={{ fontFamily: 'Maven Pro, Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33', marginBottom: 8 }}>
																	Message
																</div>
																<div style={{ fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 15, color: '#111827', background: '#f6f7fb', borderRadius: 8, padding: 12 }}>
																	{message.split('\n').map((line, idx) => (
																		<React.Fragment key={idx}>
																			{line}
																			<br />
																		</React.Fragment>
																	))}
																</div>
															</td>
														</tr>
													</table>
													<div style={{ marginTop: 22, fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 11, color: '#6b7280' }}>
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
	);
}
