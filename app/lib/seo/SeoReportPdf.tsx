import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";
// Inline SVG arrow for PDF-safe rendering
function ArrowSvg({ style }: { style?: any }) {
  return (
    <Svg
      width={12}
      height={8}
      viewBox="0 0 12 8"
      style={{ verticalAlign: "middle", ...style }}
    >
      <Path d="M2 5h7M7 2l3 3-3 3" stroke="#0c2244" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const BRAND = {
  navy: "#0c2244",
  green: "#bfee3c",
  text: "#333333",
  muted: "#6b7280",
  line: "#e5e7eb",
};

type SeoScores = {
  seo?: number | string;
  performance?: number | string;
  bestPractices?: number | string;
  accessibility?: number | string;
};

type PdfIssue = {
  key?: string;
  title: string;
  why?: string;
  fix?: string[];
  verify?: string[];
  // optionally present:
  platformHints?: Record<string, string[]>;
};

type Scan = {
  url: string;
  grade: string;
  scores?: SeoScores;
  issues?: PdfIssue[];
};

type SeoReportPdfProps = {
  scan: Scan;

  /**
   * IMPORTANT for react-pdf: use absolute URLs for images.
   * Example: https://rivercitycreatives.com
   */
  siteUrl?: string;

  /**
   * Optional overrides. If omitted, we build from siteUrl + /filename
   */
  logoSrc?: string;
  portraitSrc?: string;

  /**
   * We'll set this later; placeholder supported.
   */
  callUrl?: string;

  /**
   * Optional: show only top N issues
   */
  maxIssues?: number;
};

function normalizeSiteUrl(siteUrl?: string) {
  if (!siteUrl) return "";
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function toPublicAssetUrl(siteUrl: string, filename: string) {
  if (!siteUrl) return `/${filename}`; // fallback; may not work for server-side PDF render
  return `${siteUrl}/${filename}`;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 54,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    color: BRAND.text,
    lineHeight: 1.35,
  },

  // Footer
  footer: {
    position: "absolute",
    left: 44,
    right: 44,
    bottom: 18,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BRAND.line,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    fontSize: 9,
    color: BRAND.muted,
  },
  footerRight: {
    fontSize: 9,
    color: BRAND.muted,
  },

  // Cover
  coverWrap: {
    flex: 1,
    justifyContent: "space-between",
  },
  coverTop: {
    marginTop: 10,
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 50,
    objectFit: "contain",
    marginBottom: 28,
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: BRAND.navy,
    textAlign: "center",
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 13,
    color: BRAND.muted,
    textAlign: "center",
    marginBottom: 18,
  },
  coverDivider: {
    width: "100%",
    height: 3,
    backgroundColor: BRAND.green,
    marginVertical: 18,
  },
  coverMetaLabel: {
    fontSize: 10,
    color: BRAND.muted,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  coverMetaValue: {
    fontSize: 12,
    color: BRAND.text,
    marginBottom: 12,
  },
  coverBottom: {
    marginBottom: 10,
  },
  preparedBy: {
    fontSize: 10,
    color: BRAND.muted,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  preparedName: {
    fontSize: 12,
    fontWeight: "bold",
    color: BRAND.navy,
    marginBottom: 2,
  },
  preparedTitle: {
    fontSize: 10,
    color: BRAND.muted,
  },

  // Sections
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionKicker: {
    fontSize: 10,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: BRAND.navy,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: BRAND.green,
    marginTop: 6,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 11,
    color: BRAND.navy,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 1.2
  },
  callout: {
    borderLeftWidth: 4,
    borderLeftColor: BRAND.green,
    paddingLeft: 12,
    marginTop: 6,
    marginBottom: 6,
  },
  calloutText: {
    fontSize: 12,
    color: BRAND.text,
  },

  // Snapshot
  snapshotGrid: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 10,
    padding: 14,
  },
  snapshotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  snapshotLabel: {
    fontSize: 11,
    color: BRAND.muted,
  },
  snapshotValue: {
    fontSize: 11,
    color: BRAND.text,
    fontWeight: "bold",
  },
  grade: {
    fontSize: 14,
    color: BRAND.navy,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 2,
  },

  // Issues
  issueBlock: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BRAND.line,
  },
  issueTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: BRAND.navy,
    marginBottom: 6,
  },
  issueLabel: {
    fontSize: 12,
    color: BRAND.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginTop: 6,
    marginBottom: 6,
  },
  issueWhy: {
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 1.2,
  },
  numberedRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  number: {
    width: 16,
    fontSize: 12,
    color: BRAND.navy,
    fontWeight: "bold",
  },
  numberText: {
    flex: 1,
    fontSize: 12,
  },

  // Final page
  finalCard: {
    borderWidth: 1,
    borderColor: BRAND.line,
    borderRadius: 14,
    padding: 18,
    marginTop: 16,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
    color: BRAND.navy,
    marginTop: 14,
  },
  signatureTitle: {
    fontSize: 10,
    color: BRAND.muted,
    marginTop: 2,
  },
  portraitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    justifyContent: "space-between",
  },
  portrait: {
    width: 66,
    height: 66,
    borderRadius: 999,
    objectFit: "cover",
    borderWidth: 2,
    borderColor: BRAND.green,
  },
  ctaButton: {
    marginTop: 12,
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: BRAND.navy,
    alignSelf: "flex-start",
  },
  ctaButtonText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
  },
  ctaHint: {
    fontSize: 9,
    color: BRAND.muted,
    marginTop: 4,
  },
});

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerLeft}>RiverCity Creatives | SEO Growth Report</Text>
      <Text
        style={styles.footerRight}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}

