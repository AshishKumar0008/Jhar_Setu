Read `AGENTS.md` before starting.

This completes the citizen-facing page set started in
`03-public-pages.md`. Before starting this chapter, confirm the
following is already true — if not, fix it first, it is not optional:

- `app/page.tsx` renders the real Home Page from `03-public-pages.md`
  (hero + three action cards + how-it-works + innovation callout +
  stats + footer) — NOT the shell testbench.
- The shell testbench lives only at `/dev/shell-testbench` and is not
  linked from the navbar, footer, or any production page.
- `/report/new` renders the real Report Wizard from
  `03-public-pages.md`, not the testbench.

If any of those three are false, stop and fix the routing first —
building more pages on top of a broken root route will only add to the
confusion.

### Track Report Page

Create `app/track/page.tsx`.

Layout: same two-column shell as the Report Wizard (left rail +
main content), so the citizen never feels like they left the site.

**Left rail**: identical to the Report Wizard's left rail (three
action-card nav buttons, reassurance note, platform identity block,
helpline numbers, footer line). Reuse the same component, don't
recreate it.

**Main content**:
- eyebrow: `TRACK REPORT / अपनी शिकायत देखें`
- heading: "Track My Report"
- input row: Case ID field + either a recovery-phrase field
  (anonymous) or "Sign in to see all your reports" link
  (confidential) — both options visible, citizen picks one
- once a valid case is looked up, show a plain-language status
  timeline (reuse the status badge tokens from `01-design-system.md`):
  `Received → being prepared for review → under human review →
  [referred / joined to a verified issue / needs more information /
  closed]`
- below the timeline: a redacted summary card (category, location,
  submitted date, current path badge if assigned) and an
  `Add Information` button (opens the civic dialog pattern, no
  backend wiring yet)
- empty/error state: "We couldn't find a report with that ID. Check
  the case ID and try again, or use Get Help Submitting."

### Public Challenges Page

Create `app/challenges/page.tsx`.

This is the **public-safe** view of Path C challenges — no PII, no
exact location, no internal reviewer notes. It is what "View Verified
Challenges" on the homepage links to.

Layout: single column, full width, same navbar/utility bar as every
public page.

- eyebrow: `VERIFIED INNOVATION CHALLENGES / सत्यापित नवाचार चुनौतियाँ`
- heading: "Some problems need a new solution."
- one-line explainer: "These are recurring, evidence-verified gaps
  that have been opened to university and industry pilots."
- filter row: district, category — simple selects, no advanced
  search yet
- grid of Challenge Passport cards, each showing:
  - Path C badge + government-pilot trust badge (only if actually
    government-owned)
  - challenge title (outcome-oriented, e.g. "Low-Cost Continuous
    Water-Quality Monitoring")
  - one-paragraph redacted problem statement
  - coarsened location (district/block only, never exact village or
    coordinates)
  - current status badge (`PASSPORT PUBLISHED`, `PILOT PENDING`,
    `PILOT ACTIVE`, `ADOPTED`, etc. — from the shared token map)
  - `View Full Passport →` link (detail page, build later — stub a
    `/challenges/[id]` route that reuses `detail-tabs.tsx` if time
    allows, otherwise link to a "coming soon" state)
- empty state (no published challenges yet in seed data): "No
  verified challenges yet. Once a citizen report is confirmed as a
  genuine innovation gap, it will appear here."

### Routing Note (final, supersedes the note in 03-public-pages.md)

- `/` → Home Page
- `/report/new` → Report Wizard
- `/track` → Track Report (this chapter)
- `/challenges` → Public Challenges list (this chapter)
- `/challenges/[id]` → Challenge Passport detail (stub is acceptable
  for the demo if time is short)
- `/dev/shell-testbench` → dev-only, never linked in production

This is the complete public-facing route set for the SIH demo. Every
role-specific screen (reviewer, department officer, government,
university, industry, admin) is a separate chapter and lives behind
sign-in, not under these public routes.

### Check when done

- All four public routes (`/`, `/report/new`, `/track`, `/challenges`)
  exist as separate pages and none of them render the testbench
- The left-rail component is shared (imported), not copy-pasted,
  between the Report Wizard and Track Report pages
- Track Report shows a real status timeline using the shared status
  badge tokens, not invented colors
- Public Challenges never displays PII, exact coordinates, or an
  internal reviewer's notes — only fields marked public-safe in
  `architecture.md`'s data model
- Navigating Home → Report a Problem → Track My Report → View
  Verified Challenges feels like one consistent site, not four
  different visual styles
