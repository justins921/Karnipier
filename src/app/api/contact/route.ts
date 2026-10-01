import { NextResponse } from "next/server";

// Sends contact form submissions to Scott via Resend (https://resend.com).
// Env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (on a Resend-verified domain).

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // Vercel's request body limit is 4.5 MB
const MIN_FILL_MS = 3000;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });

  const field = (name: string, max = 500) => String(form.get(name) ?? "").trim().slice(0, max);

  // Spam checks: honeypot filled, or submitted faster than a human could type.
  // Pretend success so bots don't adapt.
  const startedAt = Number(form.get("startedAt"));
  if (field("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: field("name", 200),
    phone: field("phone", 50),
    email: field("email", 200),
    address: field("address", 300),
    message: field("message", 5000),
  };

  if (!data.name || !data.phone || !data.email || !data.address || !data.message) {
    return NextResponse.json({ error: "Please fill out all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if ((data.message.match(/https?:\/\//gi) ?? []).length > 2) {
    return NextResponse.json(
      { error: "Your message was flagged as spam. Please remove extra links and try again." },
      { status: 400 }
    );
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Please attach ${MAX_FILES} files or fewer.` }, { status: 400 });
  }
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: "Attachments are too large (4 MB total max)." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact form is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return NextResponse.json(
      { error: "Sorry, the form isn't working right now. Please call (920) 231-0841." },
      { status: 500 }
    );
  }

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Address", data.address],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
    .join("");

  const html = `
    <h2>New website inquiry</h2>
    <table>${rows}</table>
    <p><b>Message</b></p>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    ${files.length ? `<p>${files.length} attachment(s) included.</p>` : ""}
  `;
  const text = `New website inquiry

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Address: ${data.address}

${data.message}`;

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    }))
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Website inquiry from ${data.name}`,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json(
      { error: "Sorry, something went wrong sending your message. Please call (920) 231-0841." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
