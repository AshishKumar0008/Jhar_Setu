# JharSetu — Innovation Gap Exchange for Jharkhand (SIH 26043 MVP)

## Overview

JharSetu is a privacy-preserving, human-governed platform that turns a
citizen's local problem report into one accountable outcome: a referral
to an existing government service (Path A), a routed grievance to the
responsible department (Path B), or — only when evidence supports it —
a verified Innovation Gap Certificate that starts a university-industry
pilot (Path C). AI prepares evidence (transcription, redaction,
extraction, duplicate detection); humans make every routing, matching,
certification, and adoption decision. This MVP is a pilot-ready design
for the SIH selection round, not a claim of statewide deployment — the
goal is one fully traceable case through each path.

## Goals

1. Demonstrate one complete Path C trace: citizen report → AI
   extraction → reviewer decision → Innovation Gap Certificate →
   Challenge Passport → capability match → commitment → government
   Pilot Readiness approval.
2. Demonstrate one contrasting Path B trace (damaged road) to prove the
   system does not inflate ordinary service issues into "innovation."
3. Keep every AI output labeled as a suggestion with visible
   model/confidence, and every state transition backed by a
   reason_code and an audit_events row.

## Core User Flow

1. Citizen (or assisted operator) submits a report via the PWA:
   privacy mode → describe (voice/text) → location → evidence → review
   & consent → receipt/tracking ID.
2. AI worker processes the report asynchronously: transcribe → redact
   PII → extract structured fields → embed → find duplicate/cluster
   candidates.
3. Reviewer opens the decision card, inspects the AI suggestions and
   duplicate candidates, and chooses Path A (known service), Path B
   (grievance/authority routing), or proposes Path C (innovation gap),
   always with a reason.
4. Path B: authority case created, department officer acknowledges,
   acts, and closes with resolution evidence.
5. Path C: second reviewer verifies evidence rule → Innovation Gap
   Certificate issued → Challenge Passport published → capability-based
   university shortlist run → university submits proposal → industry
   records a commitment → government reviews and approves Pilot
   Readiness.

## Features

### Citizen Intake
- Anonymous mode (case ID + recovery phrase) and confidential mode
  (OTP contact)
- Assisted-operator submission with consent capture
- Voice or text description, category/impact chips, location picker,
  optional evidence upload
- Tracking screen with plain-language status timeline

### Reviewer Workspace
- Review queue filtered by district/category/severity/AI confidence
- Decision card: left = redacted narrative/evidence/map, middle = AI
  extraction + duplicate candidates, right = authority mapping +
  decision controls
- Cluster explorer for linking/splitting recurring reports

### Path B — Authority Routing
- Authority case created from a configurable authority-mapping table
- Department officer screen: acknowledge, assign, post update, mark
  resolved with evidence

### Path C — Innovation Workflow
- Innovation Gap Certificate generator (evidence rule check, second
  reviewer sign-off)
- Challenge Passport editor with public-safe redaction checklist
- Capability Card intake for seeded university profiles + transparent
  match scoring
- Commitment Ledger for industry/CSR partners (PENDING → CONFIRMED)
- Government validation screen producing a Pilot Readiness record

## Scope

### In Scope (this MVP)
- Items 1–9 of the "Aggressively reduced SIH MVP — Must build" list
- One seeded Path C trace (water-quality) and one seeded Path B trace
  (road damage)
- Manual/human decisions at every state transition; AI labeled as
  suggestion only

### Out of Scope (explicitly, for this round)
- Real integrations with JharSewa, myScheme, CPGRAMS, or Bhashini
  (approved-link/adapter placeholders only)
- Kubernetes/Kafka/microservices, blockchain/NFTs, facial recognition
- Native mobile apps, real OTP/SMS providers, payments/procurement
- Automatic AI approval, routing, certification, or adoption decisions
- Nationwide data or unlabeled "real" demo data

## Success Criteria

1. A citizen can submit a report (voice or text) and receive a
   tracking ID within the same session.
2. A reviewer can see AI-suggested extraction/duplicates and must
   choose Path A/B/C with a recorded reason before the system
   transitions state.
3. The road-damage report completes Path B end-to-end (officer
   acknowledges → resolves).
4. The water-quality reports complete Path C end-to-end: certificate →
   passport → match → commitment → Pilot Readiness approval.
5. Every state change has a corresponding audit_events row visible in
   an audit timeline.
6. The full demo runs in under 3 minutes using seeded, clearly labeled
   demo data.
