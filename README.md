# Western World Visa Services website

Public marketing site for westernworldvisaservices.com, rebuilt in Next.js 16 + Tailwind v4. Every enquiry form posts
to the CRM's public intake, so each submission becomes a lead (or is added to the person's open lead) and the student
gets the email + WhatsApp acknowledgement.

This is a **tenant website**: it belongs to one client (Western World, CRM tenant `westernworld`) and changes whenever
they ask. The CRM itself lives in [codewithnmn/softzenith-crm](https://github.com/codewithnmn/softzenith-crm) and is
shared by all tenants. The two are connected only by the CRM's public enquiry API (below); no code is shared.

```bash
npm install
npm run dev -- -p 3001      # needs the CRM backend on :8081 for the forms
npm run build && npx next start -p 3001
```

| Setting | Default | Meaning |
|---|---|---|
| `CRM_API_URL` | `http://localhost:8081` | CRM backend; `/api/*` is proxied to it (no CORS needed) |
| `NEXT_PUBLIC_CRM_TENANT` | `westernworld` | CRM tenant slug that receives the enquiries (owner, 30 Sep 2026: Western World is the first tenant; onboard it before forms work) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | empty | Cloudflare Turnstile captcha; leave empty locally (no captcha) |

Copy `.env.example` to `.env.local` to change them. Production sets them on the hosting platform.

## Connection to the CRM

The browser never calls the CRM. `next.config.ts` proxies exactly two public endpoints to `CRM_API_URL`:

| Endpoint | Used by |
|---|---|
| `POST /api/v1/public/tenants/{slug}/enquiries` | every form (`lib/enquiry.ts` → `submitEnquiry`): `fullName`, `phone`, optional `email`, `serviceInterest`, `preferredCountry`, `message`, `sourceDetail`, UTM fields, honeypot `website`, `captchaToken` |
| `GET /api/v1/public/tenants/{slug}/enquiry-form` | reserved (form options per tenant) |

Errors come back as RFC 9457 problem details (`detail` is shown to the visitor). The API is versioned (`v1`); a
breaking change in the CRM ships as `v2` and this site moves over deliberately. Everything else in the CRM (staff API,
dev login) is unreachable from this site's domain.

**Local development with the CRM:** clone both repos side by side and start the CRM (`.\dev` in softzenith-crm starts
this site on :3001 too when it finds `../westernworld-website`), or run the backend alone and `npm run dev -- -p 3001` here.
Without a backend the pages work; only form submits fail.

## Updating content (client requests)

| What | Where |
|---|---|
| Announcement bar (intakes, deadlines) | `content/announcement.ts`: new `id` per announcement, optional `deadline` for the live countdown, `enabled: false` hides it |
| News & blog posts | `content/posts.ts`: add an object; it appears on the home page, `/blog` and `/blog/<slug>` |
| Video testimonials | `content/testimonials.ts` → `VIDEO_STORIES`: add the YouTube id |
| Visa / IELTS result photos | `public/ieltsstu/` + the lists in `content/testimonials.ts` |
| Services | `content/services.ts` (each gets `/services/<slug>`) |
| Destinations board | `DESTINATIONS` in `lib/site.ts` (needs a matching entry in `content/countries.json`) |
| Phone, email, address, social links | `SITE` in `lib/site.ts` |

Then `npm run lint && npx tsc --noEmit && npm run build`, and deploy.

## Git

`main` = what is live, `develop` = next release. Branch `feat/<slug>` / `fix/<slug>` from `develop`, conventional
commits, PR into `develop`; `develop` → `main` to release.

## Content

- `content/*.json` were generated from the old site on 26 Sep 2026 (visible content only, HTML comments ignored):
  8 countries, 50 universities, 79 IELTS + 79 PTE city pages, student galleries and sliders. Images are in `public/`
  under their old paths (`download (1).jpg` became `download-1.jpg`).
- `content/copy.ts` holds text that several pages share (packages, IELTS test details, city-page copy).
- Page-specific text lives in each `app/**/page.tsx`.

## Old URLs

All old `.php` URLs, `/universities-detail.php?uid=N`, `/delhi/ielts-classes-*` and `/pte/pte-classes-*` redirect (308)
to the new pages (`next.config.ts`, `app/universities-detail.php/route.ts`).

## Known gaps inherited from the old site

- Study in Ireland (HTTP 500), the German-language page (404) and the only blog post (404) had no content. Ireland
  and USA show an enquiry form instead of a university list; the blog card leads to enrolment.
- 7 images were missing on the old server; those universities show a placeholder tile.
- Some university entries look like data-entry mistakes (uid 102 "Study in Canada", 107 "ST Michelle College11",
  empty descriptions). Kept as they were, for the client to clean up.
- Lorem-ipsum section subtitles ("Fusce sem dolor…") were not carried over.
- The old site's tawk.to live chat was removed (owner, 26 Sep 2026): chats went to an outside account and never became
  leads. Contact is by the enquiry forms (→ CRM leads) and the WhatsApp button. A chat can come back later as a CRM
  lead source (tawk.to webhook → intake).
