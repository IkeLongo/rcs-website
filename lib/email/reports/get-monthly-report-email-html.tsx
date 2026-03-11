import React from "react";
import { EmailFooter } from "@/lib/email/layout/footer";

type MonthlyReportData = {
  range: { startDate: string; endDate: string };
  traffic: { activeUsers: number; sessions: number; pageViews: number };
  topPages: { path: string; views: number }[];
  ctas: {
    total: number;
    notSet?: number;
    leaderboard: { key: string; count: number }[];
  };
  forms: {
    submitSuccessTotal: number;
    notSet?: number;
    byId?: { key: string; count: number }[];
  };
};

export function MonthlyReportEmail({
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

  const topPages = report.topPages?.map((p) => ({
    label: safeText(p.path),
    value: `${Number(p.views || 0).toLocaleString()} views`,
    href: websiteUrl ? joinUrl(websiteUrl, p.path) : undefined,
  })) ?? [];

  const ctaLeaderboard = (report.ctas?.leaderboard ?? []).slice(0, 5).map((x) => ({
    label: safeText(x.key),
    value: `${Number(x.count || 0).toLocaleString()}`,
  }));

  const formsById = report.forms?.byId ?? [];
  const ctaNotSet = Number(report.ctas?.notSet ?? 0);
  const formsNotSet = Number(report.forms?.notSet ?? 0);

  const diagnosticsNote =
    ctaNotSet > 0 || formsNotSet > 0 ? (
      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', marginTop: 10 }}>
        Note: Some events were grouped as <strong>(not set)</strong>. This can happen due to analytics processing timing,
        ad blockers, or events missing parameters.
      </div>
    ) : null;

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
                            Monthly Website Performance Report — {monthLabel}
                          </h2>
                          <p style={{ margin: '0 0 12px 0', fontSize: 15 }}>
                            Hi {name},
                          </p>
                          <p style={{ margin: '0 0 14px 0', fontSize: 15 }}>
                            Here’s a clear snapshot of <strong>{clientName}</strong> website performance for <strong>{monthLabel}</strong>.
                            {websiteUrl ? (
                              <span>
                                You can reference the site here:{' '}
                                <a href={websiteUrl} style={{ color: '#091a33', fontWeight: 700, textDecoration: 'none' }}>{websiteUrl}</a>.
                              </span>
                            ) : null}
                          </p>
                          {/* Traffic Snapshot */}
                          <MetricCard
                            title="Traffic snapshot"
                            rows={[{ label: 'Active users', value: n(report.traffic.activeUsers) }, { label: 'Sessions', value: n(report.traffic.sessions) }, { label: 'Page views', value: n(report.traffic.pageViews) }]}
                            subtitle={`Range: ${report.range.startDate} → ${report.range.endDate}`}
                          />
                          {/* Top pages */}
                          <SimpleCard
                            title="Top pages"
                            body={topPages.length ? <TopList items={topPages} /> : <EmptyState text="No page view data available for this date range." />} />
                          {/* CTA performance */}
                          <SimpleCard
                            title="CTA performance"
                            body={
                              <>
                                <MiniKpis kpis={[{ label: 'Total CTA clicks', value: n(report.ctas.total) }, { label: '(not set)', value: n(ctaNotSet) }]} />
                                <div style={{ marginTop: 10 }}>
                                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>Top CTAs</div>
                                  {ctaLeaderboard.length ? <TopList items={ctaLeaderboard} /> : <EmptyState text="No CTA breakdown available yet." />}
                                  {diagnosticsNote}
                                </div>
                              </>
                            }
                          />
                          {/* Form submissions */}
                          <SimpleCard
                            title="Leads and form submissions"
                            body={
                              <>
                                <MiniKpis kpis={[{ label: 'Successful submissions', value: n(report.forms.submitSuccessTotal) }, { label: '(not set)', value: n(formsNotSet) }]} />
                                <div style={{ marginTop: 10 }}>
                                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>Submissions by form</div>
                                  {formsById.length ? <TopList items={formsById.slice(0, 5).map((x) => ({ label: safeText(x.key), value: String(x.count) }))} /> : <EmptyState text="No form breakdown available yet (this typically appears after GA processes new custom dimensions)." />}
                                  {formsNotSet > 0 ? diagnosticsNote : null}
                                </div>
                              </>
                            }
                          />
                          {/* Next steps */}
                          <SimpleCard
                            title="Suggested next steps"
                            body={
                              <ul style={{ margin: '10px 0 0 18px', padding: 0, color: '#111827', fontFamily: 'Arial, sans-serif', fontSize: 15 }}>
                                <li style={{ marginBottom: 6 }}>Double down on your top-performing CTA placements.</li>
                                <li style={{ marginBottom: 6 }}>Improve clarity on your top pages to increase clicks and inquiries.</li>
                                <li style={{ marginBottom: 0 }}>We can review friction points and propose high-impact updates.</li>
                              </ul>
                            }
                          />
                          {/* CTA */}
                          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
                            <tr>
                              <td style={{ padding: 16 }}>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>
                                  Want a simple “fix this first” plan for next month?
                                </div>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827', marginTop: 8 }}>
                                  If you’d like, we can review this report together and prioritize the highest-impact improvements.
                                </div>
                                <table role="presentation" cellPadding={0} cellSpacing={0} border={0} style={{ margin: '14px 0 0 0' }}>
                                  <tr>
                                    <td style={{ background: '#d9e64e', borderRadius: 14 }}>
                                      <a href={bookingUrl} style={{ display: 'inline-block', padding: '12px 16px', fontFamily: 'Arial, sans-serif', fontWeight: 700, color: '#091a33', fontSize: 14, textDecoration: 'none' }}>
                                        Book a Review Call
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', marginTop: 10 }}>
                                  Tip: reply with <strong>REPORT</strong> and I’ll point out the single biggest opportunity I see.
                                </div>
                              </td>
                            </tr>
                          </table>
                          <EmailFooter />
                          <div style={{ marginTop: 22, fontFamily: 'Arial, sans-serif', fontSize: 11, color: '#6b7280' }}>
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
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#6b7280', marginTop: 8 }}>{safeText(text)}</div>
  );
}

