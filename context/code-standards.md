# Code Standards

## General

- Keep modules small and single-purpose; one NestJS module per
  workflow domain (reports, review, authority, challenge, commitments,
  government, admin) — don't merge unrelated domains into one module.
- Fix root causes, not symptoms — e.g. if a transition can be
  triggered from the wrong role/state, fix the guard, don't patch the
  UI to hide the button.
- Never let a screen imply a decision the system hasn't actually made
  (no fake "resolved," no invented government API responses, no
  AI-labeled output shown as final).
- Do not mix unrelated concerns in one component or route (e.g. don't
  put AI-suggestion rendering and human-decision submission in the
  same handler).

## TypeScript

- Strict mode is required throughout `apps/web` and `apps/api`.
- Avoid `any` — use explicit interfaces/types, or the shared Zod
  schemas from `packages/shared`.
- Validate all unknown external input (report submissions, AI worker
  callbacks, file uploads) at the system boundary before trusting it —
  reject unknown fields.

## Next.js

- Default to server components; add `"use client"` only where
  interactivity (forms, voice recording, map pins) requires it.
- Route guards enforce role access at the page level; the API is the
  real enforcement point, the UI guard is UX only.
- Keep offline/PWA behavior (draft save, receipt caching) isolated in
  a dedicated module, not scattered across pages.

## NestJS (API)

- Route handlers stay focused on one responsibility: validate → check
  role+scope → call workflow/service → return a typed response.
- All state transitions go through the workflow engine's guarded
  transition method — no direct entity status writes from a
  controller.
- Every mutating endpoint requires an explicit permission + scope
  check before touching data, not just an `@Roles()` decorator.

## Styling

- Use Tailwind utility classes bound to the CSS custom property tokens
  defined in `ui-context.md` — no hardcoded hex values.
- Follow the border-radius scale in `ui-context.md` for all cards,
  modals, and inline elements.
- Design for low-bandwidth, low-literacy users first: large touch
  targets, minimal reliance on color alone, Hindi/English toggle on
  every public page.

## API Routes

- Validate and parse request input (Zod/class-validator DTOs) before
  any business logic runs; reject unknown fields.
- Enforce auth, role, and scope before any mutation — never after.
- Return consistent response shapes (`{ data, error }` or equivalent)
  across all domains.
- Every human-decision endpoint (review decision, IGC issue, pilot
  readiness approval, adoption decision) requires a `reason_code` /
  rationale field in the payload.

## Data and Storage

- Metadata, decisions, and status belong in PostgreSQL.
- Original media (voice, photo, document) belongs in object storage,
  referenced by a signed-URL key — never inlined in the database.
- AI raw outputs go in `ai_artifacts` (restricted); only the redacted
  normalized summary is used by the general workflow.
- PII (name, phone, email, exact geo-point) is stored separately from
  the public-safe/redacted report and challenge records, and every
  reveal is an audited `PII_ACCESSED` event.

## File Organization

- `apps/web/` — Next.js PWA, role-based route groups
- `apps/api/` — NestJS modules, one folder per workflow domain
- `apps/ai-worker/` — FastAPI pipeline (transcribe, redact, extract,
  embed, cluster-score)
- `packages/shared/` — shared DTOs/Zod schemas used by web + api
