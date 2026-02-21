export function getWebsiteRevenueChecklistEmailHtml({
  websiteUrl,
  checklistUrl,
  bookingUrl,
  firstName,
}: {
  websiteUrl: string;
  checklistUrl: string; // link to the PDF (or hosted version)
  bookingUrl: string;   // your /booking link
  firstName?: string;
}) {
  const name = firstName?.trim() ? firstName.trim() : "there";

  return `
  <div style="margin:0; padding:0; background:#f6f7fb;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7fb; padding: 28px 0;">
      <tr>
        <td align="center">

          <!-- Container -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px; max-width:600px;">
            <tr>
              <td style="padding: 0 14px;">

                <!-- Top brand bar -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff; border:1px solid #e5e7eb; border-radius:24px; overflow:hidden;">
                  <tr>
                    <td style="padding: 16px 18px; background:#091a33;">
                      <div style="font-family: Arial, sans-serif; color:#ffffff; font-weight:700; font-size:16px; letter-spacing:0.2px; text-align:center;">
                        <img src="https://rivercitycreatives.com/logo-rivercity-creatives-horizontal-green-white.png" alt="River City Creatives Logo" style="max-width:180px; height:auto; display:inline-block;" />
                      </div>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 22px 18px; background:#ffffff;">
                      <div style="font-family: Arial, sans-serif; color:#111827; line-height:1.6;">

                        <h2 style="margin:0 0 10px 0; font-size:22px; color:#091a33; line-height:1.25;">
                          Your Website Revenue Checklist is ready
                        </h2>

                        <p style="margin: 0 0 12px 0; font-size: 15px;">
                          Hi ${name},
                        </p>

                        <p style="margin: 0 0 14px 0; font-size: 15px;">
                          Thanks for joining the newsletter. Here’s your <strong>Founder Website Revenue Checklist</strong> for
                          <strong>${websiteUrl}</strong>.
                          It’s a simple, non-technical guide to spot the most common website leaks that quietly reduce inquiries.
                        </p>

                        <!-- CTA: View checklist -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0 10px 0;">
                          <tr>
                            <td style="background:#d9e64e; border-radius:14px;">
                              <a href="${checklistUrl}" style="display:inline-block; padding:12px 16px; font-family: Arial, sans-serif; font-weight:700; color:#091a33; font-size:14px; text-decoration:none;">
                                View the Checklist
                              </a>
                            </td>
                          </tr>
                        </table>

                        <div style="font-size:11px; color:#6b7280; margin-top:2px; font-family: Arial, sans-serif;">
                          <em>If the button doesn’t open, check your email attachments or copy/paste the link into your browser.</em>
                        </div>

                        <!-- What’s inside -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                What you’ll get inside
                              </div>

                              <ul style="margin: 10px 0 0 18px; padding:0; color:#111827; font-family: Arial, sans-serif; font-size:15px;">
                                <li style="margin-bottom:6px;">A quick clarity test (so visitors instantly “get it”)</li>
                                <li style="margin-bottom:6px;">The most common places inquiries get lost (and how to fix them)</li>
                                <li style="margin-bottom:6px;">Trust builders that increase conversions without a redesign</li>
                                <li style="margin-bottom:0;">Quick wins you can implement in ~30 minutes</li>
                              </ul>
                            </td>
                          </tr>
                        </table>

                        <!-- Mini definition card -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Quick definition
                              </div>
                              <div style="font-family: Arial, sans-serif; font-size:15px; color:#111827; margin-top:8px;">
                                A <strong>call-to-action (CTA)</strong> is the main button or action you want visitors to take.
                                Examples: <em>“Book a Call”</em>, <em>“Request a Quote”</em>, <em>“Contact Us”</em>.
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Bottom CTA: Book a call -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Want a personalized “fix this first” plan?
                              </div>
                              <div style="font-family: Arial, sans-serif; font-size:15px; color:#111827; margin-top:8px;">
                                If you want, we can review your site together and outline the highest-impact changes to increase
                                inquiries — without overcomplicating it.
                              </div>

                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 14px 0 0 0;">
                                <tr>
                                  <td style="background:#091a33; border-radius:14px;">
                                    <a href="${bookingUrl}" style="display:inline-block; padding:12px 16px; font-family: Arial, sans-serif; font-weight:700; color:#ffffff; font-size:14px; text-decoration:none;">
                                      Book a Free Strategy Call
                                    </a>
                                  </td>
                                </tr>
                              </table>

                              <div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; margin-top:10px;">
                                Tip: reply with <strong>CHECKLIST</strong> and I’ll take a look at your homepage first.
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Signature -->
                        <div style="margin-top: 18px; font-family: Arial, sans-serif; font-size:15px; color:#111827;">
                          Best regards,<br/>
                          <strong style="color:#091a33;">Isaac Longoria</strong><br/>
                          RiverCity Creatives<br/>
                          Web Design + Strategy for Revenue-Focused Brands
                        </div>

                        <!-- Footer -->
                        <div style="margin-top: 22px; font-family: Arial, sans-serif; font-size:11px; color:#6b7280;">
                          You’re receiving this email because you opted into the RiverCity Creatives newsletter and requested the Website Revenue Checklist for ${websiteUrl}.
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