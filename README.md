# Ebirone Michael — Developer Portfolio

A responsive, premium charcoal-and-silver portfolio starter built with React, TypeScript, Vite, React Router, and a small Express email endpoint. The design uses CSS motion and intersection-based reveal animations rather than a heavy animation framework.

## Included

- Responsive personal portfolio homepage
- About, focus areas, selected work, approach, and recruiter-focused contact sections
- Individual project case-study routes at `/projects/:slug`
- Accessible mobile navigation, reduced-motion support, and polished hover states
- Contact form API using Brevo SMTP/Nodemailer, shared by the local Express server and a Netlify Function
- Netlify production configuration for React Router fallback, function routing, and request limits
- SEO basics and editable portfolio content

## Requirements

- Node.js 20+ recommended
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

## Deploy to Netlify with GitHub

`netlify.toml` sets the build command to `npm run build`, publishes `dist`, packages `netlify/functions`, and configures a single-page-app fallback for React Router. The contact function handles `POST /api/contact` directly; `GET /api/health` reports service availability and whether the required settings are present. Local development continues to use the Express adapter on port `4174`, and both adapters share `server/contact-service.js`.

In the Netlify dashboard, connect the GitHub repository and select the production branch. Keep the site base directory at the repository root. Build, publish, and function-directory settings are read from `netlify.toml`.

Add these variables under the Netlify project's environment variables, with **Functions/runtime** access enabled. Do not put secrets in `netlify.toml`, `vite.config.ts`, or any `VITE_*` variable:

```text
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<Brevo SMTP login>
SMTP_PASS=<Brevo SMTP key>
CONTACT_TO=ebirone4@gmail.com
CONTACT_FROM=<sender address verified in Brevo>
```

After saving the variables, trigger a deploy. Once the GitHub repository is connected, pushes to the selected production branch trigger deployments. Send a real test through the live form and confirm that it arrives before treating email delivery as verified.

This workspace currently has no `.git` metadata or configured remote, so it must be attached to the intended GitHub repository before Netlify can connect to it.

## Local production check

```bash
npm run build
npm start
```

The Express server serves `dist` and `/api/contact` from one origin for a local production check. `GET /api/health` reports backend availability and configuration presence without exposing credentials. The Vite development server proxies `/api` to `http://127.0.0.1:4174`.

Run `npm test` to test both contact adapters with an injected mock mail sender. Tests do not contact Brevo or send real email.

## Notes

- Project implementation details and results are not claimed unless confirmed; the case studies call out what still needs source review.
- Project-card and case-study artwork is illustrative and is not presented as an application screenshot.
