export function getSeoReportEmailHtml({
  scan, reportUrl,
  seoBorder, seoBg,
  perfBorder, perfBg,
  bpBorder, bpBg,
  a11yBorder, a11yBg
}: {
  scan: any, reportUrl: string,
  seoBorder: string, seoBg: string,
  perfBorder: string, perfBg: string,
  bpBorder: string, bpBg: string,
  a11yBorder: string, a11yBg: string
}) {
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
                          Your SEO Fix Report for ${scan.url}
                        </h2>

                        <p style="margin: 0 0 12px 0; font-size: 15px;">
                          Hi there,
                        </p>

                        <p style="margin: 0 0 14px 0; font-size: 15px;">
                          Thanks for requesting an SEO scan for <strong>${scan.url}</strong>. We’ve attached a custom report that highlights the
                          <strong>highest-impact issues</strong> affecting visibility, performance, and user experience.
                        </p>

                        <!-- CTA -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0 10px 0;">
                          <tr>
                            <td style="background:#d9e64e; border-radius:14px;">
                              <a href="${reportUrl}" style="display:inline-block; padding:12px 16px; font-family: Arial, sans-serif; font-weight:700; color:#091a33; font-size:14px; text-decoration:none;">
                                View Your Report
                              </a>
                            </td>
                          </tr>
                        </table>
                        <div style="font-size:11px; color:#6b7280; margin-top:2px; font-family: Arial, sans-serif;">
                          <em>If clicking the button does not open the PDF, please check the attachment in your email client.</em>
                        </div>

                        <!-- Quick Snapshot card -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:12px; color:#111827; text-transform:uppercase; letter-spacing:0.9px; font-weight:700;">
                                Quick Snapshot
                              </div>

                              <div style="font-family: Arial, sans-serif; margin-top:6px; font-size:20px; font-weight:800; color:#091a33;">
                                ${scan.grade}
                              </div>

                              <div style="font-family: Arial, sans-serif; margin-top:6px; font-size:12px; color:#111827;">
                                Scanned: <span style="font-weight:700;">${scan.url}</span>
                              </div>

                              <!-- Score “cards” (2x2 table) -->
                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 14px;">
                                <tr>
                                  <td width="50%" style="padding: 6px;">
                                    <div style="border: 2px solid ${seoBorder}; background: ${seoBg}; border-radius:16px; padding: 12px;">
                                      <div style="font-family: Arial, sans-serif; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#111827;">
                                        SEO
                                      </div>
                                      <div style="font-family: Arial, sans-serif; font-size:22px; font-weight:800; color:#091a33; margin-top:6px;">
                                        ${scan.scores?.seo ?? "N/A"}
                                      </div>
                                    </div>
                                  </td>

                                  <td width="50%" style="padding: 6px;">
                                    <div style="border: 2px solid ${perfBorder}; background: ${perfBg}; border-radius:16px; padding: 12px;">
                                      <div style="font-family: Arial, sans-serif; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#111827;">
                                        Performance
                                      </div>
                                      <div style="font-family: Arial, sans-serif; font-size:22px; font-weight:800; color:#091a33; margin-top:6px;">
                                        ${scan.scores?.performance ?? "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td width="50%" style="padding: 6px;">
                                    <div style="border: 2px solid ${bpBorder}; background: ${bpBg}; border-radius:16px; padding: 12px;">
                                      <div style="font-family: Arial, sans-serif; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#111827;">
                                        Best Practices
                                      </div>
                                      <div style="font-family: Arial, sans-serif; font-size:22px; font-weight:800; color:#091a33; margin-top:6px;">
                                        ${scan.scores?.bestPractices ?? "N/A"}
                                      </div>
                                    </div>
                                  </td>

                                  <td width="50%" style="padding: 6px;">
                                    <div style="border: 2px solid ${a11yBorder}; background: ${a11yBg}; border-radius:16px; padding: 12px;">
                                      <div style="font-family: Arial, sans-serif; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#111827;">
                                        Accessibility
                                      </div>
                                      <div style="font-family: Arial, sans-serif; font-size:22px; font-weight:800; color:#091a33; margin-top:6px;">
                                        ${scan.scores?.accessibility ?? "N/A"}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </table>

                        <!-- What’s inside -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                What’s inside the report
                              </div>

                              <ul style="margin: 10px 0 0 18px; padding:0; color:#111827; font-family: Arial, sans-serif; font-size:15px;">
                                <li style="margin-bottom:6px;">Your overall grade and core scores</li>
                                <li style="margin-bottom:6px;">The <strong>top issues worth fixing first</strong> (prioritized by impact)</li>
                                <li style="margin-bottom:6px;">Clear explanations of <strong>why each fix matters</strong></li>
                                <li style="margin-bottom:0;">Step-by-step recommendations you can act on immediately</li>
                              </ul>
                            </td>
                          </tr>
                        </table>

                        <!-- Reply CTA -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Want help implementing these improvements?
                              </div>
                              <div style="font-family: Arial, sans-serif; font-size:15px; color:#111827; margin-top:8px;">
                                Reply to this email and we’ll walk through the findings with you and recommend the best next steps.
                              </div>

                              <div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; margin-top:10px;">
                                Tip: reply with <strong>SEO</strong> and we’ll know exactly what you’re referencing.
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Signature -->
                        <div style="margin-top: 18px; font-family: Arial, sans-serif; font-size:15px; color:#111827;">
                          Best regards,<br/>
                          <strong style="color:#091a33;">Isaac Longoria</strong><br/>
                          RiverCity Creatives<br/>
                          Web Strategy & SEO for Growing Businesses
                        </div>

                        <!-- Footer -->
                        <div style="margin-top: 22px; font-family: Arial, sans-serif; font-size:11px; color:#6b7280;">
                          You’re receiving this email because you requested an SEO audit for ${scan.url}.
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