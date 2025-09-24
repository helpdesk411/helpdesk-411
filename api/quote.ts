// /api/quote.ts — Vercel Serverless Function for Vite projects
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "crypto";

const RESEND_KEY = process.env.RESEND_API_KEY!;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET!;
const FROM_EMAIL = process.env.FROM_EMAIL!; // e.g. "Quotes <quotes@helpdesk.africanswhodesign.io>"
const SALES_TO = process.env.SALES_TO!; // e.g. "hi@wcd.school"

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
function splitName(full: string) {
  const parts = String(full || "")
    .trim()
    .split(/\s+/);
  return { first: parts[0] || "", last: parts.slice(1).join(" ") };
}

// Enhanced error messages
const ERROR_MESSAGES = {
  MISSING_FIELDS: "Please fill in all required fields (name, email, and address).",
  INVALID_EMAIL: "Please enter a valid email address.",
  HONEYPOT_TRIGGERED: "Invalid request detected. Please try again.",
  TOO_FAST: "Please take a moment to fill out the form properly.",
  CAPTCHA_FAILED: "Security verification failed. Please complete the captcha and try again.",
  CAPTCHA_VERIFICATION_ERROR: "Unable to verify security check. Please try again.",
  EMAIL_SEND_FAILED: "Unable to send confirmation email. Please try again or contact support.",
  INVALID_DATA: "Invalid form data. Please check your information and try again.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again in a few moments.",
  RATE_LIMITED: "Too many requests. Please wait a moment before trying again.",
} as const;

