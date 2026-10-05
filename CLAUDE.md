@AGENTS.md

# Western World website

Tenant website for Western World Visa Services (CRM tenant `westernworld`). Read `README.md`, then `HANDOFF.md`.

- **Connected to the CRM only through its public enquiry API** (`lib/enquiry.ts`, proxied in `next.config.ts`).
  Never call other CRM endpoints, never copy CRM code here, and never put Western World-only code in the CRM repo.
- Content is data: `content/*` and `lib/site.ts`. Client requests (banner, posts, photos, services) are edits there.
- Server components by default; client components only for interaction. No new runtime dependency without a reason
  in `HANDOFF.md`. Keep the CSP in `next.config.ts` strict (add an origin only when a feature needs it).
- Copy shown to students makes no guarantees (visas, scholarships, jobs) and is reviewed by the owner.
- Verify: `npm run lint && npx tsc --noEmit && npm run build` (a new route needs `build` before `tsc`).
- Git: commit or push only when the owner asks; branch from `develop`, PR into `develop`; never push to `main` unless
  the owner asks in that message. Update `HANDOFF.md` at the end of every task.
