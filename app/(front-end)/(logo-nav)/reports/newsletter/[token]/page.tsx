// app/(front-end)/(logo-nav)/reports/newsletter/[token]/page.tsx
import { notFound } from "next/navigation";
import { ovhPool } from "@/lib/db/mysql";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/app/components/booking/booking-modal"), { ssr: true });

// Helper to safely parse JSON
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

export default async function NewsletterReportPage({ params }: { params: { token: string } }) {
  const { token } = params;

  // Fetch the checklist lead info from DB (adjust table/fields as needed)
  const [rows] = await ovhPool.execute(
    `SELECT email, first_name, report_expires_at
     FROM newsletter_signups
     WHERE report_token = ?
     LIMIT 1`,
    [token]
  );

  const lead = (rows as any[])[0];
  if (!lead) return notFound();

  if (lead.report_expires_at && new Date(lead.report_expires_at).getTime() < Date.now()) {
    return notFound();
  }

  const checklist = safeJson(lead.checklist_json, []);

  return (
    <main className="base bg-blue-100 min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Website Revenue Checklist Report
          </h1>
          <p className="mt-3 text-sm md:text-base !text-gray-975 max-w-2xl mx-auto">
            Here is your personalized Website Revenue Checklist for:
            <span className="block font-semibold text-navy-700 mt-1">{lead.first_name}</span>
          </p>
        </div>

        {/* Checklist Items */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-navy-700">Your Checklist</h2>
          {Array.isArray(checklist) && checklist.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {checklist.map((item: any, idx: number) => (
                <li key={idx} className="text-base text-gray-900">
                  {typeof item === "string" ? item : item?.title || JSON.stringify(item)}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-600">No checklist items found.</div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            className="rounded-2xl border px-5 py-3 font-semibold bg-white hover:bg-[#bfee3c] transition-colors"
            href={`/api/newsletter/report.pdf?token=${token}`}
          >
            Download My Checklist PDF
          </a>
        </div>
      </section>

      {/* About RiverCity Creatives */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight !text-navy-500">
            Turn This Checklist <br />Into Real Revenue
          </h2>

          <p className="mt-6 text-base md:text-lg !text-gray-950 leading-relaxed !text-left">
            At <span className="font-semibold text-navy-500">RiverCity Creatives</span>,
            we help founders and business owners turn their websites into revenue engines.
            This checklist is your roadmap to a site that attracts, converts, and grows your business.
          </p>

          <p className="mt-6 text-base md:text-lg !text-gray-950 leading-relaxed !text-left">
            If you want expert help implementing these steps, or want a custom strategy for your business,
            book a free strategy call below. We’ll review your site, discuss your goals, and outline a clear action plan.
          </p>

          <div className="mt-10">
            <BookingModal triggerText="Book My Free Website Strategy Call" />
            <p className="mt-6 text-sm !text-gray-950 !text-left">
              We’ll review your checklist, explain what matters most, and show you how to turn these insights into results.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
