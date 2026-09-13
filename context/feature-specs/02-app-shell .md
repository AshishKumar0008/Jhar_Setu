Read `AGENTS.md` before starting.

We need the base chrome components that frame every screen — the top
navbar and the role sidebar shell. These will be reused and extended
in every chapter that follows. Unlike a generic editor tool, JharSetu
has no single canvas — it has seven role-specific dashboards (citizen,
assisted operator, reviewer, department officer, government, university,
industry/CSR, admin) that all share the same top navbar and the same
sidebar pattern, just with different nav items per role.

### Top Navbar

Create `components/shell/app-navbar.tsx`.

Requirements:

- fixed-height top navbar, white/near-white background (`--bg-surface`),
  1px bottom border (`--border-default`)
- left, center, and right sections
- left section: circular emblem/logo slot + "JharSetu" in bold +
  "झारसेतु" beside it in a muted weight, with "Government of Jharkhand
  • झारखंड सरकार" as a small subtitle line underneath
- center section stays empty for now (reserved for a page title or
  breadcrumb in later chapters)
- right section: language toggle (`English` / `हिंदी` segmented
  control) + a `Sign in / प्रवेश` button (outline style, becomes a
  user/role menu once authenticated)
- a 3px tricolor accent line (saffron / white / green) directly under
  the navbar — rendered once, here only, never repeated elsewhere in
  the app
- for internal (non-public) roles, the left section also shows a
  sidebar toggle button using `PanelLeftOpen` / `PanelLeftClose` icons
  based on sidebar state — public/citizen-facing pages never show this
  toggle, since they have no sidebar

### Role Sidebar

Create `components/shell/role-sidebar.tsx`.

Requirements:

- sidebar should float above the page canvas, not push page content
- slides in from the left, accepts an `isOpen` prop
- header with the current role name (e.g. "Reviewer", "Government",
  "University") + close button
- nav items are **not tabs** and **not the same for every role** — each
  role gets its own fixed list, sourced from the master screen tree:
  - Reviewer: Dashboard, Review queue, Report decision card, Cluster
    explorer, Authority routing, Path C candidates, Innovation Gap
    Certificates, Challenge Passport editor, Matching runs, Audit view
  - Department officer: Dashboard, Assigned authority cases, Case
    detail / actions, SLA / overdue queue, Resolution verification
  - Government: Dashboard, Validation queue, Challenge portfolio,
    University proposals, Commitment status, Pilot readiness, Active
    pilots, Evaluation, Adoption decisions, Aggregate reports
  - University: Dashboard, Capability card, Challenge marketplace,
    Challenge detail, Interests, Proposal workspace, Team / mentors,
    Notifications
  - Industry/CSR: Dashboard, Organization verification, Challenge
    marketplace, Challenge detail, Commitments ledger, Mentor roster,
    Impact / status reports
  - Admin: Dashboard/health, Users and org verification, Roles and
    scopes, Taxonomy, Location hierarchy, Authority mappings,
    Notification templates, Model/prompt registry, Audit search, Data
    retention/export controls
- active nav item uses `--accent-primary`, never color alone — pair it
  with a filled/bold state, not just a color change
- no "New Project"-style button at the bottom — this sidebar is
  navigation only, it does not create records

### Path / Status Badge Pattern

Use the existing color tokens from `context/ui-context.md` for badge
styling — do not invent new colors here.

Create `components/patterns/path-badge.tsx` and
`components/patterns/status-badge.tsx`. Support:

- Path badges: `Path A · Known Service`, `Path B · Grievance Routing`,
  `Path C · Innovation Gap` — each tinted with its assigned accent
  (A = `--accent-primary`, B = `--state-warning`, C =
  `--accent-innovation`)
- Trust badges: `Government of Jharkhand pilot`, `Verified institution`
  — neutral/success tint, only ever rendered where actually true
- AI-suggestion badge: `AI suggestion (Requires human verification)` —
  always the warning/neutral tint, never success — this label must
  appear next to every AI-derived field anywhere in the app
- Status badges: e.g. `PILOT_PENDING`, `RESOLVED`, `CONFIRMED`,
  `NEEDS_INFORMATION` — one fixed color per state, defined once in a
  status→token map, reused everywhere so the same status never renders
  in two different colors

Do not wire these to real data yet — accept the label/variant as props
and render with static seeded examples.

### Tabs Pattern (Pilot / Case Detail Screens)

Create `components/patterns/detail-tabs.tsx` wrapping shadcn `Tabs`.

Requirements:

- tabs sit directly under a page heading, full width on mobile,
  left-aligned on desktop — never centered
- default tab set for the government pilot screen (Section 11 of the
  blueprint): `Overview`, `Timeline`, `Measurements`, `Evidence`,
  `Risks & issues`, `Commitments`, `Evaluation`, `Audit`
- component accepts a `tabs` prop so other screens (e.g. a future
  case-detail tab set) can reuse it with a different label list — do
  not hardcode the pilot tab labels inside the shared component itself

### Dialog Pattern

Use the existing color tokens from `context/ui-context.md` for dialog
styling.

Support:

- title
- description
- footer actions

Do not build actual dialogs yet — this is only the reusable
title/description/footer shape, to be filled in later for real flows
(e.g. "Submit decision" confirmation, "Issue certificate" confirmation,
"Approve pilot readiness" confirmation).

### Check when done

- new components compile without TypeScript errors
- no lint errors
- navbar renders identically on every route; the tricolor line appears
  exactly once, directly under it
- sidebar nav items differ correctly per role and never show a
  "Projects/Shared"-style generic list
- path badges and status badges pull from the single shared color
  token map, not ad-hoc colors per screen
- the AI-suggestion badge is visually distinct from a Verified/Trust
  badge — a reviewer should never be able to mistake one for the other
- tabs pattern is generic enough to reuse outside the pilot screen
- dialog pattern is ready for future use
