import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";

// Inline SVG arrow for PDF-safe rendering
function ArrowSvg({ style }: { style?: any }) {
  return (
    <Svg width={12} height={8} viewBox="0 0 12 8" style={{ verticalAlign: "middle", ...style }}>
      <Path
        d="M2 5h7M7 2l3 3-3 3"
        stroke="#0c2244"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

type WebsiteRevenueChecklistPdfProps = {
  websiteUrl: string;

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
   * CTA link (booking page)
   */
  callUrl?: string;

  /**
   * Optional: show a brand name on the cover (if you captured it)
   */
  businessName?: string;
};

function normalizeSiteUrl(siteUrl?: string) {
  if (!siteUrl) return "";
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

function toPublicAssetUrl(siteUrl: string, filename: string) {
  if (!siteUrl) return `/${filename}`;
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
    lineHeight: 1.2,
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

  // Cards / grids
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    backgroundColor: BRAND.navy,
    alignSelf: "flex-start",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 180,
  },
  ctaButtonText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    width: "100%",
    marginTop: 10,
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
      <Text style={styles.footerLeft}>RiverCity Creatives | Website Revenue Checklist</Text>
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
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
      <Text style={{ width: 16, fontSize: 12, color: BRAND.navy, fontWeight: "bold" }}>{n}.</Text>
      <Text style={{ flex: 1, fontSize: 12 }}>{children}</Text>
    </View>
  );
}

export function WebsiteRevenueChecklistPdf({
  websiteUrl,
  businessName,
  siteUrl,
  logoSrc,
  portraitSrc,
  callUrl,
}: WebsiteRevenueChecklistPdfProps) {
  const site = normalizeSiteUrl(siteUrl || process.env.NEXT_PUBLIC_SITE_URL);

  // public/logo-rivercity-creatives-horizontal-green-blue.png
  // public/isaac-headshot-avatar.png (or .webp if you want)
  const resolvedLogo =
    logoSrc || toPublicAssetUrl(site, "logo-rivercity-creatives-horizontal-green-blue.png");
  const resolvedPortrait =
    portraitSrc || toPublicAssetUrl(site, "isaac-headshot-avatar.png");

  const CALL_URL = callUrl || (site ? `${site}/booking` : "/booking");

  return (
    <Document>
      {/* PAGE 1: COVER */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.coverWrap}>
          <View style={styles.coverTop}>
            <Image style={styles.logo} src={resolvedLogo} />

            <Text style={styles.coverTitle}>Founder Website Revenue Checklist</Text>
            <Text style={styles.coverSubtitle}>
              A simple checklist to spot the most common website leaks that quietly reduce inquiries.
            </Text>

            <View style={styles.coverDivider} />

            <Text style={styles.coverMetaLabel}>Website</Text>
            <Text style={styles.coverMetaValue}>{websiteUrl}</Text>

            {!!businessName && (
              <>
                <Text style={styles.coverMetaLabel}>Business</Text>
                <Text style={styles.coverMetaValue}>{businessName}</Text>
              </>
            )}
          </View>

          <View style={styles.coverBottom}>
            <Text style={styles.preparedBy}>Prepared by</Text>
            <Text style={styles.preparedName}>Isaac Longoria</Text>
            <Text style={styles.preparedTitle}>Founder, RiverCity Creatives</Text>
          </View>
        </View>

        <Footer />
      </Page>

      {/* PAGE 2: INTRO + REVENUE FLOW */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="01" title="A Quick Note Before You Start" />

        <Text style={styles.paragraph}>
          I’ve reviewed dozens of small business websites. Most aren’t broken — they’re just missing a
          few small pieces that quietly reduce inquiries.
        </Text>

        <Text style={styles.paragraph}>
          This checklist helps you find those gaps fast, then gives you simple improvements you can make
          without getting overwhelmed.
        </Text>

        <View style={styles.callout}>
          <Text style={[styles.calloutText, { marginBottom: 4 }]}>
            A quick definition before we begin:
          </Text>
          <Text style={styles.calloutText}>
            A <Text style={{ fontWeight: "bold", color: BRAND.navy }}>call-to-action (CTA)</Text> is the
            main button or action you want visitors to take.
            {"\n"}Examples: “Book a Call”, “Request a Quote”, “Contact Us”.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          The simplest way to think about website revenue is this flow:
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Text style={[styles.paragraph, { marginTop: 10 }]}>Traffic </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>Website </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>Inquiry </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>Sales </Text>
          <ArrowSvg style={{ marginRight: 8, marginLeft: 2 }} />
          <Text style={[styles.paragraph, { marginTop: 10 }]}>Revenue</Text>
        </View>

        <Text style={styles.paragraph}>
          If one stage is unclear or hard to use, people drop off. The pages ahead help you strengthen
          each stage.
        </Text>

        <Footer />
      </Page>

      {/* PAGE 3: CLARITY */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="02" title="The 5-Second Clarity Test" />

        <Text style={styles.paragraph}>
          When someone lands on your homepage, they should instantly understand:
        </Text>

        <Bullet>Who you help</Bullet>
        <Bullet>What you help them achieve</Bullet>
        <Bullet>What to do next</Bullet>

        <Text style={styles.paragraph}>
          If that isn’t clear immediately, most people leave — even if your service is great.
        </Text>

        <Text style={[styles.paragraph, { fontWeight: "bold", color: BRAND.navy, marginBottom: 6 }]}>
          Checklist
        </Text>

        <Numbered n={1}>
          Is your headline specific? Avoid generic statements like “We help businesses grow.”
        </Numbered>
        <Numbered n={2}>
          Does your website clearly explain the problem you solve in plain language?
        </Numbered>
        <Numbered n={3}>
          Do you have one main CTA (one main button/action), rather than multiple competing actions?
        </Numbered>

        <View style={styles.callout}>
          <Text style={styles.calloutText}>
            Simple headline formula:
            {"\n"}
            <Text style={{ fontWeight: "bold", color: BRAND.navy }}>
              We help [who] achieve [result] without [frustration].
            </Text>
          </Text>
        </View>

        <Footer />
      </Page>

      {/* PAGE 4: FRICTION + TRUST */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="03" title="Where Inquiries Get Lost" />

        <Text style={styles.paragraph}>
          Most websites don’t fail because they look bad. They fail because it’s slightly harder than
          it should be to take the next step.
        </Text>

        <Text style={[styles.paragraph, { fontWeight: "bold", color: BRAND.navy, marginBottom: 6 }]}>
          Checklist (reduce friction)
        </Text>

        <Numbered n={4}>Is your main CTA easy to find without scrolling?</Numbered>
        <Numbered n={5}>Is your contact form short and simple (usually 3–5 fields)?</Numbered>
        <Numbered n={6}>Is your phone number clickable on mobile?</Numbered>
        <Numbered n={7}>Do you repeat your main CTA throughout key pages?</Numbered>

        <View style={{ marginTop: 10 }} />

        <Text style={[styles.paragraph, { fontWeight: "bold", color: BRAND.navy, marginBottom: 6 }]}>
          Checklist (build trust)
        </Text>

        <Numbered n={8}>Do you show testimonials clearly (not buried on a separate page)?</Numbered>
        <Numbered n={9}>
          Do you show examples of your work or real outcomes (even simple before/after helps)?
        </Numbered>
        <Numbered n={10}>
          Is the person behind the business visible? Founder-led brands convert better when the human
          behind the company is visible.
        </Numbered>
        <Numbered n={11}>
          Do you show outside validation (Google reviews, certifications, partnerships, press mentions)?
        </Numbered>

        <Footer />
      </Page>

      {/* PAGE 5: LEAD CAPTURE + QUICK WINS + SCORE */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="04" title="Capture Leads (Even If They’re Not Ready Yet)" />

        <Text style={styles.paragraph}>
          Not everyone is ready to buy today. Your job is to stay connected so you’re the obvious choice
          later.
        </Text>

        <Text style={[styles.paragraph, { fontWeight: "bold", color: BRAND.navy, marginBottom: 6 }]}>
          Checklist
        </Text>

        <Numbered n={12}>
          Do you offer something free in exchange for an email (a checklist, guide, quote, or quick review)?
        </Numbered>
        <Numbered n={13}>
          Do you actively collect emails in more than one spot (not only in the footer)?
        </Numbered>
        <Numbered n={14}>
          Do you have a follow-up system (even simple automation) so leads don’t slip through the cracks?
        </Numbered>
        <Numbered n={15}>
          Do you track where inquiries come from (so you know what’s working)?
        </Numbered>

        <View style={styles.snapshotGrid}>
          <Text style={[styles.paragraph, { marginBottom: 8, fontWeight: "bold", color: BRAND.navy }]}>
            Quick 30-Minute Improvements
          </Text>

          <Bullet>Rewrite your homepage headline using the formula on page 3.</Bullet>
          <Bullet>Make your main CTA visible immediately.</Bullet>
          <Bullet>Shorten your contact form.</Bullet>
          <Bullet>Add one strong testimonial near the top of your homepage.</Bullet>
          <Bullet>Make your phone number clickable.</Bullet>
        </View>

        <View style={styles.snapshotGrid}>
          <Text style={[styles.paragraph, { marginBottom: 8, fontWeight: "bold", color: BRAND.navy }]}>
            Score Your Website
          </Text>

          <View style={styles.snapshotRow}>
            <Text style={styles.snapshotLabel}>Give yourself 1 point for each item completed</Text>
            <Text style={styles.snapshotValue}>/ 15</Text>
          </View>

          <Bullet>0–5: Major leaks — you’re likely losing qualified inquiries.</Bullet>
          <Bullet>6–10: Strong foundation — improvements will help.</Bullet>
          <Bullet>11–15: Growth-ready — focus on consistent traffic + follow-up.</Bullet>
        </View>

        <Footer />
      </Page>

      {/* PAGE 6: FINAL CTA */}
      <Page size="LETTER" style={styles.page}>
        <SectionHeader n="05" title="If You Want a Personalized Breakdown" />

        <Text style={styles.paragraph}>
          If you want clarity on what to fix first (and what will actually move the needle), I can review
          your website and send back a prioritized action plan.
        </Text>

        <View style={styles.finalCard}>
          <Text style={[styles.paragraph, { marginBottom: 8, fontWeight: "bold", color: BRAND.navy }]}>
            Next Steps
          </Text>

          <Text style={styles.paragraph}>You can use this checklist in one of two ways:</Text>

          <Numbered n={1}>Implement a few quick wins yourself using pages 3–5.</Numbered>
          <Numbered n={2}>
            Book a <Text style={{ fontWeight: "bold" }}>free strategy call</Text> and we’ll walk through your
            top revenue leaks together.
          </Numbered>

          <Text style={[styles.paragraph, { marginTop: 10 }]}>
            If there’s real opportunity to increase inquiries, I’ll outline a clear plan. If not, you’ll
            still leave with direction. Either way, you get clarity.
          </Text>

          <Link src={CALL_URL} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book a Free Strategy Call</Text>
          </Link>

          <Text style={styles.ctaHint}>Takes 15 minutes. No pressure.</Text>

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