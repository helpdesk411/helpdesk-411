// /api/quote.ts (Vercel Serverless Function for Vite projects)
// Node runtime on Vercel; no Next.js required.
import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_KEY = process.env.RESEND_API_KEY!;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET!;
const FROM_EMAIL = process.env.FROM_EMAIL!; // e.g. "Quotes <quotes@helpdesk.africanswhodesign.io>"
const SALES_TO = process.env.SALES_TO!; // e.g. "sales@africanswhodesign.io"

function esc(s: string) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ((
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        } as any
      )[c])
  );
}

async function sendEmail(payload: Record<string, unknown>) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(await r.text());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const {
      planName,
      quantity,
      totalPrice,
      formData,
      turnstileToken,
      honeypot,
      ttf,
    } = req.body || {};
    const { name, email, address } = formData || {};

    // Basic validations
    if (honeypot) return res.status(400).json({ error: "Bad request" });
    if (
      !name ||
      !email ||
      !address ||
      !planName ||
      !quantity ||
      !totalPrice ||
      !turnstileToken
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }
    // Soft bot check: too-fast submissions (<1.5s)
    if (typeof ttf === "number" && ttf < 1500) {
      return res.status(400).json({ error: "Too fast" });
    }

    // Verify Turnstile (server-side)
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ?? "";
    const body = new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: turnstileToken,
    });
    if (ip) body.set("remoteip", ip);
    const vr = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const v = await vr.json();
    if (!v.success) return res.status(400).json({ error: "Captcha failed" });

    // 1) Internal notification to your team (reply_to = requester)
    await sendEmail({
      from: FROM_EMAIL,
      to: [SALES_TO],
      reply_to: email,
      subject: `New Quote Request — ${esc(name)} (${esc(planName)})`,
      html: `
        <h2>Quote Request</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Address:</b> ${esc(address)}</p>
        <p><b>Plan:</b> ${esc(planName)}</p>
        <p><b>Quantity:</b> ${esc(String(quantity))}</p>
        <p><b>Total Price:</b> $${esc(String(totalPrice))}</p>
        <hr/>
        <small>IP: ${esc(ip || "n/a")}</small>
      `,
      headers: { "X-Entity-Ref-ID": crypto.randomUUID().replaceAll("-", "") },
    });

    // 2) Receipt to requester (keep neutral; no sensitive data)
    await sendEmail({
      from: FROM_EMAIL,
      to: [email],
      subject: "We received your quote request",
      html: `
        <p>Hi ${esc(name)},</p>
        <p>Thanks — we’ve received your request for ${esc(planName)} (qty ${esc(
        String(quantity)
      )}). Our team will follow up soon.</p>
        <p>If this wasn’t you, you can ignore this email.</p>
        <p>— Africans Who Design</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Failed" });
  }
}
