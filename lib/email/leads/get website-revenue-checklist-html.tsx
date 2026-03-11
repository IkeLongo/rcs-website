import { EmailFooter } from "@/lib/email/layout/footer";

export function WebsiteRevenueChecklistEmail({
  websiteUrl,
  checklistUrl,
  bookingUrl,
  firstName,
}: {
  websiteUrl: string;
  checklistUrl: string;
  bookingUrl: string;
  firstName?: string;
}) {
  const name = firstName?.trim() ? firstName.trim() : "there";
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
                            Your Website Revenue Checklist is ready
                          </h2>
                          <p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
                            Hi {name},
                          </p>
                          <p style={{ margin: '0 0 14px 0', fontSize: 15 }}>
                            Thanks for joining the newsletter.<br />
                            It’s a simple, non-technical guide to spot the most common website leaks that quietly reduce inquiries.
                          </p>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  What you’ll get inside
                                </div>
                                <ul style={{ margin: '10px 0 0 18px', padding: 0, color: '#111827', fontFamily: 'Arial, sans-serif', fontSize: 15 }}>
                                  <li style={{ marginBottom: 6 }}>A quick clarity test (so your value is immediately clear)</li>
                                  <li style={{ marginBottom: 6 }}>The most common places inquiries get lost (and how to fix them)</li>
                                  <li style={{ marginBottom: 6 }}>Trust builders that increase conversions without a redesign</li>
                                  <li style={{ marginBottom: 0 }}>Quick wins you can implement in ~30 minutes</li>
                                </ul>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  Quick definition
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827', marginTop: 8 }}>
                                  A <strong>call-to-action (CTA)</strong> is the main button or action you want visitors to take.
                                  Examples: <em>“Book a Call”</em>, <em>“Request a Quote”</em>, <em>“Contact Us”</em>.
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  Want a personalized “fix this first” plan?
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827', marginTop: 8 }}>
                                  If you want, we can review your site together and outline the highest-impact changes to increase inquiries — without overcomplicating it.
                                </div>
                                <table role="presentation" cellPadding={0} cellSpacing={0} border={0} style={{ margin: '14px 0 0 0' }}>
                                  <tr>
                                    <td style={{ background: '#d9e64e', borderRadius: 14 }}>
                                      <a href={bookingUrl} style={{ display: 'inline-block', padding: '12px 16px', fontFamily: 'Arial, sans-serif', fontWeight: 700, color: '#091a33', fontSize: 14, textDecoration: 'none' }}>
                                        Book a Free Strategy Call
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', marginTop: 10 }}>
                                  Tip: reply with <strong>CHECKLIST</strong> and I’ll take a look at your homepage first.
                                </div>
                              </td>
                            </tr>
                          </table>
                          <EmailFooter />
                          <div style={{ marginTop: 22, fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#6b7280' }}>
                            You’re receiving this email because you opted into the RiverCity Creatives newsletter and requested the Website Revenue Checklist.
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