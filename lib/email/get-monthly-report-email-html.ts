type MonthlyReportData = {
  range: { startDate: string; endDate: string };
  traffic: { activeUsers: number; sessions: number; pageViews: number };
  topPages: { path: string; views: number }[];
  ctas: {
    total: number;
    notSet?: number;
    leaderboard: { key: string; count: number }[]; // key = cta_id
  };
  forms: {
    submitSuccessTotal: number;
    notSet?: number;
    byId?: { key: string; count: number }[]; // key = form_id
  };
};

export function renderMonthlyReportEmailHtml({
  clientName,
  report,
  bookingUrl,
  websiteUrl,
  firstName,
}: {
  clientName: string;
  report: MonthlyReportData;
  bookingUrl: string;
  websiteUrl?: string;
  firstName?: string;
}) {
  const name = firstName?.trim() ? firstName.trim() : "there";
  const monthLabel = formatMonthLabel(report.range.startDate, report.range.endDate);

  const topPagesHtml = renderTopList(
    report.topPages?.map((p) => ({
      label: safeText(p.path),
      value: `${Number(p.views || 0).toLocaleString()} views`,
      href: websiteUrl ? joinUrl(websiteUrl, p.path) : undefined,
    })) ?? []
  );

  const ctaLeaderboardHtml = renderTopList(
    (report.ctas?.leaderboard ?? []).slice(0, 5).map((x) => ({
      label: safeText(x.key),
      value: `${Number(x.count || 0).toLocaleString()}`,
    }))
  );

  const formsById = report.forms?.byId ?? [];
  const formsByIdHtml = formsById.length
    ? renderTopList(formsById.slice(0, 5).map((x) => ({ label: safeText(x.key), value: String(x.count) })))
    : `<div style="font-family: Arial, sans-serif; font-size:14px; color:#6b7280; margin-top:8px;">
         No form breakdown available yet (this typically appears after GA processes new custom dimensions).
       </div>`;

  const ctaNotSet = Number(report.ctas?.notSet ?? 0);
  const formsNotSet = Number(report.forms?.notSet ?? 0);

  const diagnosticsNote =
    ctaNotSet > 0 || formsNotSet > 0
      ? `<div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; margin-top:10px;">
           Note: Some events were grouped as <strong>(not set)</strong>. This can happen due to analytics processing timing,
           ad blockers, or events missing parameters.
         </div>`
      : "";

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
                          Monthly Website Performance Report — ${monthLabel}
                        </h2>

                        <p style="margin: 0 0 12px 0; font-size: 15px;">
                          Hi ${name},
                        </p>

                        <p style="margin: 0 0 14px 0; font-size: 15px;">
                          Here’s a clear snapshot of <strong>${clientName}</strong> website performance for <strong>${monthLabel}</strong>.
                          ${websiteUrl ? `You can reference the site here: <a href="${websiteUrl}" style="color:#091a33; font-weight:700; text-decoration:none;">${websiteUrl}</a>.` : ""}
                        </p>

                        <!-- Traffic Snapshot -->
                        ${metricCardHtml({
                          title: "Traffic snapshot",
                          rows: [
                            { label: "Active users", value: n(report.traffic.activeUsers) },
                            { label: "Sessions", value: n(report.traffic.sessions) },
                            { label: "Page views", value: n(report.traffic.pageViews) },
                          ],
                          subtitle: `Range: ${report.range.startDate} → ${report.range.endDate}`,
                        })}

                        <!-- Top pages -->
                        ${simpleCardHtml({
                          title: "Top pages",
                          body: topPagesHtml || emptyState("No page view data available for this date range."),
                        })}

                        <!-- CTA performance -->
                        ${simpleCardHtml({
                          title: "CTA performance",
                          body: `
                            ${miniKpisHtml([
                              { label: "Total CTA clicks", value: n(report.ctas.total) },
                              { label: "(not set)", value: n(ctaNotSet) },
                            ])}
                            <div style="margin-top:10px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Top CTAs
                              </div>
                              ${ctaLeaderboardHtml || emptyState("No CTA breakdown available yet.")}
                              ${diagnosticsNote}
                            </div>
                          `,
                        })}

                        <!-- Form submissions -->
                        ${simpleCardHtml({
                          title: "Leads and form submissions",
                          body: `
                            ${miniKpisHtml([
                              { label: "Successful submissions", value: n(report.forms.submitSuccessTotal) },
                              { label: "(not set)", value: n(formsNotSet) },
                            ])}
                            <div style="margin-top:10px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Submissions by form
                              </div>
                              ${formsByIdHtml}
                              ${formsNotSet > 0 ? diagnosticsNote : ""}
                            </div>
                          `,
                        })}

                        <!-- Next steps -->
                        ${simpleCardHtml({
                          title: "Suggested next steps",
                          body: `
                            <ul style="margin: 10px 0 0 18px; padding:0; color:#111827; font-family: Arial, sans-serif; font-size:15px;">
                              <li style="margin-bottom:6px;">Double down on your top-performing CTA placements.</li>
                              <li style="margin-bottom:6px;">Improve clarity on your top pages to increase clicks and inquiries.</li>
                              <li style="margin-bottom:0;">We can review friction points and propose high-impact updates.</li>
                            </ul>
                          `,
                        })}

                        <!-- CTA -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                          style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
                          <tr>
                            <td style="padding: 16px;">
                              <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
                                Want a simple “fix this first” plan for next month?
                              </div>
                              <div style="font-family: Arial, sans-serif; font-size:15px; color:#111827; margin-top:8px;">
                                If you’d like, we can review this report together and prioritize the highest-impact improvements.
                              </div>

                              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 14px 0 0 0;">
                                <tr>
                                  <td style="background:#d9e64e; border-radius:14px;">
                                    <a href="${bookingUrl}" style="display:inline-block; padding:12px 16px; font-family: Arial, sans-serif; font-weight:700; color:#091a33; font-size:14px; text-decoration:none;">
                                      Book a Review Call
                                    </a>
                                  </td>
                                </tr>
                              </table>

                              <div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; margin-top:10px;">
                                Tip: reply with <strong>REPORT</strong> and I’ll point out the single biggest opportunity I see.
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
                          You’re receiving this email because RiverCity Creatives manages your website and provides performance reporting.
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

/* ---------------- helpers (no external deps) ---------------- */

function n(v: number) {
  return Number(v || 0).toLocaleString();
}

function safeText(s: string) {
  return (s ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function joinUrl(base: string, path: string) {
  try {
    const u = new URL(base);
    // ensure pathname join is clean
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    u.pathname = cleanPath;
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return base;
  }
}

function formatMonthLabel(startDate: string, endDate: string) {
  // startDate expected YYYY-MM-DD
  const [y, m] = startDate.split("-").map((x) => Number(x));
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const month = monthNames[(m || 1) - 1] ?? "Month";
  return `${month} ${y || ""}`.trim();
}

function emptyState(text: string) {
  return `<div style="font-family: Arial, sans-serif; font-size:14px; color:#6b7280; margin-top:8px;">${safeText(
    text
  )}</div>`;
}

function renderTopList(items: { label: string; value: string; href?: string }[]) {
  if (!items.length) return "";

  const rows = items
    .map((it) => {
      const label = it.href
        ? `<a href="${it.href}" style="color:#091a33; font-weight:700; text-decoration:none;">${safeText(it.label)}</a>`
        : `<span style="color:#091a33; font-weight:700;">${safeText(it.label)}</span>`;

      return `
        <tr>
          <td style="padding:10px 0; border-top:1px solid #e5e7eb;">
            <div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
              <div style="font-family: Arial, sans-serif; font-size:14px;">${label}</div>
              <div style="font-family: Arial, sans-serif; font-size:14px; color:#111827; font-weight:800; white-space:nowrap;">${safeText(
                it.value
              )}</div>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:10px;">
      ${rows}
    </table>
  `;
}

function miniKpisHtml(kpis: { label: string; value: string }[]) {
  const cols = kpis
    .map(
      (k) => `
      <td style="padding: 12px; border:1px solid #e5e7eb; border-radius:14px; background:#ffffff;">
        <div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; font-weight:700;">${safeText(
          k.label
        )}</div>
        <div style="font-family: Arial, sans-serif; font-size:18px; color:#091a33; font-weight:900; margin-top:4px;">${safeText(
          k.value
        )}</div>
      </td>
    `
    )
    .join(`<td width="10"></td>`);

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 10px;">
      <tr>
        ${cols}
      </tr>
    </table>
  `;
}

function simpleCardHtml({ title, body }: { title: string; body: string }) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
      style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
      <tr>
        <td style="padding: 16px;">
          <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
            ${safeText(title)}
          </div>
          <div style="font-family: Arial, sans-serif; font-size:15px; color:#111827; margin-top:8px;">
            ${body}
          </div>
        </td>
      </tr>
    </table>
  `;
}

function metricCardHtml({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: { label: string; value: string }[];
}) {
  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 0; border-top:1px solid #e5e7eb;">
          <div style="display:flex; justify-content:space-between; gap:12px;">
            <div style="font-family: Arial, sans-serif; font-size:14px; color:#111827;">${safeText(r.label)}</div>
            <div style="font-family: Arial, sans-serif; font-size:14px; color:#091a33; font-weight:900;">${safeText(r.value)}</div>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
      style="margin-top: 14px; background:#ffffff; border:1px solid #e5e7eb; border-radius:18px;">
      <tr>
        <td style="padding: 16px;">
          <div style="font-family: Arial, sans-serif; font-size:14px; font-weight:800; color:#091a33;">
            ${safeText(title)}
          </div>
          ${
            subtitle
              ? `<div style="font-family: Arial, sans-serif; font-size:12px; color:#6b7280; margin-top:4px;">${safeText(
                  subtitle
                )}</div>`
              : ""
          }
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:10px;">
            ${rowsHtml}
          </table>
        </td>
      </tr>
    </table>
  `;
}