function TopList({ items }: { items: { label: string; value: string; href?: string }[] }) {
  if (!items.length) return null;
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 10 }}>
      <tbody>
        {items.map((it, idx) => (
          <tr key={idx}>
            <td style={{ padding: '10px 0', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14 }}>
                  {it.href ? (
                    <a href={it.href} style={{ color: '#091a33', fontWeight: 700, textDecoration: 'none' }}>{safeText(it.label)}</a>
                  ) : (
                    <span style={{ color: '#091a33', fontWeight: 700 }}>{safeText(it.label)}</span>
                  )}
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#111827', fontWeight: 800, whiteSpace: 'nowrap' }}>{safeText(it.value)}</div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MiniKpis({ kpis }: { kpis: { label: string; value: string }[] }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 10 }}>
      <tr>
        {kpis.map((k, idx) => (
          <td key={idx} style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 14, background: '#fff' }}>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', fontWeight: 700 }}>{safeText(k.label)}</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 18, color: '#091a33', fontWeight: 900, marginTop: 4 }}>{safeText(k.value)}</div>
          </td>
        ))}
      </tr>
    </table>
  );
}

function SimpleCard({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
      <tr>
        <td style={{ padding: 16 }}>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>{safeText(title)}</div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, color: '#111827', marginTop: 8 }}>{body}</div>
        </td>
      </tr>
    </table>
  );
}

function MetricCard({ title, subtitle, rows }: { title: string; subtitle?: string; rows: { label: string; value: string }[] }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 14, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 18 }}>
      <tr>
        <td style={{ padding: 16 }}>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 800, color: '#091a33' }}>{safeText(title)}</div>
          {subtitle ? (
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#6b7280', marginTop: 4 }}>{safeText(subtitle)}</div>
          ) : null}
          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={{ marginTop: 10 }}>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '10px 0', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#111827' }}>{safeText(r.label)}</div>
                      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#091a33', fontWeight: 900 }}>{safeText(r.value)}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </table>
  );
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