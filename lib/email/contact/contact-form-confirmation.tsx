
import { EmailFooter } from "@/lib/email/layout/footer";

export function ContactFormConfirmationEmail({ name, company }: { name: string; company?: string }) {
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
														Thank you for reaching out!
													</h2>
													<p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
														Hi {name}{company ? ` from ${company}` : ''},<br />
													</p>
													<p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
														We’ve received your message and appreciate your interest in working with RiverCity Creatives.
													</p>
													<p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
														Our team will review your submission and get back to you shortly. If you have any urgent questions, feel free to reply to this email.
													</p>
													<EmailFooter />
													<div style={{ marginTop: 22, fontFamily: 'Source Sans 3, Arial, sans-serif', fontSize: 11, color: '#6b7280' }}>
														You’re receiving this email because you submitted a contact form on our website.
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