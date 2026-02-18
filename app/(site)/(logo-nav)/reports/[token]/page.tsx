// app/reports/[token]/page.tsx
import { notFound } from "next/navigation";
import { ovhPool } from "@/app/lib/mysql";

import { SeoScoreCard } from "@/app/ui/components/cards/seo-score-card";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/app/ui/booking/booking-modal"), { ssr: true });

type Params = Promise<{ token: string }>;

function safeJson(v: any, fallback: any) {
  if (v == null) return fallback;
  if (typeof v === "object") return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export default async function ReportPage({ params }: { params: Params }) {
  const { token } = await params;

  const [rows] = await ovhPool.execute(
    `SELECT url, seo_score, perf_score, best_score, a11y_score, issues_json, report_expires_at
     FROM seo_leads
     WHERE report_token = ?
     LIMIT 1`,
    [token]
  );

  const lead = (rows as any[])[0];
  if (!lead) return notFound();

  if (lead.report_expires_at && new Date(lead.report_expires_at).getTime() < Date.now()) {
    return notFound();
  }

  const issues = safeJson(lead.issues_json, []);

  return (
    <main className="base bg-blue-100 min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            SEO Fix Report
          </h1>
          <p className="mt-3 text-sm md:text-base !text-gray-975 max-w-2xl mx-auto">
            Here are your core SEO scores found on the homepage for:
            <span className="block font-semibold text-navy-700 mt-1">{lead.url}</span>
          </p>
        </div>

        {/* Score cards */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SeoScoreCard label="SEO" value={lead.seo_score} />
          <SeoScoreCard label="Performance" value={lead.perf_score} />
          <SeoScoreCard label="Best Practices" value={lead.best_score} />
          <SeoScoreCard label="Accessibility" value={lead.a11y_score} />
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="rounded-2xl border px-5 py-3 font-semibold bg-white hover:bg-[#bfee3c] transition-colors"
            href={`/api/seo/report.pdf?token=${token}`}
          >
            Download My SEO Report PDF
          </a>
        </div>
      </section>

      {/* About RiverCity Creatives */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight !text-navy-500">
            Turn These SEO Insights <br />Into Revenue Growth
          </h2>

          <p className="mt-6 text-base md:text-lg !text-gray-950 leading-relaxed !text-left">
            At <span className="font-semibold text-navy-500">RiverCity Creatives</span>, 
            we don’t just run audits — we build high-performing websites designed to 
            increase visibility, generate qualified leads, and convert traffic into revenue.
          </p>

          <p className="mt-6 text-base md:text-lg !text-gray-950 leading-relaxed !text-left">
            Your report highlights the biggest technical wins available on your site. That foundation matters —
            it improves how search engines and users experience your pages. But rankings don’t come from speed alone.
            They come from combining strong technical SEO with research, strategy, and content built around what people are actually searching for.
          </p>

          <p className="mt-6 text-base md:text-lg !text-gray-950 leading-relaxed !text-left">
            We specialize in building websites that perform beyond design — 
            combining technical SEO, performance optimization, in-depth search research, 
            and strategic content development to create measurable, compounding growth over time.
          </p>


          <div className="mt-10">

            <BookingModal triggerText="Book My Free SEO Strategy Call" />

            <p className="mt-6 text-sm !text-gray-950 !text-left">
              We’ll review your results, explain what matters most, and outline a clear action plan for your business.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
