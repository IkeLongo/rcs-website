import React from "react";
import { EmailFooter } from "@/lib/email/layout/footer";

export function SeoReportEmail({
  scan,
  reportUrl,
  seoBorder,
  seoBg,
  perfBorder,
  perfBg,
  bpBorder,
  bpBg,
  a11yBorder,
  a11yBg,
}: {
  scan: any;
  reportUrl: string;
  seoBorder: string;
  seoBg: string;
  perfBorder: string;
  perfBg: string;
  bpBorder: string;
  bpBg: string;
  a11yBorder: string;
  a11yBg: string;
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
                        <div style={{ fontFamily: 'Arial, sans-serif', color: '#111827', lineHeight: 1.6 }}>
                          <h2 style={{ margin: '0 0 10px 0', fontSize: 22, color: '#091a33', lineHeight: 1.25 }}>
                            Your SEO Fix Report is ready!
                          </h2>
                          <p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
                            Hi there,
                          </p>
                          <p style={{ margin: '0 0 14px 0', fontSize: 15 }}>
                            Thanks for requesting an SEO scan for <strong>{scan.url}</strong>. We’ve attached a custom report that highlights the
                            <strong>highest-impact issues</strong> affecting visibility, performance, and user experience.
                          </p>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} style={{ margin: '16px 0 10px 0' }}>
                            <tr>
                              <td style={{ background: '#d9e64e', borderRadius: 14 }}>
                                <a href={reportUrl} style={{ display: 'inline-block', padding: '12px 16px', fontFamily: 'Arial, sans-serif', fontWeight: 700, color: '#091a33', fontSize: 14, textDecoration: 'none' }}>
                                  View Your Report
                                </a>
                              </td>
                            </tr>
                          </table>
                          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2, fontFamily: 'Arial, sans-serif' }}>
                            <em>If clicking the button does not open the PDF, please check the attachment in your email client.</em>
                          </div>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.9px', fontWeight: 700 }}>
                                  Quick Snapshot
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', marginTop: 6, fontSize: 20, fontWeight: 800, color: '#091a33' }}>
                                  {scan.grade}
                                </div>
                                <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14 }}>
                                  <tr>
                                    <td width="50%" style={{ padding: 6 }}>
                                      <div style={{ border: `2px solid ${seoBorder}`, background: seoBg, borderRadius: 16, padding: 12 }}>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#111827' }}>
                                          SEO
                                        </div>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 800, color: '#091a33', marginTop: 6 }}>
                                          {scan.scores?.seo ?? 'N/A'}
                                        </div>
                                      </div>
                                    </td>
                                    <td width="50%" style={{ padding: 6 }}>
                                      <div style={{ border: `2px solid ${perfBorder}`, background: perfBg, borderRadius: 16, padding: 12 }}>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#111827' }}>
                                          Performance
                                        </div>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 800, color: '#091a33', marginTop: 6 }}>
                                          {scan.scores?.performance ?? 'N/A'}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="50%" style={{ padding: 6 }}>
                                      <div style={{ border: `2px solid ${bpBorder}`, background: bpBg, borderRadius: 16, padding: 12 }}>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#111827' }}>
                                          Best Practices
                                        </div>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 800, color: '#091a33', marginTop: 6 }}>
                                          {scan.scores?.bestPractices ?? 'N/A'}
                                        </div>
                                      </div>
                                    </td>
                                    <td width="50%" style={{ padding: 6 }}>
                                      <div style={{ border: `2px solid ${a11yBorder}`, background: a11yBg, borderRadius: 16, padding: 12 }}>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#111827' }}>
                                          Accessibility
                                        </div>
                                        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 22, fontWeight: 800, color: '#091a33', marginTop: 6 }}>
                                          {scan.scores?.accessibility ?? 'N/A'}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  What’s inside the report
                                </div>
                                <ul style={{ margin: '10px 0 0 18px', padding: 0, color: '#111827', fontFamily: 'Arial, sans-serif', fontSize: 15 }}>
                                  <li style={{ marginBottom: 6 }}>Your overall grade and core scores</li>
                                  <li style={{ marginBottom: 6 }}>The <strong>top issues worth fixing first</strong> (prioritized by impact)</li>
                                  <li style={{ marginBottom: 6 }}>Clear explanations of <strong>why each fix matters</strong></li>
                                  <li style={{ marginBottom: 0 }}>Step-by-step recommendations you can act on immediately</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  Want help implementing these improvements?
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827', marginTop: 8 }}>
                                  Reply to this email and we’ll walk through the findings with you and recommend the best next steps.
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', marginTop: 10 }}>
                                  Tip: reply with <strong>SEO</strong> and we’ll know exactly what you’re referencing.
                                </div>
                              </td>
                            </tr>
                          </table>
                          <div style={{ marginTop: 18, fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827' }}>
                            Best regards,<br />
                            <strong style={{ color: '#091a33' }}>Isaac Longoria</strong><br />
                            RiverCity Creatives<br />
                            Web Strategy & SEO for Growing Businesses
                          </div>
                          <div style={{ marginTop: 22, fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#6b7280' }}>
                            You’re receiving this email because you requested an SEO audit for {scan.url}.
                          </div>
                          <EmailFooter />
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