async function sendEmail(payload: Record<string, unknown>) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const errorText = await r.text();
    console.error("Resend API error:", r.status, errorText);
    throw new Error(ERROR_MESSAGES.EMAIL_SEND_FAILED);
  }
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check GeoIP (US-only)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const geoResp = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResp.json();

    if (geoData.country !== "US") {
      return res
        .status(403)
        .json({ error: "Sorry, quote requests are allowed only from the US." });
    }

    const {
      planName, // string
      planPrice, // number (per device)
      quantity, // number
      totalPrice, // number (planPrice * quantity)
      formData, // { name, email, address }
      turnstileToken, // string
      honeypot, // string (should be empty)
      ttf, // number (ms to fill)
    } = (req.body || {}) as any;

    const { name, email, address } = formData || {};

    // Enhanced validation with specific error messages
    if (honeypot) {
      return res.status(400).json({ error: ERROR_MESSAGES.HONEYPOT_TRIGGERED });
    }

    // Check for missing required fields
    if (!name?.trim()) {
      return res.status(400).json({ error: "Please enter your name." });
    }
    if (!email?.trim()) {
      return res.status(400).json({ error: "Please enter your email address." });
    }
    if (!address?.trim()) {
      return res.status(400).json({ error: "Please enter your address." });
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_EMAIL });
    }

    // Check for missing plan data
    if (!planName || !planPrice || !quantity || !totalPrice) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATA });
    }

    // Validate numeric fields
    if (typeof planPrice !== 'number' || planPrice <= 0) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATA });
    }
    if (typeof quantity !== 'number' || quantity <= 0 || quantity > 1000) {
      return res.status(400).json({ error: "Please enter a valid quantity (1-1000)." });
    }
    if (typeof totalPrice !== 'number' || totalPrice !== planPrice * quantity) {
      return res.status(400).json({ error: ERROR_MESSAGES.INVALID_DATA });
    }

    // Check for missing captcha token
    if (!turnstileToken) {
      return res.status(400).json({ error: "Please complete the security verification." });
    }

    // Rate limiting check
    if (typeof ttf === "number" && ttf < 1500) {
      return res.status(429).json({ error: ERROR_MESSAGES.TOO_FAST });
    }

    // Verify Turnstile on server
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ?? "";
    const verifyBody = new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: turnstileToken,
    });
    if (ip) verifyBody.set("remoteip", ip);

    let vres;
    try {
      vres = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: verifyBody,
        }
      );
    } catch (error) {
      console.error("Turnstile network error:", error);
      return res.status(502).json({ error: ERROR_MESSAGES.NETWORK_ERROR });
    }

    // Defensive parse (avoid JSON.parse HTML error)
    const vtext = await vres.text();
    let vjson: any = null;
    try {
      vjson = JSON.parse(vtext);
    } catch {
      console.error("Turnstile non-JSON:", vtext);
      return res.status(502).json({ error: ERROR_MESSAGES.CAPTCHA_VERIFICATION_ERROR });
    }

    if (!vjson.success) {
      console.error("Turnstile verification failed:", vjson);
      return res.status(400).json({ error: ERROR_MESSAGES.CAPTCHA_FAILED });
    }

    const { first: firstName, last: lastName } = splitName(name);

    // 1) Email to Admin / Sales Team (YOUR TEMPLATE)
    await sendEmail({
      from: FROM_EMAIL,
      to: [SALES_TO, "kazr@corporatetech.com"],
      reply_to: email, // reply goes to requester
      subject: "New Helpdesk Plan Quote Request",
      text: `Hi Team,
A new quote request has been submitted via the Helpdesk landing page.

Details:
Name: ${firstName}${lastName ? " " + lastName : ""}

Email: ${email}

Address: ${address}

Quantity: ${quantity}

Price per Device: $${planPrice}

Total Price: $${totalPrice}

Please follow up with the user promptly.
Thanks,
 Automated HelpDesk 411 System`,
      html: `
<p>Hi Team,</p>
<p>A new quote request has been submitted via the Helpdesk landing page.</p>
<p><b>Details:</b><br/>
Name: ${esc(firstName)}${lastName ? " " + esc(lastName) : ""}</p>
<p>Email: ${esc(email)}</p>
<p>Address: ${esc(address)}</p>
<p>Quantity: ${esc(String(quantity))}</p>
<p>Price per Device: $${esc(String(planPrice))}</p>
<p>Total Price: $${esc(String(totalPrice))}</p>
<p>Please follow up with the user promptly.</p>
<p>Thanks,<br/>
 Automated HelpDesk 411 System</p>`,
      headers: { "X-Entity-Ref-ID": randomUUID().replace(/-/g, "") },
    });

    // 2) Email to User (Confirmation) (YOUR TEMPLATE)
    await sendEmail({
      from: FROM_EMAIL,
      to: [email],
      reply_to: "hi@wcd.school", // optional: make replies go to your help desk
      subject: "Your Helpdesk Plan Quote Request",
      text: `Hi ${firstName},
Thank you for requesting a quote for our Helpdesk Plan: ${planName}.
Here's a summary of your request:
Quantity: ${quantity}

Price per Device: $${planPrice}

Total Price: $${totalPrice}

Address: ${address}

Our team will review your request and get back to you shortly.
If you have any questions in the meantime, feel free to reply to this email.
Best regards,
 HelpDesk 411 Team`,
      html: `
<p>Hi ${esc(firstName)},</p>
<p>Thank you for requesting a quote for our Helpdesk Plan: <b>${esc(
        planName
      )}</b>.</p>
<p><b>Here's a summary of your request:</b><br/>
Quantity: ${esc(String(quantity))}</p>
<p>Price per Device: $${esc(String(planPrice))}</p>
<p>Total Price: $${esc(String(totalPrice))}</p>
<p>Address: ${esc(address)}</p>
<p>Our team will review your request and get back to you shortly.<br/>
If you have any questions in the meantime, feel free to reply to this email.</p>
<p>Best regards,<br/>
 HelpDesk 411 Team</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    console.error("quote function error:", e?.message || e);
    
    // Handle specific error types
    if (e?.message?.includes('Resend')) {
      return res.status(500).json({ error: ERROR_MESSAGES.EMAIL_SEND_FAILED });
    }
    
    if (e?.message?.includes('fetch') || e?.message?.includes('network')) {
      return res.status(503).json({ error: ERROR_MESSAGES.NETWORK_ERROR });
    }
    
    return res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR });
  }
};