function SectionHeader({ n, title }: { n: string; title: string }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionKicker}>{n}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionDivider} />
    </View>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function Numbered({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <View style={styles.numberedRow}>
      <Text style={styles.number}>{n}.</Text>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export function SeoReportPdf({
  scan,
  siteUrl,
  logoSrc,
  portraitSrc,
  callUrl,
  maxIssues = 8,
}: SeoReportPdfProps) {
  const site = normalizeSiteUrl(siteUrl || process.env.NEXT_PUBLIC_SITE_URL);

  // Your files in /public:
  // public/logo-rivercity-creatives-horizontal-green-blue.png
  // public/isaac-headshot-avatar.webp
  const resolvedLogo =
    logoSrc || toPublicAssetUrl(site, "logo-rivercity-creatives-horizontal-green-blue.png");
  const resolvedPortrait =
    portraitSrc || toPublicAssetUrl(site, "isaac-headshot-avatar.png");

  const CALL_URL = callUrl || "https://YOUR-CALL-LINK-HERE";

  const issues = Array.isArray(scan.issues) ? scan.issues.slice(0, maxIssues) : [];

  return (
    <Document>
      {/* PAGE 1: COVER */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.coverWrap}>
          <View style={styles.coverTop}>
            {/* Logo */}
            <Image style={styles.logo} src={resolvedLogo} />

            <Text style={styles.coverTitle}>SEO Performance &amp; Growth Report</Text>
            <Text style={styles.coverSubtitle}>Technical Evaluation &amp; Organic Growth Opportunities</Text>

            <View style={styles.coverDivider} />

            <Text style={styles.coverMetaLabel}>Website analyzed</Text>
            <Text style={styles.coverMetaValue}>{scan.url}</Text>
          </View>

          <View style={styles.coverBottom}>
            <Text style={styles.preparedBy}>Prepared by</Text>
            <Text style={styles.preparedName}>Isaac Longoria</Text>
            <Text style={styles.preparedTitle}>Founder, RiverCity Creatives</Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* PAGE 2: SECTION 1 */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="01" title="Why SEO Is One of the Highest-Leverage Growth Channels" />

        <Text style={styles.paragraph}>
          Every day, potential customers are searching online for services like yours.
        </Text>

        <View style={styles.callout}>
          <Text style={[styles.calloutText, { marginBottom: 4 }]}>“Best gym near me.”</Text>
          <Text style={[styles.calloutText, { marginBottom: 4 }]}>“Personal trainer in [city].”</Text>
          <Text style={styles.calloutText}>“Roof repair [city].”</Text>
        </View>

        <Text style={styles.paragraph}>These searches represent real buying intent.</Text>

        <Text style={styles.paragraph}>
          When your business appears at the top of search results, you don’t just get traffic — you get
          qualified prospects who are actively looking to hire.
        </Text>

        <Text style={styles.paragraph}>Organic search traffic has three major advantages:</Text>
        <Bullet>It attracts high-intent customers</Bullet>
        <Bullet>It compounds over time</Bullet>
        <Bullet>It reduces dependence on paid ads</Bullet>

        <Text style={styles.paragraph}>
          Unlike paid advertising, SEO doesn’t shut off when your budget pauses. Once your site earns
          visibility, it continues working for you 24/7.
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Text style={[styles.paragraph, { marginTop: 10 }]}>More visibility </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2, marginTop: 0 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>More qualified visitors </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2, marginTop: 0 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>More leads </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2, marginTop: 0 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>More revenue.</Text>
        </View>

        <Text style={styles.paragraph}>
          If your website is not ranking, that demand still exists — it’s just being captured by your
          competitors.
        </Text>

        <Text style={styles.paragraph}>
          SEO is not about vanity metrics. It’s about positioning your business where buying decisions
          begin.
        </Text>

        <Footer />
      </Page>

      {/* PAGE 3: SECTION 2 */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="02" title="How Search Engines Decide Who Gets the Traffic" />

        <Text style={styles.paragraph}>
          Search engines do not randomly choose which businesses appear at the top. They evaluate websites
          based on a combination of trust, relevance, and technical quality.
        </Text>

        <Text style={styles.paragraph}>For local service businesses, four core factors matter most:</Text>

        <Text style={[styles.paragraph, { marginBottom: 6 }]}>
          <Text style={{ fontWeight: "bold", color: BRAND.navy, marginBottom: 2 }}>1) Relevance{"\n"}</Text>
          Does your website clearly explain what you do and who you serve? Search engines analyze your
          content to determine whether it directly answers what users are searching for.
        </Text>

        <Text style={[styles.paragraph, { marginBottom: 6 }]}>
          <Text style={{ fontWeight: "bold", color: BRAND.navy, marginBottom: 2 }}>2) Authority{"\n"}</Text>
          Do other reputable websites link to you? Have you built credibility within your local market or
          industry?
        </Text>

        <Text style={[styles.paragraph, { marginBottom: 6 }]}>
          <Text style={{ fontWeight: "bold", color: BRAND.navy, marginBottom: 2 }}>3) Technical Health{"\n"}</Text>
          Is your website fast, secure, and easy to crawl? If search engines struggle to load or interpret
          your site, rankings suffer.
        </Text>

        <Text style={[styles.paragraph, { marginBottom: 10 }]}>
          <Text style={{ fontWeight: "bold", color: BRAND.navy, marginBottom: 2 }}>4) User Experience{"\n"}</Text>
          Do visitors stay on your website? Do they engage, navigate, and take action — or leave quickly?
        </Text>

        <Text style={[styles.paragraph, { fontWeight: "bold", color: BRAND.navy, marginBottom: 6 }]}>
          AI Search Is Changing the Landscape
        </Text>

        <Text style={styles.paragraph}>
          Search visibility is no longer limited to traditional results. AI-powered platforms increasingly
          generate summaries and recommendations based on trusted, well-structured sources.
        </Text>

        <Text style={styles.paragraph}>These systems prioritize:</Text>
        <Bullet>Clear structure</Bullet>
        <Bullet>Fast-loading pages</Bullet>
        <Bullet>Technically sound websites</Bullet>
        <Bullet>Demonstrated expertise</Bullet>

        <Text style={styles.paragraph}>
          If your website lacks these signals, it becomes less likely to be referenced — even if your
          service is excellent.
        </Text>

        <Text style={styles.paragraph}>The good news: these are measurable and fixable signals.</Text>

        <Footer />
      </Page>

      {/* PAGE 4: SECTION 3 */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="03" title="Technical Performance Is the Infrastructure of SEO" />

        <Text style={styles.paragraph}>Search visibility starts with infrastructure.</Text>

        <Text style={styles.paragraph}>
          Think of your website like a physical building. Before customers walk through the door, the
          foundation must be stable. The structure must be solid. The wiring must work.
        </Text>

        <Text style={styles.paragraph}>
          If the building has structural problems, everything built on top of it becomes unstable. Your
          website works the same way.
        </Text>

        <Text style={styles.paragraph}>
          Even the best content strategy cannot perform if search engines struggle to load, crawl, or
          interpret your site.
        </Text>

        <Text style={styles.paragraph}>Search engines evaluate:</Text>
        <Bullet>How quickly your primary content loads</Bullet>
        <Bullet>Whether the page layout shifts during load</Bullet>
        <Bullet>Whether scripts block rendering</Bullet>
        <Bullet>Whether the site is easy to crawl and understand</Bullet>

        <Text style={styles.paragraph}>
          When technical performance is weak, visitors leave sooner, engagement drops, rankings weaken,
          and conversions decline.
        </Text>

        <Text style={styles.paragraph}>
          Technical optimization alone does not create traffic. But without strong infrastructure, scaling
          organic growth becomes significantly harder.
        </Text>

        <Text style={styles.paragraph}>
          This report evaluates your website’s technical foundation — identifying areas that may be limiting
          your visibility and conversion potential.
        </Text>

        <Footer />
      </Page>

      {/* PAGE 5: SECTION 4 */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="04" title="Your Website’s Current Technical Snapshot" />

        <Text style={styles.paragraph}>
          The following scores reflect how search engines and users currently experience your website. These
          metrics evaluate performance, structure, accessibility, and best-practice implementation.
        </Text>

        <Text style={styles.paragraph}>
          They do not define the quality of your business — they highlight technical opportunities that may
          be limiting your visibility and growth.
        </Text>

        <Text style={styles.grade}>Overall Technical Grade: {scan.grade}</Text>

        <View style={styles.snapshotGrid}>
          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>SEO Score</Text>
            <Text style={styles.snapshotValue}>{scan.scores?.seo ?? "N/A"}</Text>
          </View>
          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>Performance Score</Text>
            <Text style={styles.snapshotValue}>{scan.scores?.performance ?? "N/A"}</Text>
          </View>
          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>Best Practices</Text>
            <Text style={styles.snapshotValue}>{scan.scores?.bestPractices ?? "N/A"}</Text>
          </View>
          <View style={{ ...styles.snapshotRow, marginBottom: 0, paddingBottom: 0 }}>
            <Text style={styles.snapshotLabel}>Accessibility</Text>
            <Text style={styles.snapshotValue}>{scan.scores?.accessibility ?? "N/A"}</Text>
          </View>
        </View>

        <Text style={[styles.paragraph, { marginTop: 12 }]}>
          Lower scores indicate areas where search engines and users may encounter friction.
        </Text>

        <Text style={styles.paragraph}>
          In many cases, improving even a handful of technical issues can create measurable improvements in
          speed, crawlability, and user experience.
        </Text>

        <Text style={styles.paragraph}>
          The next section outlines the highest-impact opportunities identified in your scan.
        </Text>

        <Footer />
      </Page>

      {/* PAGE 6+: SECTION 5 + ISSUES */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="05" title="High-Impact Technical Opportunities Identified" />

        <Text style={styles.paragraph}>
          The following items represent the most impactful technical opportunities identified during your scan.
        </Text>

        <Text style={styles.paragraph}>
          These issues represent areas where your website’s infrastructure may be limiting its full growth potential.
          While some improvements are technical in nature, many are straightforward to address with proper implementation.
        </Text>

        <Text style={styles.paragraph}>
          Resolving these items strengthens the foundation of your website — making it easier for search engines to
          evaluate, rank, and recommend your business.
        </Text>

        <Text style={styles.paragraph}>
          Many established businesses experience similar technical gaps. The opportunity lies in identifying and correcting
          them before competitors do.
        </Text>

        <Text style={styles.paragraph}>For each item below, we’ve outlined:</Text>
        <Bullet>Why it impacts visibility and performance</Bullet>
        <Bullet>What needs to be improved</Bullet>
        <Bullet>How to verify the fix</Bullet>

        {issues.map((issue, idx) => (
          <View key={`${issue.key ?? issue.title}-${idx}`} style={styles.issueBlock} wrap={false}>
            <Text style={styles.issueTitle}>
              {idx + 1}. {issue.title}
            </Text>

            <Text style={styles.issueLabel}>Why this impacts visibility &amp; revenue</Text>
            <Text style={styles.issueWhy}>
              {issue.why || "This issue may be limiting your website’s visibility, engagement, or conversion potential."}
            </Text>

            <Text style={styles.issueLabel}>Recommended fix</Text>
            {(issue.fix || []).slice(0, 8).map((s, i) => (
              <Numbered key={i} n={i + 1}>
                {s}
              </Numbered>
            ))}

            {!!(issue.verify && issue.verify.length) && (
              <>
                <Text style={styles.issueLabel}>How to verify improvement</Text>
                {(issue.verify || []).slice(0, 6).map((v, i) => (
                  <Bullet key={i}>{v}</Bullet>
                ))}
              </>
            )}
          </View>
        ))}

        <Footer />
      </Page>

      {/* PAGE 7 (optional continuation): if you want guaranteed split, we can add logic later */}

      {/* PAGE 8: SECTION 6 */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="06" title={"Technical Optimization Is the Foundation —\nNot the Full Strategy"} />

        <Text style={styles.paragraph}>
          Improving technical performance strengthens your website’s infrastructure. However, performance alone does not
          guarantee higher rankings or increased traffic.
        </Text>

        <Text style={styles.paragraph}>Organic growth also depends on:</Text>
        <Bullet>Strategic keyword targeting</Bullet>
        <Bullet>Content depth and relevance</Bullet>
        <Bullet>Internal linking structure</Bullet>
        <Bullet>Authority signals from other websites</Bullet>
        <Bullet>Local optimization signals</Bullet>
        <Bullet>Consistent content updates</Bullet>

        <Text style={styles.paragraph}>
          Technical optimization increases your website’s ranking potential. Strategic SEO unlocks that potential.
        </Text>

        <Text style={styles.paragraph}>
          When both are aligned, businesses often experience measurable growth in qualified traffic and inbound leads.
        </Text>

        <Text style={styles.paragraph}>
          SEO is not a one-time fix — it is a structured system built over time. The good news: once the foundation is
          strong, strategic growth becomes far more predictable.
        </Text>

        <Footer />
      </Page>

      {/* PAGE 9: SECTION 7 + CTA + SIGNATURE + PORTRAIT */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="07" title="The Growth Opportunity Ahead" />

        <Text style={styles.paragraph}>
          The technical improvements identified in this report represent foundational growth opportunities. When paired
          with a structured SEO strategy, they can strengthen visibility, improve user experience, and increase inbound
          lead potential.
        </Text>

        <Text style={styles.paragraph}>
          Search visibility compounds over time. Businesses that invest in SEO early often experience momentum that becomes
          increasingly difficult for competitors to catch.
        </Text>

        <Text style={styles.paragraph}>
          As authority builds, content expands, and technical performance improves, organic traffic becomes more predictable
          and scalable. The earlier a business strengthens its digital infrastructure, the more long-term leverage it creates.
        </Text>

        <Text style={styles.paragraph}>
          SEO is not a short-term tactic. It is a long-term asset.
        </Text>

        <View style={styles.finalCard}>
          <Text style={[styles.paragraph, { marginBottom: 8, fontWeight: "bold", color: BRAND.navy }]}>
            Next Steps
          </Text>

          <Text style={styles.paragraph}>You can use this report in one of two ways:</Text>
          <Numbered n={1}>Implement the improvements internally using the guidance provided.</Numbered>
          <Numbered n={2}>
            Schedule a <Text style={{ fontWeight: "bold" }}>free strategy call</Text> to review your current position and
            explore whether further optimization would meaningfully benefit your business.
          </Numbered>

          <Text style={[styles.paragraph, { marginTop: 10 }]}>
            If we determine there’s real opportunity to improve rankings and lead flow, we can outline a structured growth
            plan tailored to your goals.
          </Text>

          <Text style={styles.paragraph}>
            If not, you’ll leave the call with clarity on where you stand. Either way, you gain insight.
          </Text>

          {/* CTA button + link */}
          <Link src={CALL_URL} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book a Free Strategy Call</Text>
          </Link>
          <Text style={styles.ctaHint}>Link placeholder: replace with your scheduling URL when ready.</Text>

          <View style={styles.portraitRow}>
            <View>
              <Text style={styles.signatureName}>— Isaac Longoria</Text>
              <Text style={styles.signatureTitle}>Founder, RiverCity Creatives</Text>
            </View>
            <Image style={styles.portrait} src={resolvedPortrait} />
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}
