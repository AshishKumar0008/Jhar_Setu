# AI Workflow Rules

## Approach

Build the JharSetu MVP incrementally using a spec-driven workflow,
following the dependency-optimized build order in
`progress-tracker.md` (Section "Next Up") — do not skip or reorder
steps, since each one unblocks the next. `project-overview.md`,
`architecture.md`, `code-standards.md`, and `ui-context.md` define
what to build, how to build it, and how it should look. Always
implement against these specs — do not infer or invent product
behavior, screens, or integrations beyond what the JharSetu blueprint
and playbook describe.

## Scoping Rules

- Work on one feature unit at a time (e.g. "citizen intake wizard,"
  not "citizen intake + reviewer queue" together).
- Prefer small, verifiable increments over large speculative changes —
  build the manual/seeded version of a flow before adding AI or
  automation on top of it.
- Do not combine unrelated system boundaries in a single
  implementation step (e.g. don't touch `apps/ai-worker` and the
  Path C matching UI in the same change).

## When to Split Work

Split an implementation step if it combines:

- UI changes and workflow/state-machine changes
- Multiple unrelated API domains (e.g. `reports` and `commitments`)
- Behavior not clearly defined in `project-overview.md` or the source
  blueprint — resolve it as an open question first

If a change cannot be verified end to end quickly (e.g. "citizen
submits → row appears in reviewer queue with correct state"), the
scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior not defined in the JharSetu blueprint
  or playbook.
- If a requirement is ambiguous (e.g. exact wording of a screen, a
  scoring weight), resolve it in the relevant context file before
  implementing, using the blueprint's stated defaults where given
  (e.g. match score weights, duplicate-candidate thresholds).
- If a requirement is missing entirely, add it as an open question in
  `progress-tracker.md` before continuing.

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui components
- Any third-party library internals
- Applied database migrations (add a new migration instead of editing
  a past one)

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries → `architecture.md`
- Storage model decisions → `architecture.md`
- Code conventions or standards → `code-standards.md`
- Feature scope → `project-overview.md`
- Visual/design decisions → `ui-context.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope (e.g.
   citizen can submit and see a tracking ID; reviewer can see it in
   the queue).
2. No invariant defined in `architecture.md` was violated (no direct
   status writes, no AI auto-decision, no PII leaking into public/
   redacted views).
3. `progress-tracker.md` reflects the completed work and updates
   "Next Up."
4. `npm run build` passes for both `apps/web` and `apps/api`.
