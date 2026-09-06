# Portfolio Contact Backend

A tiny Express server with one job: receive your portfolio's contact form
submissions and email them to you. No database, no auth — just a POST
endpoint with validation, spam protection, and rate limiting.

## Endpoints

- `GET /api/health` — check the server is alive
- `POST /api/contact` — body: `{ "name": "...", "email": "...", "message": "..." }`

## 1. Set up environment variables

Copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

**Getting a Gmail App Password** (recommended, free):
1. Turn on 2-Step Verification on your Google account.
2. Go to https://myaccount.google.com/apppasswords
3. Generate a 16-character app password and use it as `SMTP_PASS`.
4. `SMTP_USER` is your full Gmail address.

Prefer not to use Gmail? Any SMTP provider works — Resend, Brevo, SendGrid,
Mailgun all give you an `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` to
drop into the same `.env`.

## 2. Run locally

```bash
npm install
npm start
```

Test it:
```bash
curl http://localhost:5000/api/health
```

## 3. Deploy

Any Node host works. Two easy free options:

### Render
1. Push this folder to a GitHub repo.
2. On render.com → New → Web Service → connect the repo.
3. Build command: `npm install` — Start command: `npm start`.
4. Add the same variables from `.env` under Environment.
5. Deploy — you'll get a URL like `https://your-app.onrender.com`.

### Railway
1. Push to GitHub, then railway.app → New Project → Deploy from repo.
2. Add environment variables in the Railway dashboard.
3. Railway auto-detects Node and runs `npm start`.

## 4. Connect it to your portfolio

Once deployed, open your portfolio's `index.html` and find this line near
the bottom `<script>`:

```js
var CONTACT_API_URL = "https://YOUR-BACKEND-URL/api/contact";
```

Replace it with your real backend URL, e.g.:

```js
var CONTACT_API_URL = "https://your-app.onrender.com/api/contact";
```

Also update `ALLOWED_ORIGIN` in your backend's env vars to your deployed
frontend URL (e.g. `https://vibhavraju.github.io`) instead of `*`, so only
your site can call the API.

## Notes

- Rate limit: 5 submissions per IP per 15 minutes.
- Hidden honeypot field (`company`) silently drops bot submissions.
- Free tiers on Render/Railway can "sleep" after inactivity — the first
  request after a while may take a few seconds to wake up. That's normal.
