Read `AGENTS.md` before starting.

The Phase 02 shell testbench (`app/dev/shell-testbench/page.tsx` or
wherever it currently lives) was correct and intentional — it exists
only to verify the navbar, role sidebars, badges, tabs, and dialog
pattern render correctly in isolation. It must never be the site's
home page and must never be linked from production navigation. If it
currently renders at `/`, move it to a `/dev/*` route now.

We are now building the real public pages as separate routes, matching
the approved Figma design
(figma.com/design/sg8wP8V9qeLe5d6BFEHmXh/Untitled). Each page below is
its own route — do not stack them on one page.

### Utility Bar (add above the existing navbar)

Create `components/shell/utility-bar.tsx`.

The Figma design adds a second, thinner bar above the navbar built in
02-app-shell — this is standard on Indian government sites (GIGW
pattern) and was missing from our first pass:

- full-width, dark navy background (`--brand-navy`, new token — see
  below)
- left: `GOVERNMENT OF JHARKHAND | झारखण्ड सरकार`
- right: `Skip to Main Content` link (real anchor to `#main-content`,
  required for accessibility) + `English` / `हिंदी` toggle
- this bar sits above the existing `app-navbar.tsx`, not inside it —
  keep them as two separate components

### New Color Tokens (add to `context/ui-context.md` and `globals.css`)

The Figma design uses a tricolor **action-card** system on the
homepage that is distinct from the base civic-blue theme. Add these
tokens — they are used ONLY for the three homepage action cards and
their icons, never for general UI:

| Token              | Value     | Use                          |
| -------------------- | --------- | ------------------------------ |
| `--action-report`    | `#C1440E` | "Report a Problem" card (orange) |
| `--action-track`     | `#0F1F3D` | "Track My Report" card (navy)  |
| `--action-help`       | `#1F5C3F` | "Get Help Submitting" card (green) |
| `--brand-navy`       | `#0F1F3D` | Utility bar, footer background |
| `--bg-cream`          | `#F5F1EA` | Homepage section background    |

### Home Page

Create `app/page.tsx`.

Layout, top to bottom:

1. Utility bar + navbar (from above)
2. Hero section on `--bg-cream` background:
   - eyebrow label: `JHARKHAND PUBLIC SERVICES / लोक सेवाएँ`
   - large heading: "Report a local problem. Find the right next
     step." with the Hindi line "समस्या दर्ज करें सही अगला कदम पाएं"
     directly under it in the accent color
   - subtext: "Speak, type, or add a photo."
3. Three action cards in a row (stack on mobile), each full-bleed
   color per the tokens above, white text/icons:
   - `Report a Problem` (orange) — `STEP 1 / पहला कदम` tag, FileText
     icon, `Report Now →` button
   - `Track My Report` (navy) — `STATUS / स्थिति` tag, Search icon,
     `Check Status →` button
   - `Get Help Submitting` (green) — `SUPPORT / सहायता` tag,
     MessageCircle icon, `Get Help →` button
4. "How JharSetu works for you" section — three numbered steps (01
   Report, 02 Review, 03 Next step), each with a one-line description
   and a small tag row: `Existing Service`, `Authority Action`,
   `Innovation Challenge`
5. Innovation callout section: "Some problems need a new solution." +
   "Verified recurring problems can become innovation challenges." +
   a `View Verified Challenges →` link (routes to the public
   challenges list, build later)
6. Stats row (three numbers, seeded/demo values, clearly labeled as
   illustrative): total complaints received, resolved gracefully,
   average resolution time
7. Footer on `--brand-navy` background: platform name + tagline,
   official toll-free helplines (e.g. `181` General Public Grievance,
   `1912` Electricity Complaint Desk), attribution line, links (Website
   Policy, Help & Accessibility)

Do not put the report wizard, tracking, or any role-specific view on
this page — each of those is its own route below.

### Report Wizard Page

Create `app/report/new/page.tsx`.

Layout: two-column on desktop (left rail + main content), single
column on mobile.

**Left rail** (persistent across all wizard steps):
- three nav-style buttons matching the homepage action cards
  (Report a Problem / Track My Report / Get Help Submitting), current
  one highlighted
- reassurance note: "Your report is registered securely. You will
  receive an SMS update automatically."
- platform identity block: name, tagline, one-paragraph description
  of who runs it
- official toll-free helpline numbers, repeated here for context
- footer line (attribution)

**Main content**:
- eyebrow: `NEW REPORT / नयी शिकायत दर्ज करें`
- heading: "Submit a Local Problem" + Hindi subheading
- step indicator: `Step 1 of 2: Report Details (चरण 1: रिपोर्ट विवरण)`
  with a percentage-complete progress bar (use the shared `Progress`
  component from 01-design-system)
- "How would you like to report?" — two large toggle cards:
  `Hold to Speak` (mic icon, filled navy) and `Type Your Problem`
  (pencil icon, outline) — selecting one reveals the matching input
  (voice recorder or textarea)
- "What happened?" — textarea with bilingual placeholder
- "Where did this happen?" — three buttons: `Use My Location`,
  `Choose on Map`, `Use Village Name Only`
- "Category" — chip group: Water, Roads, Health, Agriculture,
  Education, Environment, Other, Not sure
- "Attach Photo (Optional)" — upload dropzone
- "Mobile Number for SMS Tracking" — phone input with country code,
  helper text explaining SMS use
- "Check your report" review block — read-only summary of the fields
  above (problem summary, category, location, contact, evidence
  thumbnail)
- footer actions: `Submit Report` (solid, `--action-report` color)
  and `Save Draft` (outline)
- a side panel on desktop (right of main content, inside the content
  column, not the left rail): "Grievance Resolution Rules" — bullet
  list (bilingual support, BDO assignment, official redressal SLA)
  and a contact line for admin support

This page reuses `detail-tabs.tsx` step-indicator styling patterns
where useful, but the wizard itself is a linear stepper, not a tabs
component — do not use shadcn `Tabs` here.

### Routing Note

- `/` → Home Page (above)
- `/report/new` → Report Wizard (above)
- `/track` → Track Report (build next chapter)
- `/challenges` → Public Challenges list (build next chapter)
- `/dev/shell-testbench` → Phase 02 testbench, dev-only, excluded from
  production nav and from any sitemap/robots indexing

### Check when done

- Home page and Report Wizard render as two separate routes, not
  stacked on one page
- The Phase 02 testbench still works but is not reachable from any
  production link
- New tokens (`--action-report`, `--action-track`, `--action-help`,
  `--brand-navy`, `--bg-cream`) are defined once in `globals.css` and
  documented in `context/ui-context.md` — not hardcoded per-page
- Utility bar appears above the navbar on every public page
- "Skip to Main Content" link is keyboard-focusable and jumps to
  `#main-content`
- Wizard progress bar updates correctly between step 1 and step 2
- No page mixes homepage content and wizard content together
