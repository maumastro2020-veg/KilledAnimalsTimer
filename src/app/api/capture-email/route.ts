import { Resend } from "resend";
import { COMPARISON_EVENTS, computeComparisonMultiple } from "@/lib/comparisonEvents";
import { computeSpeciesBreakdown, computeTotalAnimalsKilled } from "@/lib/deathRates";
import { formatCount, formatElapsed, formatMultiple } from "@/lib/format";

const SITE_URL = "https://www.activevegan.org";
const FROM = "Active Vegan <hello@counter.activevegan.org>";
const BCC = "animal.mau.animal@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ELAPSED_MS = 24 * 60 * 60 * 1000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(elapsedMs: number): string {
  const breakdown = computeSpeciesBreakdown(elapsedMs);
  const total = computeTotalAnimalsKilled(elapsedMs);
  const timeLabel = formatElapsed(elapsedMs);

  const speciesRows = breakdown
    .map(
      ({ species, count }) => `
        <tr>
          <td style="padding:6px 0;color:#3f3f46;font-size:14px;border-bottom:1px solid #e4e4e7;">${escapeHtml(species.label)}</td>
          <td style="padding:6px 0;color:#09090b;font-size:14px;font-weight:600;text-align:right;border-bottom:1px solid #e4e4e7;">${formatCount(count)}</td>
        </tr>`,
    )
    .join("");

  const comparisonRows = COMPARISON_EVENTS.map(
    (event) => `
      <tr>
        <td style="padding:6px 0;color:#3f3f46;font-size:14px;border-bottom:1px solid #e4e4e7;">The death toll of ${escapeHtml(event.label)} (${escapeHtml(event.yearRange)})</td>
        <td style="padding:6px 0;color:#09090b;font-size:14px;font-weight:600;text-align:right;border-bottom:1px solid #e4e4e7;">${formatMultiple(computeComparisonMultiple(total, event))}×</td>
      </tr>`,
  ).join("");

  return `
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px 16px;color:#09090b;">
      <p style="font-size:15px;line-height:1.6;">Hi,</p>
      <p style="font-size:15px;line-height:1.6;">
        Thanks for taking the time to talk today. In the <strong>${timeLabel}</strong> we spoke,
        an estimated <strong>${formatCount(total)}</strong> animals were slaughtered worldwide —
        that's the same window of time, broken down below.
      </p>

      <h2 style="font-size:12px;letter-spacing:0.05em;text-transform:uppercase;border-bottom:1.5px solid #09090b;padding-bottom:8px;margin-top:32px;">Breakdown by species</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${speciesRows}</table>

      <h2 style="font-size:12px;letter-spacing:0.05em;text-transform:uppercase;border-bottom:1.5px solid #09090b;padding-bottom:8px;margin-top:32px;">For scale</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${comparisonRows}</table>

      <h2 style="font-size:12px;letter-spacing:0.05em;text-transform:uppercase;border-bottom:1.5px solid #09090b;padding-bottom:8px;margin-top:32px;">Go deeper</h2>
      <p style="font-size:14px;line-height:1.8;margin-top:8px;">
        <a href="${SITE_URL}/faq" style="color:#047857;">FAQ</a> — straight answers to the most common questions<br/>
        <a href="${SITE_URL}/fuq" style="color:#047857;">FUQ</a> — the uncommon and sometimes uncomfortable questions we should ask ourselves more often<br/>
        <a href="${SITE_URL}/resources" style="color:#047857;">Resources</a> — documentaries, books, and podcasts<br/>
        <a href="${SITE_URL}/timer" style="color:#047857;">Try the timer yourself</a>
      </p>

      <p style="font-size:13px;line-height:1.6;color:#71717a;margin-top:32px;">
        No pressure, no follow-up spam. Just a link back if you ever want it.
      </p>
      <p style="font-size:14px;margin-top:16px;">— Active Vegan</p>
    </div>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, elapsedMs } = (body ?? {}) as { email?: unknown; elapsedMs?: unknown };

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs) || elapsedMs < 0 || elapsedMs > MAX_ELAPSED_MS) {
    return Response.json({ error: "Invalid elapsed time" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "Email sending is not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    bcc: BCC,
    subject: "Thanks for talking with us",
    html: buildEmailHtml(elapsedMs),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json({ error: "Couldn't send the email" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
