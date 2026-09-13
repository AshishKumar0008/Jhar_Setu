# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Phase 02: Base Chrome & App Shell Components

## Current Goal

- Build the SIH selection-round MVP: one working Path C trace
  (water-quality) and one contrasting Path B trace (road damage),
  runnable end-to-end in the 3-minute demo script.

## Completed

- 01 Design System and UI primitive components (`context/feature-specs/01 design system.md`) — shadcn primitives, civic tokens from `ui-context.md`, `cn()` helper, `lucide-react`, government header with 3px tricolor line, Path A/B/C and trust badges, blueprint Section 11 tabs, Inter & Noto Sans Devanagari typography.
- 02 App Shell Components (`context/feature-specs/02-app-shell .md`) — Base chrome framing components:
  - `components/shell/app-navbar.tsx`: fixed-height civic navbar with tricolor line, emblem, bilingual title, language toggle, auth/role menu, and role-based sidebar toggle (`PanelLeftOpen`/`PanelLeftClose`).
  - `components/shell/role-sidebar.tsx`: floating overlay sidebar with fixed screen-tree nav items for all 6 internal roles (Reviewer, Department officer, Government, University, Industry/CSR, Admin), active bold/filled state using `--accent-primary`.
  - `components/patterns/path-badge.tsx` & `components/patterns/status-badge.tsx`: centralized color token mapping for Path A/B/C, trust cues, AI suggestion badge (visually distinct warning tint), and unified workflow status badges.
  - `components/patterns/detail-tabs.tsx`: generic full-width/left-aligned tab bar wrapping shadcn Tabs with blueprint Section 11 pilot tabs default.
  - `components/patterns/action-dialog.tsx`: reusable civic dialog shape with title, description, and footer actions.

## In Progress

- None (Phase 02 completed).

## Next Up

Following the dependency-optimized build order (do not reorder — each
step unblocks the next):

1. Monorepo scaffold, Docker Compose (web/api/ai-worker/postgres/
   redis/minio), env schema, design tokens, initial API/DTO contract,
   seed-data scripts.
2. Database migrations: identity/RBAC, reports, attachments, audit,
   cluster tables, base workflow states.
3. Auth stubs + route guards (role switch only in demo seed mode).
4. Citizen intake: submit → upload → receipt/tracking.
5. Reviewer queue + transition API + audit timeline (manual Path B/C
   works at this point).
6. AI job queue + structured analysis card + duplicate/candidate
   retrieval.
7. Cluster tooling + Path A/B routing + department officer case flow.
8. IGC generator + Challenge Passport + capability cards + matching
   shortlist.
9. University proposal + partner commitment + government
   validation/Pilot Readiness record.
10. Notifications, dashboards, hardening, accessibility pass, tests,
    deployment, demo rehearsal.

## Open Questions

- Which STT model actually runs in the demo environment
  (faster-whisper large-v3-turbo per blueprint) — needs a local
  smoke test before relying on it live.
- OTP provider for the demo: use a sandbox/mock, confirm before
  claiming live SMS in the pitch.
- Confirm the two seeded university Capability Cards and one industry
  Commitment Ledger entry are clearly labeled as illustrative demo
  data, not real partner confirmations.
- Final wording of the official SIH 26043 problem statement was not
  independently retrieved — confirm before final submission.

## Architecture Decisions

- Modular monolith (one Next.js PWA, one NestJS API, one FastAPI AI
  worker) instead of microservices — chosen for six-developer team
  size and demo timeline; module boundaries keep future extraction
  possible without needing it now.
- AI never decides — it only produces suggestions (`ai_runs` rows)
  that a human reviewer accepts, corrects, or rejects. This is the
  core differentiator from a generic AI-classifier submission and
  must not be violated anywhere in the build.
- Every workflow transition passes through one guarded endpoint
  pattern with role+state policy checks and a mandatory audit write —
  chosen so "what happens next" stays deterministic and demoable.

## Session Notes

- Source of truth for product scope: `JharSetu_SIH26043_Research_and_
  Competition_Playbook_v2.pdf` (positioning/demo strategy) and
  `JharSetu_Final_System_Blueprint.md` (exact screens, API surface,
  data model, build order).
- Do not invent behavior beyond these two documents — if something is
  ambiguous, resolve it here as an open question before implementing.
- Reduced-scope MVP checklist lives in the blueprint's "Aggressively
  reduced SIH MVP" section — treat the "Do not build for SIH" list as
  a hard boundary, not a suggestion.
