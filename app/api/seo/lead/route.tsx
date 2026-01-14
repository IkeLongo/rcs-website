export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ovhPool } from "@/app/lib/mysql";
import { enrichIssues } from "@/app/lib/seo/fixLibrary";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
}

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  url: {
    fontSize: 12,
    marginBottom: 24,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scoreRow: {
    fontSize: 11,
    marginBottom: 4,
  },
  issueContainer: {
    marginBottom: 12,
  },
  issueTitle: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  issueFix: {
    fontSize: 10,
    color: '#444',
    marginLeft: 12,
  },
});

// Clean PDF for v1
function SeoReportPdf({ scan }: { scan: any }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>SEO Fix Report</Text>
        <Text style={styles.url}>{scan.url}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.scoreRow}>Overall Grade: {scan.grade}</Text>
          <Text style={styles.scoreRow}>SEO Score: {scan.scores?.seo ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Performance Score: {scan.scores?.performance ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Best Practices: {scan.scores?.bestPractices ?? "N/A"}</Text>
          <Text style={styles.scoreRow}>Accessibility: {scan.scores?.accessibility ?? "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Issues to Fix</Text>
          {(scan.issues || []).map((issue: any, idx: number) => (
            <View key={idx} style={styles.issueContainer}>
              <Text style={styles.issueTitle}>
                {idx + 1}. {issue.title}
              </Text>
              <Text style={styles.issueFix}>Why it matters: {issue.why}</Text>

              {(issue.fix || []).map((s: string, i: number) => (
                <Text key={i} style={styles.issueFix}>• {s}</Text>
              ))}

              {(issue.verify || []).length ? (
                <>
                  <Text style={[styles.issueFix, { marginTop: 6 }]}>Verify:</Text>
                  {issue.verify.map((v: string, i: number) => (
                    <Text key={i} style={styles.issueFix}>• {v}</Text>
                  ))}
                </>
              ) : null}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

function scoreBorder(score: number | null) {
  if (score === null) return "#e5e7eb"; // neutral gray
  if (score >= 90) return "#22c55e";    // green
  if (score >= 80) return "#facc15";    // yellow
  return "#ef4444";                     // red
}

function scoreBg(score: number | null) {
  if (score === null) return "#f9fafb";
  if (score >= 90) return "#ecfdf5";    // light green
  if (score >= 80) return "#fffbeb";    // light yellow
  return "#fef2f2";                     // light red
}

export async function POST(req: Request) {
  try {
    console.log("[SEO Lead] Processing new report request");

    // Validate request payload
    const { email, scan } = await req.json();

    if (!isEmail(email)) {
      console.error("[SEO Lead] Invalid email provided");
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    if (!scan?.url || !scan?.scores || !Array.isArray(scan?.issues)) {
      console.error("[SEO Lead] Invalid scan data");
      return NextResponse.json({ error: "Missing scan payload" }, { status: 400 });
    }

    const trimmedEmail = email.trim();
    console.log("[SEO Lead] Processing for:", trimmedEmail, "| URL:", scan.url);

    // 1) Store lead + scan snapshot in database
    try {
      const issuesJson = JSON.stringify(scan.issues);
      const psiMetaJson = JSON.stringify(scan.psiMeta || {});

    await ovhPool.execute(
      `INSERT INTO seo_leads
        (email, url, seo_score, perf_score, best_score, a11y_score, issues_json, psi_meta_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        trimmedEmail,
        scan.url,
        scan.scores?.seo ?? null,
        scan.scores?.performance ?? null,
        scan.scores?.bestPractices ?? null,
        scan.scores?.accessibility ?? null,
        issuesJson,
        psiMetaJson,
      ]
    );
      console.log("[SEO Lead] Saved to database");
    } catch (dbError: any) {
      console.error("[SEO Lead] Database error:", dbError);
      // Continue anyway - email is more important than storage
    }

    // 2) Generate PDF report
    console.log("[SEO Lead] Generating PDF report");
    const enrichedScan = {
      ...scan,
      issues: enrichIssues(scan.issues),
    };

    const pdfBuffer = await renderToBuffer(<SeoReportPdf scan={enrichedScan} />);
    console.log("[SEO Lead] PDF generated successfully");

    // 3) Send email with PDF attachment
    console.log("[SEO Lead] Sending email");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // ✅ important
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      logger: true,
      debug: true,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    });

    await transporter.verify();
    console.log("[SEO Lead] SMTP verified OK");

    const seoBorder = scoreBorder(scan.scores?.seo ?? null);
    const seoBg = scoreBg(scan.scores?.seo ?? null);

    const perfBorder = scoreBorder(scan.scores?.performance ?? null);
    const perfBg = scoreBg(scan.scores?.performance ?? null);

    const bpBorder = scoreBorder(scan.scores?.bestPractices ?? null);
    const bpBg = scoreBg(scan.scores?.bestPractices ?? null);

    const a11yBorder = scoreBorder(scan.scores?.accessibility ?? null);
    const a11yBg = scoreBg(scan.scores?.accessibility ?? null);

    const emailHtml = `
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
                          <div style="font-family: Arial, sans-serif; color:#ffffff; font-weight:700; font-size:16px; letter-spacing:0.2px;">
                            River City Creatives
                          </div>
                          <div style="font-family: Arial, sans-serif; color:#cbd5e1; font-size:12px; margin-top:4px;">
                            Free SEO Scan • Fix Report
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
                                  <span style="display:inline-block; padding:12px 16px; font-family: Arial, sans-serif; font-weight:700; color:#091a33; font-size:14px;">
                                    PDF Attached: SEO Fix Report
                                  </span>
                                </td>
                              </tr>
                            </table>

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
                              River City Creatives<br/>
                              Web Design & SEO for Growing Businesses
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

    await transporter.sendMail({
      from: process.env.SMTP_FROM!,
      to: trimmedEmail,
      subject: `Your SEO Audit Results Are In — Here’s What to Fix First`,
      text: `Here's your SEO fix report for ${scan.url}. Your site scored: ${scan.grade}. See the attached PDF for detailed fixes.`,
      html: emailHtml,
      attachments: [
        {
          filename: "seo-fix-report.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("[SEO Lead] Email sent successfully to:", trimmedEmail);
    return NextResponse.json({ ok: true });

  } catch (e: any) {
    console.error("[SEO Lead] Unhandled error:", e);
    console.error("[SEO Lead] Error stack:", e?.stack);
    return NextResponse.json(
      { error: e?.message || "Failed to send report" },
      { status: 500 }
    );
  }
}
