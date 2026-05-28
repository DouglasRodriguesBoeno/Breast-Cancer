<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BreastCare AI Frontend Agent Instructions

## Project role

This repository is the BreastCare AI frontend.

It is responsible for:
- Next.js application routes;
- Next.js API Routes used as proxy to the Spring Boot backend;
- educational user experience;
- prediction creation flow;
- prediction history;
- prediction detail;
- model overview;
- future V2 dashboard, explainability UI, system status and report export flows.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/base-ui
- Recharts
- React Hook Form
- Zod
- TanStack Query

## Production context

BreastCare AI V1 is already in production.

Architecture:

```txt
Frontend Next.js on Vercel
→ Next.js API Routes
→ Spring Boot API on Railway
→ FastAPI ML Service on Railway
→ Neon PostgreSQL
```

Do not break the existing production flow.

## Medical safety rules

This project is educational only.

Allowed language:
- educational prediction;
- model output;
- compatible with benign/malignant pattern;
- malignant probability;
- risk band;
- not a medical diagnosis.

Forbidden language:
- diagnosis;
- patient has cancer;
- confirmed cancer;
- confirmed malignant tumor;
- definitive clinical result;
- treatment recommendation.

Every user-facing result must preserve educational and non-diagnostic language.

## Frontend rules

- Do not call the Spring Boot API directly from browser client components when a Next.js API Route exists or should exist.
- Keep existing V1 routes working:
  - `/`
  - `/analysis/new`
  - `/analysis/history`
  - `/analysis/[id]`
  - `/model`
- Preserve responsive/mobile behavior.
- Keep UI aligned with the Clinical Calm AI visual identity.
- Add loading, empty and error states for new server interactions.
- Prefer reusable components over page-specific duplication.
- Do not commit secrets or production credentials.

## Useful validation commands

```bash
npm run lint
npm run build
```

## Definition of done

A frontend task is done only when:
- the app builds;
- existing V1 screens still work;
- new UI has loading and error states;
- educational safety language is preserved;
- API calls go through the intended proxy layer;
- no secrets are committed;
- README or specs are updated when behavior changes.

## V2 priorities

Work in small PRs following the specs under `/specs` when available.

Recommended order:
1. System status UI.
2. Paginated history UI.
3. Explainability cards in prediction detail.
4. Dashboard analytics.
5. Educational PDF report button.
6. Educational assistant/RAG UI only after safety specs exist.
