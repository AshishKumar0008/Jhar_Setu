Read `AGENTS.md` before starting.

We're adding the design system and UI primitive components.

JharSetu is a citizen-facing government platform, not a generic SaaS
dashboard. It must read as trustworthy, official, and calm — like
myScheme, JharSewa, or UMANG — not like a startup product. It also
follows GIGW 3.0 (Guidelines for Indian Government Websites) baseline
practices: WCAG 2.1 AA contrast, responsive down to 320px, no
information conveyed by color alone, and full keyboard navigation.

Install and configure `shadcn/ui`.

Add these shadcn components:
- Button
- Card
- Dialog
- Input
- Textarea
- Tabs
- Select
- Badge
- Table
- Avatar
- Separator
- Sheet
- Progress
- Accordion
- ScrollArea
- Toast (sonner)
- Skeleton

Do not modify the generated `components/ui/*` files after installation.
If a component needs different behavior, wrap it in a new component
under `components/patterns/` instead of editing the generated primitive.

Also install `lucide-react`.

Create `lib/utils.ts` with a reusable `cn()` helper for merging
Tailwind classes.

Ensure all components match the existing **light, high-contrast civic
theme** defined in `context/ui-context.md` — do not introduce a dark
theme or any color not defined in that token list.

## Government-site visual language (apply to every screen)

- **Header bar**: fixed top bar, white/near-white background, a left
  slot reserved for an emblem/logo mark, the platform name in a solid
  weight, and a right-aligned language toggle (हिंदी / English) plus
  sign-in. A thin 3px tricolor accent line (saffron / white / green)
  sits directly under the header — used once, never repeated as a
  decorative element elsewhere.
- **Primary accent color**: `--accent-primary` (civic blue, not a
  startup purple/gradient). Reserve `--accent-innovation` only for
  Path C / innovation-specific tags, never as a general brand color.
- **Trust cues, used sparingly and only where true**: "Government of
  Jharkhand pilot" / "Verified institution" / "Official hand-off"
  badges use `Badge` with a neutral or success token — never implied
  where not yet true (e.g. a pending commitment must visibly read
  PENDING, not look identical to a CONFIRMED one).
- **Buttons**: solid `--accent-primary` fill for the one primary
  action per screen (e.g. "Submit problem," "Issue certificate").
  Every other action is an outline or ghost button. Never more than
  one solid-filled button visible at a time in a single view.
- **Tabs**: used for role dashboards and the government pilot screen
  (Overview / Timeline / Measurements / Evidence / Risks & issues /
  Commitments / Evaluation / Audit) exactly as specified in the
  blueprint's Section 11. Tabs sit directly under a page heading, full
  width on mobile, left-aligned on desktop — never centered.
- **Cards**: used for the decision card, capability card, and
  commitment ledger entries. Flat, 1px border (`--border-default`),
  no drop shadow beyond a subtle 1–2px elevation on hover/focus only.
- **Forms**: labels always visible above the field (no placeholder-
  only labels), required fields marked with text ("required"), never
  color alone. Every form step in the citizen wizard shows a `Progress`
  bar or numbered step indicator, not just a spinner.
- **Empty/loading states**: use `Skeleton` for loading, and a plain-
  language empty state ("No reports yet — report a problem to get
  started") rather than a blank screen.
- **Typography**: Inter for Latin text, Noto Sans Devanagari for
  Hindi, both loaded via `next/font`. No decorative or script fonts
  anywhere — matches the "plain language, no clutter" GIGW direction.
- **Density**: citizen-facing screens (public + citizen dashboard) use
  generous spacing and large touch targets (44px minimum). Internal
  screens (reviewer, department officer, government, university,
  industry) may use a denser table/card layout, since those users are
  on desktop.
- **Never do**: gradients, neon colors, decorative illustrations that
  aren't functional, auto-playing media, dark mode, or any pattern
  that makes the platform look like a marketing site rather than a
  public-service tool.

### Check when done

- All components import without errors
- `cn()` works properly
- No default shadcn light/dark theme leaks through — only tokens from
  `context/ui-context.md` are visible
- Header shows the tricolor accent line exactly once, under the header
  bar, nowhere else
- Only one solid-filled primary button is visible per screen
- Every Tabs instance matches the exact tab labels defined in the
  blueprint (no invented tab names)
- Hindi text renders correctly in Noto Sans Devanagari, not a fallback
  font
- Keyboard-only navigation reaches every interactive element in order
