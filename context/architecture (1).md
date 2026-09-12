# Architecture Context

## Stack

| Layer      | Technology                                             | Role                                              |
| ---------- | ------------------------------------------------------- | -------------------------------------------------- |
| Frontend   | Next.js (App Router) + TypeScript, PWA/Workbox          | Role-aware citizen/reviewer/officer/gov/uni/partner UI |
| UI         | Tailwind CSS + shadcn/ui, React Hook Form + Zod          | Forms, components, client-side validation           |
| API        | NestJS + TypeScript, REST + Swagger                     | Workflow/state-machine engine, RBAC, DTO validation  |
| AI worker  | Python 3.11, FastAPI, Pydantic                           | Async transcription, redaction, extraction, embedding |
| Database   | PostgreSQL 16 + PostGIS + pgvector, TypeORM migrations   | Transactional source of truth, geo + vector search   |
| Jobs       | Redis + BullMQ                                           | Async AI jobs, notifications, retries                |
| Storage    | S3-compatible (MinIO locally)                            | Encrypted evidence, signed URLs                      |
| Maps/Charts| MapLibre, Apache ECharts                                 | Cluster geography and dashboard visuals              |

## System Boundaries

- `apps/web` — Next.js PWA. All role-specific pages/navigation. Never
  changes workflow status directly; calls the API.
- `apps/api` — NestJS modules: auth/consent, reports, review, workflow
  engine (state machine + transitions), authority routing, challenge
  (IGC/passport/matching), commitments, government/pilot, admin,
  notifications, audit.
- `apps/ai-worker` — FastAPI service. Owns transcription, PII
  redaction, structured extraction, embeddings, and duplicate
  scoring. Never writes decisions — only produces `ai_runs` rows for a
  human to review.
- `packages/shared` — Shared DTO/schema types (Zod) consumed by both
  web and api to keep the request/response contract in sync.

## Storage Model

- **PostgreSQL**: all metadata, roles, decisions, state, challenges,
  capability cards, commitments, pilots, and the `audit_events` /
  `outbox_events` tables. This is the single source of truth.
- **PostGIS**: village/block/district boundaries and proximity
  queries for cluster candidate retrieval.
- **pgvector**: BGE-M3 embeddings for semantic duplicate/cluster
  candidate search, stored alongside transactional data (no second
  search system).
- **Object storage (S3/MinIO)**: original media (voice, photo,
  document) and generated PDFs (certificates), accessed only via
  short-lived signed URLs. Never queried directly for logic.

## Auth and Access Model

- Citizen: anonymous session (case ID + recovery-phrase hash) or OTP
  confidential login. OTP is never treated as proof of identity for a
  government/reviewer role.
- Organization accounts (reviewer, department officer, government
  decision maker, university lead, industry/CSR lead, admin): email +
  password (Argon2) or approved SSO, membership requires admin
  verification.
- RBAC + scope: every role has a permission set AND a scope (e.g. a
  reviewer's `REPORT_REVIEW` is limited to a district/category). All
  sensitive queries filter by scope at the service layer, not just the
  UI.
- Ownership: a report belongs to its reporter (or the assisted
  operator + reporter pair); a challenge belongs to its originating
  cluster; a commitment belongs to the approving organization.

## Invariants

1. The UI never changes workflow status directly — every transition
   goes through `POST /transitions` (or path-specific transition
   endpoints), is checked against a role-and-state policy, written in
   the same DB transaction as an `audit_events` row, and emitted via
   the outbox.
2. A report can be linked to a cluster but is never deleted; the
   individual `Report` and the shared `ProblemCluster` are always
   separately queryable.
3. Any human decision must carry a `reason_code`, actor, timestamp,
   policy version, and previous/new state.
4. Every automatic (AI) task has a human review state. Low-confidence
   or schema-invalid AI output goes to `NEEDS_HUMAN_REVIEW` — it is
   never auto-routed to Path A/B/C, and AI never issues a certificate,
   assigns responsibility, selects a pilot team, or approves adoption.
5. Private identity and original media are never copied into a
   Challenge Passport, matching/capability card, or any public
   dashboard — only redacted/aggregated fields cross that boundary.
6. External systems (JharSewa, myScheme, CPGRAMS, Bhashini) are only
   ever reached through an approved adapter, export, or email/link —
   never an unauthorized live integration, and the UI must not imply
   one exists.
