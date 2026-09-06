require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Config ----------
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
// e.g. "https://yourname.github.io" once the portfolio is live.
// Keep "*" while testing locally, then lock it down.

app.use(express.json({ limit: "20kb" }));
app.use(
  cors({
    origin: ALLOWED_ORIGIN === "*" ? true : ALLOWED_ORIGIN.split(",").map((s) => s.trim()),
  })
);

// ---------- Rate limiting ----------
// Max 5 contact-form submissions per IP every 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many messages sent. Please try again later." },
});

// ---------- Mail transport ----------
// Works with Gmail (App Password) out of the box, or any SMTP provider
// (Resend, Brevo, SendGrid SMTP, etc.) by changing the env vars.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------- Helpers ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------- Routes ----------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-backend", time: new Date().toISOString() });
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, message, company } = req.body || {};

    // Honeypot: real users never fill this hidden field. Bots often do.
    if (company) {
      return res.json({ ok: true }); // pretend success, drop silently
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Name, email and message are all required." });
    }
    if (typeof message !== "string" || message.trim().length < 10) {
      return res.status(400).json({ ok: false, error: "Message is too short." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }
    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return res.status(400).json({ ok: false, error: "One of the fields is too long." });
    }

    const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    res.json({ ok: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ ok: false, error: "Something went wrong sending your message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
