# AGENTS.md — BreastCare AI Frontend

## Project

BreastCare AI is an educational AI healthtech web application.

The V2 direction is:

BreastCare AI V2 — Report Intelligence & Explainable AI

The main V2 flow is the Laudo Intelligence Layer. The WDBC Prediction Engine remains available, but it is complementary and advanced.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent local UI primitives

## Required design docs

Before implementing any V2 UI task, read:

- `docs/design/01-design-system-v2.md`
- `docs/design/02-user-flow-v2.md`
- `docs/design/03-screen-specs-v2.md`
- `docs/design/04-frontend-handoff-v2.md`
- `docs/design/05-copy-safety-guidelines.md`
- `docs/design/spec-router.json`
- `docs/design/AGENT_DESIGN_INSTRUCTIONS.md`

## Core product rule

Do not send the user directly to the 30 WDBC feature fields as the first experience.

The `/new-analysis` route must start with mode selection:

1. Analyze medical report
2. Educational demo
3. Import structured data
4. Advanced manual input

## Safety rules

Never use diagnostic language.

Do not write:

- You have cancer
- Diagnosis confirmed
- Clinical result
- Treatment recommended
- AI-defined urgency

Prefer:

- Educational only
- Not a medical diagnosis
- The report mentions...
- The system identified...
- Compatible with...
- This explanation does not replace a healthcare professional

## Visual rules

Use the Clinical Calm AI design system:

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Border: `#E2E8F0`
- Text primary: `#0F172A`
- Text secondary: `#475569`
- Primary rose: `#E11D48`
- Rose soft: `#FFE4E6`
- Teal: `#0F766E`
- Blue: `#2563EB`

The UI should be clean, calm, professional, B2B/SaaS, and educational.

## Before coding

For every task:

1. Identify the task key in `docs/design/spec-router.json`.
2. List the specs that apply.
3. List files likely to be changed.
4. Explain a short implementation plan.
5. Then implement.

## After coding

Always return:

- What changed
- How to test
- Checklist of acceptance criteria
- Any risks or manual review points

## First recommended task

Task key:

`new-analysis-mode-selection`

Goal:

Refactor `/new-analysis` into the V2 mode selection screen.

Do not remove the existing WDBC flow. Preserve or move it to `/new-analysis/advanced`.