# UI Context

## Theme

Light, high-contrast, civic/government workspace — not a dark
technical theme. The primary user is a rural citizen or assisted
operator on a low-end Android device, so clarity and accessibility
outrank visual flair. Reviewer/government/university/partner screens
share the same light theme but use denser layouts (tables, decision
cards) suited to desktop use.

## Colors

| Role            | CSS Variable       | Value     |
| --------------- | ------------------- | --------- |
| Page background | `--bg-base`         | `#F7F8FA` |
| Surface         | `--bg-surface`      | `#FFFFFF` |
| Primary text    | `--text-primary`    | `#111827` |
| Muted text      | `--text-muted`      | `#6B7280` |
| Primary accent  | `--accent-primary`  | `#0F62B4` |
| Accent (Path C) | `--accent-innovation`| `#7C3AED`|
| Border          | `--border-default`  | `#E2E5EA` |
| Error           | `--state-error`     | `#DC2626` |
| Success         | `--state-success`   | `#16A34A` |
| Warning (needs info)| `--state-warning`| `#D97706` |
| Report card (orange) | `--action-report` | `#C1440E` |
| Track card (navy)    | `--action-track`  | `#0F1F3D` |
| Help card (green)    | `--action-help`   | `#1F5C3F` |
| Utility bar / footer | `--brand-navy`    | `#0F1F3D` |
| Homepage background  | `--bg-cream`      | `#F5F1EA` |

Path A/B/C get a consistent small color tag across every screen (A =
accent-primary, B = warning, C = accent-innovation) so judges can
visually track a case's path without reading labels.

## Typography

| Role      | Font                                | Variable      |
| --------- | ------------------------------------ | ------------- |
| UI text   | Inter (Latin) / Noto Sans Devanagari (Hindi) | `--font-sans` |
| Code/mono | JetBrains Mono                       | `--font-mono` |

## Border Radius

| Context           | Class            |
| ------------------ | ---------------- |
| Inline / small UI  | `rounded-md`     |
| Cards / panels      | `rounded-xl`     |
| Modals / overlays   | `rounded-2xl`    |

## Component Library

shadcn/ui on top of Tailwind. Components live in `components/ui/`. Use
the shadcn CLI to add new primitives rather than writing them from
scratch; keep the reviewer decision-card layout and government
validation checklist as custom composed components built from those
primitives.

## Layout Patterns

- **Decision card** (reviewer, Section 9 of blueprint): 3-column —
  left = redacted narrative/media/map/timeline, middle = AI
  extraction + duplicate candidates (always labeled "AI suggests"),
  right = authority mapping + decision controls + audit trail.
- **Dashboards** (all roles): small action-needed queue at top → work
  list → drill-down detail → activity/audit. Charts are subordinate to
  action, never the first thing shown.
- **Public pages**: single-column, large touch targets, language
  toggle (हिंदी / English) always visible in the top nav.
- **Modals**: centered overlay with backdrop blur, used for
  confirmation steps (e.g. "Submit decision" recipient/visibility
  confirmation) — never for primary data entry.
- **Report wizard**: 4-step linear flow (Describe → Where/When →
  Evidence → Review & Submit) with persistent progress indicator and
  offline draft save.

## Icons

Lucide React. Stroke-based icons only. Sizes: `h-4 w-4` for inline
labels, `h-5 w-5` for buttons/nav. Use a small fixed icon set per
role (e.g. FileText for reports, Users for capability, Handshake for
commitments, ShieldCheck for pilot readiness) so recurring concepts
are instantly recognizable across screens.
