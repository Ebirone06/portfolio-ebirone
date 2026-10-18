# Ebirone Michael — Developer Portfolio

A responsive, premium charcoal-and-silver portfolio starter built with React, TypeScript, Vite, React Router, and a small Express email endpoint. The design uses CSS motion and intersection-based reveal animations rather than a heavy animation framework.

## Included

- Responsive personal portfolio homepage
- About, focus areas, selected work, approach, and recruiter-focused contact sections
- Individual project case-study routes at `/projects/:slug`
- Accessible mobile navigation, reduced-motion support, and polished hover states
- Contact form API using Brevo SMTP/Nodemailer, shared by the local Express server and Vercel Functions
- Vercel production configuration for React Router fallback and serverless API routes
- SEO basics and editable portfolio content

## Requirements

- Node.js 22.x (matches the Vercel function runtime)
- npm
- SMTP credentials to enable actual email delivery

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`. The API runs at `http://localhost:4174`; Vite proxies `/api` requests during development.

## Configure Brevo email

Copy `.env.example` to `.env` for local development. Configure the server-only Brevo credentials and a sender address verified in Brevo:

```dotenv
PORT=4174
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-brevo-smtp-username
SMTP_PASS=your-generated-brevo-smtp-key
CONTACT_FROM=verified-sender@yourdomain.com
CONTACT_TO=ebirone4@gmail.com
```

The integration uses the `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, and `CONTACT_FROM` variables. For Brevo, it connects to `smtp-relay.brevo.com` on port `587` with STARTTLS. Use the SMTP key generated in Brevo's SMTP settings, not a Brevo API key. Never commit `.env` or expose these values through Vite or frontend code. If settings are missing or invalid, the API returns a safe configuration response and logs only missing variable names.

## Replace the starter content

### 1. Add your real projects

Edit `src/data/projects.ts`. Each project uses these fields:

- `title`, `category`, `summary`
- `role`, `problem`, `approach`, `learnings`
- `stack`, `repositoryUrl`, `demoUrl`
- `status`: change to `published` when the details and links are accurate

Each project automatically gets a detail page. Keep unknown technical details and outcomes marked as unverified until you can confirm them.

### 2. Update your real links and contact details

In `src/pages/Home.tsx`, update the GitHub, LinkedIn, and email links only if those profiles or contact details change.

### 3. Update SEO

Edit the title, description, social sharing metadata, and domain in `index.html` when the deployment URL is known.

## Deploy to Vercel

The root-level `api/contact.js` and `api/health.js` files are Vercel Node.js Functions that reuse `server/contact-service.js`, the same mail service used by Express locally. `POST /api/contact` validates and sends the message; `GET /api/health` reports whether the mail configuration is present without returning values. `vercel.json` builds with `npm run build`, serves `dist`, and sends non-API routes to the Vite SPA entry point so React Router project pages work on direct visits and refreshes. API requests are excluded from that fallback.

To create the Vercel project, import the portfolio's GitHub repository in Vercel, set the project root to the repository root, and use these build settings (also recorded in `vercel.json`):

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite (or Other if auto-detection does not select Vite)

Add the following server-only environment variables in **Settings → Environment Variables**. Add them to each environment that should accept contact requests: **Development**, **Preview**, and **Production**. Do not use `VITE_` prefixes or put secrets in `vercel.json`:

```text
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<Brevo SMTP login>
SMTP_PASS=<Brevo SMTP key>
CONTACT_TO=ebirone4@gmail.com
CONTACT_FROM=<sender address verified in Brevo>
```

For production abuse protection, create a Vercel Firewall rate-limit rule in the project's **Firewall** settings for request path `/api/contact`, keyed by source IP. A starting limit is 6 requests per 60 seconds with the default 429 action. Review and publish the rule. Vercel's Firewall provides the shared platform-level limit; the Express in-memory limiter applies only to the local server and is not a production distributed limiter.

After configuring the environment variables and Firewall rule, deploy the project. Once GitHub is connected, pushes to the selected production branch trigger deployments. Test `GET https://<your-domain>/api/health`, then submit a real test through the deployed form and confirm it arrives before treating Brevo delivery as verified. No real email is sent by the automated tests.

This workspace currently has no `.git` metadata or configured remote. Connect or import the intended GitHub repository in Vercel before enabling Git-based deployments.

## Local production check

```bash
npm run build
npm start
```

The Express server serves `dist` and `/api/contact` from one origin for a local production check. `GET /api/health` reports backend availability and configuration presence without exposing credentials. The Vite development server proxies `/api` to `http://127.0.0.1:4174`.

Run `npm test` to test the Vercel handlers and local Express endpoint with an injected mock mail sender. Tests do not contact Brevo or send real email. For Vercel's local function runtime, install/use the Vercel CLI and run `vercel dev` after linking a local Vercel project; local `.env` values are used for development. The default `npm run dev` workflow remains Vite plus Express and is sufficient for normal portfolio work.

## Notes

- Project implementation details and results are not claimed unless confirmed; the case studies call out what still needs source review.
- Project-card and case-study artwork is illustrative and is not presented as an application screenshot.
